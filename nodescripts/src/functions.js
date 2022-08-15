const { insertLineToStr, git, downloadFile, checkFile, exitProcess, 
        readFile: {JSON: readJSON, TEXT: readTEXT}, writeLinetoFile, prepend, unzip, isFirstCharNum, 
        getStatus, getFrontmatterObject} = require('./util');
const axios = require('axios');

const submissionPrecheck = async () => {
    process.argv.forEach(x=>console.log(x))
    console.log(process.env.GITHUB_ISSUE)
    console.log(process.env.GITHUB_TOKEN)
    // Initalize variables
    let checklog = "";
    const issue = await readJSON('issue.json');
    const author = issue.PluginAuthor;
    const repo = issue.PluginRepo;
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
    checklog = insertLineToStr(`PLUGIN.md: ${getStatus(plugin_md_status)}`, checklog);

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
    const plugin_manifest = await readJSON('unzipped/plugin.json');
    const {id:plugin_id, name:plugin_name, author:plugin_author, dwcVersion, sbcDSfVersion, rrfVersion} = plugin_manifest;
    
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

const submissionCreatePR = async () => {
    const issue = await readJSON('issue.json');
    const author = issue.PluginAuthor;
    const repo = issue.PluginRepo;
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
    
    const plugin_json = await readJSON('unzipped/plugin.json');

    const {name: plugin_title, homepage, license, dwcVersion, sbcDSfVersion, rrfVersion, tags = []} = plugin_json;
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


    // 1. Checking if the same user submitted the removal request

    const plugin_md = await readTEXT(`../../src/plugins/${plugin_id}.md`);
    const user = getFrontmatterObject('plugin_submitted_by', plugin_md);

    if(user && (user == process.env.GITHUB_USER)){
        checklog = insertLineToStr(`Removal using the same user :  ${user}`, checklog);
        await git.commentIssue(checklog);
        process.exit(0);
    }


    await exitProcess(`User mismatch. Please request removal using user: ${user}`, checklog);
    
}

const removalPrecheck2 = async () => {
    const axios = require('axios');
    
    try{
        const res = await axios.get(`https://api.github.com/repos/Duet3D/RepRapFirmware/collaborators`, 
        {
            headers: {
                'Authorization' : `token ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github+json"
            }
        })
        console.log(res)
    }
    catch(e){
        return e
    }
}

module.exports = {
    submissionCreatePR,
    submissionPrecheck,
    removalPrecheck,
    removalPrecheck2
}