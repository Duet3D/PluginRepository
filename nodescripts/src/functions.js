const { insertLineToStr, git, downloadFile, checkFile, exitProcess, 
        readFile: {JSON: readJSON, TEXT: readTEXT}, writeLinetoFile, prepend, unzip, isFirstCharNum, 
        getStatus, getFrontmatterObject, isUserCollaborator, lowerCaseKeys, extractRepoURLDetails, isUserOrgMember} = require('./util');
const axios = require('axios');

const submissionPrecheck = async () => {
    process.argv.forEach(x=>console.log(x))
    console.log(process.env.GITHUB_ISSUE)
    console.log(process.env.GITHUB_TOKEN)
    // Initalize variables
    let checklog = "";
    const issue = await readJSON('issue.json');

    const {PluginAuthor: author, PluginRepo: repo} = extractRepoURLDetails(issue.PluginURL);
    const branch = issue.PluginBranch;
    let isOK = true;
    let res;

    //0. Check if repo name exists already
    res = !checkFile.local(`../../src/plugins/${repo}.md`);
    checklog = insertLineToStr(`Plugin name available: ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    let repo_status = await checkFile.remote(`https://github.com/${author}/${repo}/tree/${branch}/`);

    if(!repo_status){
        await exitProcess('Errors with accessing repo. Check submitted username, repo, branch', checklog);
    }

    //1. Check if README.md or PLUGIN.md is present on the specified repo
    let plugin_md_status = await checkFile.remote(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/PLUGIN.md`);
    checklog = insertLineToStr(`PLUGIN.md: ${plugin_md_status ? "OK" : "NOT FOUND. USING README.md as FALLBACK"}`, checklog);

    let readme_md_status = await checkFile.remote(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/README.md`);
    checklog = insertLineToStr(`README.md: ${getStatus(readme_md_status)}`, checklog);
    
    res = plugin_md_status || readme_md_status;
    isOK = isOK && res;


    //2. Make sure there is at least one release with at least one ZIP file
    const {status, data} = await axios.get(`https://api.github.com/repos/${author}/${repo}/releases`);
    let browser_download_url = ((((data||[])[0]||{}).assets||[])[0]||{}).browser_download_url
    if((status != 200) || browser_download_url == undefined){
        await exitProcess('Release not available, Exiting', checklog);
    }
    
    let ext = browser_download_url.split('.');
    res = ext[ext.length-1] == 'zip';
    if(!res){
        await exitProcess('Release available is not zip, Exiting', checklog);
    }
    checklog = insertLineToStr(`Release:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    //3. Download latest ZIP bundle
    await downloadFile(browser_download_url, 'asset.zip')


    //4. Make sure plugin.json exists
    //unzip here
    try{
        await unzip();
    }
    catch(err){
        await exitProcess(err, checklog);
    }

    res = checkFile.local('unzipped/plugin.json');
    if(!res){
        await exitProcess('plugin.json - manifest not available, Exiting', checklog);
    }
    
    //5. Ensure properties id, name, author are present
    const plugin_manifest = lowerCaseKeys(await readJSON('unzipped/plugin.json') || {});
    
    const {id:plugin_id, name:plugin_name, author:plugin_author, dwcversion : dwcVersion, sbcdsfversion : sbcDSfVersion, rrfversion : rrfVersion} = plugin_manifest;
    
    res = plugin_id && plugin_id.length < 32
    checklog = insertLineToStr(`plugin.json id:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    res = plugin_name && plugin_name.length < 64
    checklog = insertLineToStr(`plugin.json name:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    res = plugin_author? true: false;
    checklog = insertLineToStr(`plugin.json author:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    //6. Check if at least one "version" dependency is present [dwcVersion, sbcDSfVersion, rrfVersion] and that each value starts with a number
    res = isFirstCharNum(dwcVersion) || isFirstCharNum(sbcDSfVersion) || isFirstCharNum(rrfVersion);
    checklog = insertLineToStr(`plugin.json platform version:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;


    //7. Sum up
    if(!isOK){
        console.log(checklog)
        await exitProcess('Prechecks failed. Cannot be approved', checklog)
    }
    else{
        await git.commentIssue(checklog);
        process.exit(0);
    }

}

const updatePrecheck = async () => {
    process.argv.forEach(x=>console.log(x))
    console.log(process.env.GITHUB_ISSUE)
    // Initalize variables
    let checklog = "";
    const issue = await readJSON('issue.json');
    const repo = issue.PluginID;
    let isOK = true;
    let res;
    let admin_req = false;

    //0. Check if repo name exists already
    res = checkFile.local(`../../src/plugins/${repo}.md`);
    checklog = insertLineToStr(`Plugin available: ${getStatus(res)}`, checklog);
    isOK = isOK && res;
    if (!res) {
        await exitProcess('Plugin unavailable. Update failed. Check and resubmit', checklog);
    }

    //0. Checking if user is a collaborator/org-member or the same user submitted the removal request

    if (await isUserCollaborator()) {
        checklog = insertLineToStr(`Update requested by moderator: ${process.env.GITHUB_USER}`, checklog);
        admin_req = true;
    }

    else if (await isUserOrgMember()) {
        checklog = insertLineToStr(`Update requested by Duet3D member: ${process.env.GITHUB_USER}`, checklog);
        admin_req = true;
    }

    const plugin_md = await readTEXT(`../../src/plugins/${repo}.md`);
    const user = getFrontmatterObject('plugin_submitted_by', plugin_md);

    if (!admin_req && user && (user != process.env.GITHUB_USER)) {
        await exitProcess(`User mismatch. Please request update using user: ${user}`, checklog);
    }

    if (!admin_req) {
        checklog = insertLineToStr(`Update requested by user: ${process.env.GITHUB_USER}`, checklog);
    }

    const plugin_md_author = getFrontmatterObject('author', plugin_md);
    const plugin_md_branch = getFrontmatterObject('branch', plugin_md);

    let repo_status = await checkFile.remote(`https://github.com/${plugin_md_author}/${repo}/tree/${plugin_md_branch}/`);

    if (!repo_status) {
        await exitProcess('Errors with accessing repo. If the plugin has been moved/branch has been changed, request for removal and submit as a new one', checklog);
    }

    //1. Check if README.md or PLUGIN.md is present on the specified repo
    let plugin_md_status = await checkFile.remote(`https://raw.githubusercontent.com/${plugin_md_author}/${repo}/${plugin_md_branch}/PLUGIN.md`);
    checklog = insertLineToStr(`PLUGIN.md: ${plugin_md_status ? "OK" : "NOT FOUND. USING README.md as FALLBACK"}`, checklog);

    let readme_md_status = await checkFile.remote(`https://raw.githubusercontent.com/${plugin_md_author}/${repo}/${plugin_md_branch}/README.md`);
    checklog = insertLineToStr(`README.md: ${getStatus(readme_md_status)}`, checklog);
    
    res = plugin_md_status || readme_md_status;
    isOK = isOK && res;


    //2. Make sure there is at least one release with at least one ZIP file
    const {status, data} = await axios.get(`https://api.github.com/repos/${plugin_md_author}/${repo}/releases`);
    let browser_download_url = ((((data||[])[0]||{}).assets||[])[0]||{}).browser_download_url
    if((status != 200) || browser_download_url == undefined){
        await exitProcess('Release not available, Exiting', checklog);
    }
    
    let ext = browser_download_url.split('.');
    res = ext[ext.length-1] == 'zip';
    if(!res){
        await exitProcess('Release available is not zip, Exiting', checklog);
    }
    checklog = insertLineToStr(`Release:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    //3. Download latest ZIP bundle
    await downloadFile(browser_download_url, 'asset.zip')


    //4. Make sure plugin.json exists
    //unzip here
    try{
        await unzip();
    }
    catch(err){
        await exitProcess(err, checklog);
    }

    res = checkFile.local('unzipped/plugin.json');
    if(!res){
        await exitProcess('plugin.json - manifest not available, Exiting', checklog);
    }
    
    //5. Ensure properties id, name, author are present
    const plugin_manifest = lowerCaseKeys(await readJSON('unzipped/plugin.json') || {});
    
    const {id:plugin_id, name:plugin_name, author:plugin_author, dwcversion : dwcVersion, sbcdsfversion : sbcDSfVersion, rrfversion : rrfVersion} = plugin_manifest;
    
    res = plugin_id && plugin_id.length < 32
    checklog = insertLineToStr(`plugin.json id:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    res = plugin_name && plugin_name.length < 64
    checklog = insertLineToStr(`plugin.json name:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    res = plugin_author? true: false;
    checklog = insertLineToStr(`plugin.json author:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;

    //6. Check if at least one "version" dependency is present [dwcVersion, sbcDSfVersion, rrfVersion] and that each value starts with a number
    res = isFirstCharNum(dwcVersion) || isFirstCharNum(sbcDSfVersion) || isFirstCharNum(rrfVersion);
    checklog = insertLineToStr(`plugin.json platform version:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;


    //7. Sum up
    if(!isOK){
        console.log(checklog)
        await exitProcess('Prechecks failed. Cannot be approved', checklog)
    }
    else{
        await git.commentIssue(checklog);
        process.exit(0);
    }

}

const updateCreatePR = async () => {
    const issue = await readJSON('issue.json');
    const repo = issue.PluginID;
    
    const plugin_md = await readTEXT(`../../src/plugins/asset_repo.txt`);
    const user = getFrontmatterObject('plugin_submitted_by', plugin_md);
    const plugin_submitted_on = getFrontmatterObject('plugin_submitted_on', plugin_md) || `${new Date().toISOString()}`;
    const author = getFrontmatterObject('author', plugin_md);
    const branch = getFrontmatterObject('branch', plugin_md);

    let res;

    let checklog = "";

    //Download release and unzip-------------------------------------------------------------------------------------------------
    const {status, data} = await axios.get(`https://api.github.com/repos/${author}/${repo}/releases`);

    const gh_release_data = await axios.get(`https://api.github.com/repos/${author}/${repo}/releases`);

    let browser_download_url = (((((gh_release_data||{}).data||[])[0]||{}).assets||[])[0]||{}).browser_download_url
    
    if((status != 200) || browser_download_url == undefined){
        await exitProcess('Release not available, Exiting', checklog);
    }
    
    let ext = browser_download_url.split('.');
    res = ext[ext.length-1] == 'zip';
    if(!res){
        await exitProcess('Release available is not zip, Exiting', checklog);
    }

    await downloadFile(browser_download_url, 'asset.zip')

    try{
        await unzip();
    }
    catch(err){
        await exitProcess(err, checklog);
    }

    res = checkFile.local('unzipped/plugin.json');
    if(!res){
        await exitProcess('plugin.json - manifest not available, Exiting', checklog);
    }
    
    const plugin_json = lowerCaseKeys(await readJSON('unzipped/plugin.json') || {});

    const {name: plugin_title, homepage, license, dwcversion : dwcVersion, sbcdsfversion : sbcDSfVersion, rrfversion : rrfVersion, tags = []} = plugin_json;
    const abstract= issue.PluginAbstract;

    const date = new Date().toISOString().slice(2, 10).replace(new RegExp("-",'g'), "");

    const latest_version =  ((gh_release_data||{}).data || [])[0].tag_name;
    const release_page =  ((gh_release_data||{}).data || [])[0].html_url;
    const release_date = ((gh_release_data||{}).data || [])[0].published_at;
    const download_count = ((gh_release_data||{}).data || []).reduce((prev, cur)=> prev + ((((cur||{}).assets || [])[0]||{}).download_count||0), 0);
    const oem = author == 'Duet3D'

    const plugin_md_status = await checkFile.remote(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/PLUGIN.md`);
    if(plugin_md_status){
        await downloadFile(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/PLUGIN.md`, `${repo}.md`)
    }
    else{
        await downloadFile(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/README.md`, `${repo}.md`)
    }

    let license_file = ""
    const license_status_1 = await checkFile.remote(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/LICENSE`);
    const license_status_2 = await checkFile.remote(`https://spdx.org/licenses/${license}`);

    if(license_status_1){
        license_file = `https://raw.githubusercontent.com/${author}/${repo}/${branch}/LICENSE`;
    }
    else if(license_status_2){
        license_file = `https://spdx.org/licenses/${license}`;
    }
    else{
        license_file = `https://github.com/${author}/${repo}`;
    }



    let frontmatter = "";
    frontmatter = insertLineToStr("---", frontmatter);
    frontmatter = insertLineToStr(`plugin_submitted_by: ${user}`, frontmatter);
    frontmatter = insertLineToStr(`plugin_submitted_on: ${plugin_submitted_on}`, frontmatter);
    frontmatter = insertLineToStr(`plugin_updated_on: ${new Date().toISOString()}`, frontmatter);
    frontmatter = insertLineToStr(`plugin: true`, frontmatter);
    frontmatter = insertLineToStr(`title: ${plugin_title}`, frontmatter);
    frontmatter = insertLineToStr(`abstract: ${abstract}`, frontmatter);
    frontmatter = insertLineToStr(`author: ${author}`, frontmatter);
    frontmatter = insertLineToStr(`repo: ${repo}`, frontmatter);
    frontmatter = insertLineToStr(`branch: ${branch}`, frontmatter);
    frontmatter = insertLineToStr(`homepage: ${homepage}`, frontmatter);
    frontmatter = insertLineToStr(`dwcVersion: ${dwcVersion}`, frontmatter);
    frontmatter = insertLineToStr(`sbcDSfVersion: ${sbcDSfVersion}`, frontmatter);
    frontmatter = insertLineToStr(`rrfVersion: ${rrfVersion}`, frontmatter);
    frontmatter = insertLineToStr(`oem: ${oem}`, frontmatter);
    frontmatter = insertLineToStr(`latest_version: ${latest_version}`, frontmatter);
    frontmatter = insertLineToStr(`release_date: ${release_date}`, frontmatter);
    frontmatter = insertLineToStr(`release_page: ${release_page}`, frontmatter);
    frontmatter = insertLineToStr(`license: ${license}`, frontmatter);
    frontmatter = insertLineToStr(`license_file: ${license_file}`, frontmatter);
    frontmatter = insertLineToStr(`download_count: ${download_count}`, frontmatter);
    frontmatter = insertLineToStr(`tags:`, frontmatter);
    tags.forEach(x => {
        frontmatter = insertLineToStr(`- ${x.toLowerCase()}`, frontmatter);
    });
    if(dwcVersion) frontmatter = insertLineToStr(`- dwc`, frontmatter);
    if(sbcDSfVersion) frontmatter = insertLineToStr(`- sbc`, frontmatter);
    if(rrfVersion) frontmatter = insertLineToStr(`- rrf`, frontmatter);
    if(oem) frontmatter = insertLineToStr(`- duet3d`, frontmatter);
    frontmatter = insertLineToStr(`---`, frontmatter);
    frontmatter = insertLineToStr("", frontmatter);

    await prepend(frontmatter, `${repo}.md`);

};


const submissionCreatePR = async () => {
    const issue = await readJSON('issue.json');
    const {PluginAuthor: author, PluginRepo: repo} = extractRepoURLDetails(issue.PluginURL);
    const branch = issue.PluginBranch;
    let res;

    let checklog = "";

    res = checkFile.local(`../../src/plugins/${repo}.md`);
    if(res){
        await exitProcess('Duplicate name. Cannot be approved', checklog);
    }

    //Download release and unzip-------------------------------------------------------------------------------------------------
    const {status, data} = await axios.get(`https://api.github.com/repos/${author}/${repo}/releases`);

    const gh_release_data = await axios.get(`https://api.github.com/repos/${author}/${repo}/releases`);

    let browser_download_url = (((((gh_release_data||{}).data||[])[0]||{}).assets||[])[0]||{}).browser_download_url
    
    if((status != 200) || browser_download_url == undefined){
        await exitProcess('Release not available, Exiting', checklog);
    }
    
    let ext = browser_download_url.split('.');
    res = ext[ext.length-1] == 'zip';
    if(!res){
        await exitProcess('Release available is not zip, Exiting', checklog);
    }

    await downloadFile(browser_download_url, 'asset.zip')

    try{
        await unzip();
    }
    catch(err){
        await exitProcess(err, checklog);
    }

    res = checkFile.local('unzipped/plugin.json');
    if(!res){
        await exitProcess('plugin.json - manifest not available, Exiting', checklog);
    }
    
    const plugin_json = lowerCaseKeys(await readJSON('unzipped/plugin.json') || {});

    const {name: plugin_title, homepage, license, dwcversion : dwcVersion, sbcdsfversion : sbcDSfVersion, rrfversion : rrfVersion, tags = []} = plugin_json;
    const abstract= issue.PluginAbstract;

    const date = new Date().toISOString().slice(2, 10).replace(new RegExp("-",'g'), "");

    const latest_version =  ((gh_release_data||{}).data || [])[0].tag_name;
    const release_page =  ((gh_release_data||{}).data || [])[0].html_url;
    const release_date = ((gh_release_data||{}).data || [])[0].published_at;
    const download_count = ((gh_release_data||{}).data || []).reduce((prev, cur)=> prev + ((((cur||{}).assets || [])[0]||{}).download_count||0), 0);
    const oem = author == 'Duet3D'

    const plugin_md_status = await checkFile.remote(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/PLUGIN.md`);
    if(plugin_md_status){
        await downloadFile(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/PLUGIN.md`, `${repo}.md`)
    }
    else{
        await downloadFile(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/README.md`, `${repo}.md`)
    }

    let license_file = ""
    const license_status_1 = await checkFile.remote(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/LICENSE`);
    const license_status_2 = await checkFile.remote(`https://spdx.org/licenses/${license}`);

    if(license_status_1){
        license_file = `https://raw.githubusercontent.com/${author}/${repo}/${branch}/LICENSE`;
    }
    else if(license_status_2){
        license_file = `https://spdx.org/licenses/${license}`;
    }
    else{
        license_file = `https://github.com/${author}/${repo}`;
    }


    let frontmatter = "";
    frontmatter = insertLineToStr("---", frontmatter);
    frontmatter = insertLineToStr(`plugin_submitted_by: ${process.env.GITHUB_USER}`, frontmatter);
    frontmatter = insertLineToStr(`plugin_submitted_on: ${new Date().toISOString()}`, frontmatter);
    frontmatter = insertLineToStr(`plugin_updated_on: ${new Date().toISOString()}`, frontmatter);
    frontmatter = insertLineToStr(`plugin: true`, frontmatter);
    frontmatter = insertLineToStr(`title: ${plugin_title}`, frontmatter);
    frontmatter = insertLineToStr(`abstract: ${abstract}`, frontmatter);
    frontmatter = insertLineToStr(`author: ${author}`, frontmatter);
    frontmatter = insertLineToStr(`repo: ${repo}`, frontmatter);
    frontmatter = insertLineToStr(`branch: ${branch}`, frontmatter);
    frontmatter = insertLineToStr(`homepage: ${homepage}`, frontmatter);
    frontmatter = insertLineToStr(`dwcVersion: ${dwcVersion}`, frontmatter);
    frontmatter = insertLineToStr(`sbcDSfVersion: ${sbcDSfVersion}`, frontmatter);
    frontmatter = insertLineToStr(`rrfVersion: ${rrfVersion}`, frontmatter);
    frontmatter = insertLineToStr(`oem: ${oem}`, frontmatter);
    frontmatter = insertLineToStr(`latest_version: ${latest_version}`, frontmatter);
    frontmatter = insertLineToStr(`release_date: ${release_date}`, frontmatter);
    frontmatter = insertLineToStr(`release_page: ${release_page}`, frontmatter);
    frontmatter = insertLineToStr(`license: ${license}`, frontmatter);
    frontmatter = insertLineToStr(`license_file: ${license_file}`, frontmatter);
    frontmatter = insertLineToStr(`download_count: ${download_count}`, frontmatter);
    frontmatter = insertLineToStr(`tags:`, frontmatter);
    tags.forEach(x => {
        frontmatter = insertLineToStr(`- ${x.toLowerCase()}`, frontmatter);
    });
    if(dwcVersion) frontmatter = insertLineToStr(`- dwc`, frontmatter);
    if(sbcDSfVersion) frontmatter = insertLineToStr(`- sbc`, frontmatter);
    if(rrfVersion) frontmatter = insertLineToStr(`- rrf`, frontmatter);
    if(oem) frontmatter = insertLineToStr(`- duet3d`, frontmatter);
    frontmatter = insertLineToStr(`---`, frontmatter);
    frontmatter = insertLineToStr("", frontmatter);


    await prepend(frontmatter, `${repo}.md`);

};

const removalPrecheck = async () => {
    const issue = await readJSON('issue.json');
    const plugin_id = issue.PluginID;

    let checklog = "";
    let res;

    // 0. Checking if plugin.md exists

    res = checkFile.local(`../../src/plugins/${plugin_id}.md`);
    if(!res){
        await exitProcess('Requested plugin is not available, Exiting', checklog);
    }


    // 1. Checking if user is a collaborator or the same user submitted the removal request

    if(await isUserCollaborator()){
        await git.commentIssue(`Removal requested by moderator: ${process.env.GITHUB_USER}`);
        process.exit(0);
    }
    else if(await isUserOrgMember()){
        await git.commentIssue(`Removal requested by Duet3D member: ${process.env.GITHUB_USER}`);
        process.exit(0);
    }
        
    const plugin_md = await readTEXT(`../../src/plugins/${plugin_id}.md`);
    const user = getFrontmatterObject('plugin_submitted_by', plugin_md);

    if(user && (user == process.env.GITHUB_USER)){
        checklog = insertLineToStr(`Removal using the same user :  ${user}`, checklog);
        await git.commentIssue(checklog);
        process.exit(0);
    }


    await exitProcess(`User mismatch. Please request removal using user: ${user}`, checklog);
    
}

const reportPlugin = () => {

    try{

        const issue = await readJSON('issue.json');
        const {PluginID: plugin_id, Description: description, StepsReprod: steps_reproduce, AdditionalInfo: additional_description} = issue;

        let res;

        let checklog = "";

        res = checkFile.local(`../../src/plugins/${plugin_id}.md`);
        if(!res){
            await git.commentIssue("Plugin does not exist. Please check and submit again".concat('\n'));
            process.exit(1);    
        }

        const {data: prev_plugin_reported_json} = await axios.get(`https://raw.githubusercontent.com/Duet3D/PluginRepository/master/plugin_reported.json`);

        const plugin_md = await readTEXT(`../../src/plugins/${plugin_id}`);

        let new_plugin_reported_json = (prev_plugin_reported_json || []).slice()

        const entry = {
            "plugin_id": plugin_id,
            "author": getFrontmatterObject('author', plugin_md),
            "plugin_submitted_on": getFrontmatterObject('plugin_submitted_on', plugin_md),
            "description": description,
            "steps_reproduce": steps_reproduce || "",
            "additional_description": additional_description || "",
            "timestamp": new Date().toISOString()
        }

        new_plugin_reported_json.push(entry);

        await writeJSONSync(new_plugin_reported_json, 'plugin_reported.json')
        return new_plugin_reported_json
    }
    catch(e){
        return e
    }
}

module.exports = {
    submissionCreatePR,
    submissionPrecheck,
    updatePrecheck,
    updateCreatePR,
    removalPrecheck,
    reportPlugin
}