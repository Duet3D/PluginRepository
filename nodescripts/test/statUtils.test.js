const sinon = require('sinon');
const axios = require('axios');
const fs = require('fs');
const {createPluginEntry} = require('../src/statUtils');

describe('Create Plugin Entry' , ()=> {
    beforeEach(()=>{
        const plugin_md = `---
        plugin_submitted_by: yasasw
        plugin_submitted_on: 2022-09-01T10:53:37.289Z
        plugin_updated_on: 2022-09-04T20:47:36.757Z
        plugin: true
        title: Input Shaping
        abstract: Lets you fine-tune input shaping and try out different shaper types
        author: Duet3D
        repo: InputShapingPlugin
        branch: master
        homepage: https://github.com/Duet3D/DSF-Plugins
        dwcVersion: 3.4
        sbcDSfVersion: undefined
        rrfVersion: undefined
        oem: true
        latest_version: v3.4.1-b1
        release_date: 2022-06-20T14:34:10Z
        release_page: https://github.com/Duet3D/InputShapingPlugin/releases/tag/v3.4.1-b1
        license: GPL-3.0-or-later
        license_file: https://raw.githubusercontent.com/Duet3D/InputShapingPlugin/master/LICENSE
        download_count: 254
        tags:
        - input shaping
        - tuning
        - dwc
        - duet3d
        ---
        
        # Input Shaping Plugin
        `

        const gh_release_data = [{ "url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/releases/69854907", "assets_url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/releases/69854907/assets", "upload_url": "https://uploads.github.com/repos/Duet3D/InputShapingPlugin/releases/69854907/assets{?name,label}", "html_url": "https://github.com/Duet3D/InputShapingPlugin/releases/tag/v3.4.1-b1", "id": 69854907, "author": { "login": "chrishamm", "id": 5919449, "node_id": "MDQ6VXNlcjU5MTk0NDk=", "avatar_url": "https://avatars.githubusercontent.com/u/5919449?v=4", "gravatar_id": "", "url": "https://api.github.com/users/chrishamm", "html_url": "https://github.com/chrishamm", "followers_url": "https://api.github.com/users/chrishamm/followers", "following_url": "https://api.github.com/users/chrishamm/following{/other_user}", "gists_url": "https://api.github.com/users/chrishamm/gists{/gist_id}", "starred_url": "https://api.github.com/users/chrishamm/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/chrishamm/subscriptions", "organizations_url": "https://api.github.com/users/chrishamm/orgs", "repos_url": "https://api.github.com/users/chrishamm/repos", "events_url": "https://api.github.com/users/chrishamm/events{/privacy}", "received_events_url": "https://api.github.com/users/chrishamm/received_events", "type": "User", "site_admin": false }, "node_id": "RE_kwDOHf9NmM4EKea7", "tag_name": "v3.4.1-b1", "target_commitish": "master", "name": "Version 3.4.1-b1", "draft": false, "prerelease": false, "created_at": "2022-06-20T14:25:04Z", "published_at": "2022-06-20T14:34:10Z", "assets": [{ "url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/releases/assets/70246615", "id": 70246615, "node_id": "RA_kwDOHf9NmM4EL-DX", "name": "InputShaping-3.4.1-b1.zip", "label": null, "uploader": { "login": "chrishamm", "id": 5919449, "node_id": "MDQ6VXNlcjU5MTk0NDk=", "avatar_url": "https://avatars.githubusercontent.com/u/5919449?v=4", "gravatar_id": "", "url": "https://api.github.com/users/chrishamm", "html_url": "https://github.com/chrishamm", "followers_url": "https://api.github.com/users/chrishamm/followers", "following_url": "https://api.github.com/users/chrishamm/following{/other_user}", "gists_url": "https://api.github.com/users/chrishamm/gists{/gist_id}", "starred_url": "https://api.github.com/users/chrishamm/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/chrishamm/subscriptions", "organizations_url": "https://api.github.com/users/chrishamm/orgs", "repos_url": "https://api.github.com/users/chrishamm/repos", "events_url": "https://api.github.com/users/chrishamm/events{/privacy}", "received_events_url": "https://api.github.com/users/chrishamm/received_events", "type": "User", "site_admin": false }, "content_type": "application/x-zip-compressed", "state": "uploaded", "size": 145762, "download_count": 266, "created_at": "2022-07-01T07:59:10Z", "updated_at": "2022-07-01T07:59:12Z", "browser_download_url": "https://github.com/Duet3D/InputShapingPlugin/releases/download/v3.4.1-b1/InputShaping-3.4.1-b1.zip" }], "tarball_url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/tarball/v3.4.1-b1", "zipball_url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/zipball/v3.4.1-b1", "body": "Enabled custom shaper tuning\r\nBug fix: When tools contained gaps, the record dialog could not be opened" }, { "url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/releases/69376350", "assets_url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/releases/69376350/assets", "upload_url": "https://uploads.github.com/repos/Duet3D/InputShapingPlugin/releases/69376350/assets{?name,label}", "html_url": "https://github.com/Duet3D/InputShapingPlugin/releases/tag/v3.4.0", "id": 69376350, "author": { "login": "chrishamm", "id": 5919449, "node_id": "MDQ6VXNlcjU5MTk0NDk=", "avatar_url": "https://avatars.githubusercontent.com/u/5919449?v=4", "gravatar_id": "", "url": "https://api.github.com/users/chrishamm", "html_url": "https://github.com/chrishamm", "followers_url": "https://api.github.com/users/chrishamm/followers", "following_url": "https://api.github.com/users/chrishamm/following{/other_user}", "gists_url": "https://api.github.com/users/chrishamm/gists{/gist_id}", "starred_url": "https://api.github.com/users/chrishamm/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/chrishamm/subscriptions", "organizations_url": "https://api.github.com/users/chrishamm/orgs", "repos_url": "https://api.github.com/users/chrishamm/repos", "events_url": "https://api.github.com/users/chrishamm/events{/privacy}", "received_events_url": "https://api.github.com/users/chrishamm/received_events", "type": "User", "site_admin": false }, "node_id": "RE_kwDOHf9NmM4EIple", "tag_name": "v3.4.0", "target_commitish": "master", "name": "Version 3.4.0-b1", "draft": false, "prerelease": false, "created_at": "2022-06-14T08:50:08Z", "published_at": "2022-06-14T08:51:39Z", "assets": [{ "url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/releases/assets/68424932", "id": 68424932, "node_id": "RA_kwDOHf9NmM4EFBTk", "name": "InputShaping-3.4.0-b1.zip", "label": null, "uploader": { "login": "chrishamm", "id": 5919449, "node_id": "MDQ6VXNlcjU5MTk0NDk=", "avatar_url": "https://avatars.githubusercontent.com/u/5919449?v=4", "gravatar_id": "", "url": "https://api.github.com/users/chrishamm", "html_url": "https://github.com/chrishamm", "followers_url": "https://api.github.com/users/chrishamm/followers", "following_url": "https://api.github.com/users/chrishamm/following{/other_user}", "gists_url": "https://api.github.com/users/chrishamm/gists{/gist_id}", "starred_url": "https://api.github.com/users/chrishamm/starred{/owner}{/repo}", "subscriptions_url": "https://api.github.com/users/chrishamm/subscriptions", "organizations_url": "https://api.github.com/users/chrishamm/orgs", "repos_url": "https://api.github.com/users/chrishamm/repos", "events_url": "https://api.github.com/users/chrishamm/events{/privacy}", "received_events_url": "https://api.github.com/users/chrishamm/received_events", "type": "User", "site_admin": false }, "content_type": "application/x-zip-compressed", "state": "uploaded", "size": 141791, "download_count": 20, "created_at": "2022-06-14T08:51:29Z", "updated_at": "2022-06-14T08:51:30Z", "browser_download_url": "https://github.com/Duet3D/InputShapingPlugin/releases/download/v3.4.0/InputShaping-3.4.0-b1.zip" }], "tarball_url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/tarball/v3.4.0", "zipball_url": "https://api.github.com/repos/Duet3D/InputShapingPlugin/zipball/v3.4.0", "body": "Plugin for version 3.4" }] 
        const stub_fs = sinon.stub(fs, "readFile");
        const stub_axios = sinon.stub(axios, "get");

        stub_fs.resolves(plugin_md);
        stub_axios.resolves({data : gh_release_data});
    });

    afterEach(()=>sinon.restore());

    it('Should return an object with stats' , async ()=> {
        const plugin_md_name = "InputShapingPlugin.md";
        const prev_plugin_stat_json = []
        const plugin_reported_json = [{ "plugin_id": "InputShapingPlugin", "author": "Duet3D", "plugin_submitted_on": "2022-09-01T10:53:37.289Z", "description": "Admin check", "steps_reproduce": "step 1", "additional_description": "additional", "timestamp": "2022-09-08T21:39:46.070Z" }]
        const res = await createPluginEntry(plugin_md_name, prev_plugin_stat_json, plugin_reported_json);
        console.log(res);
    });
});