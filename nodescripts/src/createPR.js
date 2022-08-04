const {insertLineToStr, git, downloadFile, checkFile, exitProcess, readFile, writeLinetoFile, prepend} = require('./util');
const axios = require('axios');
const wget = require('node-wget');

const createPR = async () => {
    const issue = await readFile('issue.json');
    const author = issue.PluginAuthor;
    const repo = issue.PluginRepo;
    const branch = issue.PluginBranch;


    const plugin_json = await axios.get(`https://raw.githubusercontent.com/${author}/${repo}/${branch}/plugin.json`);
    const gh_release_data = await axios.get(`https://api.github.com/repos/${author}/${repo}/releases`);

    const plugin_title = ((plugin_json||{}).data || {}).name;
    const abstract= issue.PluginAbstract;

    const date = new Date().toISOString().slice(2, 10).replace(new RegExp("-",'g'), "");
    const branchName=`submission/${date}${repo}`
    const commituser="Duet3D"



    const latest_version =  ((gh_release_data||{}).data || [])[0].tag_name;
    const release_page =  ((gh_release_data||{}).data || [])[0].html_url;
    const release_date = ((gh_release_data||{}).data || [])[0].published_at;
    const homepage = ((plugin_json||{}).data || {}).homepage;
    const license = ((plugin_json||{}).data || {}).license;
    const download_count = ((gh_release_data||{}).data || []).reduce((prev, cur)=> prev + ((((cur||{}).assets || [])[0]||{}).download_count||0), 0);
    const oem = author == 'Duet3D'

    const dwcVersion = ((plugin_json||{}).data || {}).dwcVersion;
    const sbcDSfVersion = ((plugin_json||{}).data || {}).sbcDSfVersion;
    const rrfVersion = ((plugin_json||{}).data || {}).rrfVersion;

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
    frontmatter = insertLineToStr("plugin_submitted_by: ${{ github.event.issue.user.login }}", frontmatter);
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
    (((plugin_json||{}).data || {}).tags || []).forEach(x => {
        frontmatter = insertLineToStr(`- ${x}`, frontmatter);
    });
    frontmatter = insertLineToStr(`---`, frontmatter);
    frontmatter = insertLineToStr("", frontmatter);


    await prepend(frontmatter, `${repo}.md`);

};

module.exports = {
    createPR
}