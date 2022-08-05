const {insertLineToStr, git, downloadFile, checkFile, exitProcess, readFile, writeLinetoFile, unzip, isFirstCharNum, getStatus} = require('./util');
const axios = require('axios');
const wget = require('node-wget');

const precheck = async () => {
    process.argv.forEach(x=>console.log(x))
    console.log(process.env.GITHUB_ISSUE)
    console.log(process.env.GITHUB_TOKEN)
    // Initalize variables
    let checklog = "";
    const issue = await readFile('issue.json');
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
    //1. OK Check for illegal characters (allow only alphanumeric GH user+repo+branch names)
    

    //user


    //repo

    
    //branch  


    //2. Check if README.md or PLUGIN.md is present on the specified repo
    let plugin_md_status = await checkFile.remote(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/PLUGIN.md`);
    checklog = insertLineToStr(`PLUGIN.md: ${getStatus(plugin_md_status)}`, checklog);

    let readme_md_status = await checkFile.remote(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/README.md`);
    checklog = insertLineToStr(`README.md: ${getStatus(readme_md_status)}`, checklog);
    
    res = plugin_md_status || readme_md_status;
    isOK = isOK && res;


    // 3. Make sure there is at least one release with at least one ZIP file
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

    //4. Download latest ZIP bundle
    await downloadFile(browser_download_url, 'asset.zip')


    //5. Make sure plugin.json exists
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
    
    //6. Ensure properties id, name, author are present
    const plugin_manifest = await readFile('unzipped/plugin.json');
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

    //7. Check if at least one "version" dependency is present [dwcVersion, sbcDSfVersion, rrfVersion] and that each value starts with a number
    res = isFirstCharNum(dwcVersion) || isFirstCharNum(sbcDSfVersion) || isFirstCharNum(rrfVersion);
    checklog = insertLineToStr(`plugin.json platform version:  ${getStatus(res)}`, checklog);
    isOK = isOK && res;


    //8. Sum up
    if(!isOK){
        await exitProcess('Prechecks failed. Cannot be approved', checklog)
    }
    else{
        await git.commentIssue(checklog);
        process.exit(0);
    }

}

module.exports = {
    precheck
}