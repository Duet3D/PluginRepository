const { insertLineToStr, git, downloadFile, checkFile, exitProcess, 
    readFile: {JSON: readJSON, TEXT: readTEXT}, writeLinetoFile, prepend, unzip, isFirstCharNum, writeFile: {writeJSONSync},
    getStatus, getFrontmatterObject, isUserCollaborator, lowerCaseKeys, extractRepoURLDetails, isUserOrgMember, getFileSizeKiB} = require('../../deprecated/nodescriptsJS/src/util');;
const axios = require('axios');


const getReleases = async (gituser, gitrepo) => {
    let items;
    let data = await fetch(`https://api.github.com/repos/${gituser}/${gitrepo}/releases`);
    data = await data.json()
    let i = 0;
    items = data.map(item => {
        i++;
        return {
            tagName: (item || {}).tag_name, //+ `${i == 1 ? " [Latest]" : ""}`,
            browser_download_url: (((item || {}).assets || [])[0] || {})['browser_download_url'],
            published_at: (item || {}).published_at || (item || {}).created_at
        }
    })
    return items;
}

const getPlatformVersionPerRelease = async (browser_download_url) => {
    await downloadFile(browser_download_url, 'asset.zip');

    let version_list = [];

    try{
        await unzip();
    }
    catch(err){
        console.log(err);
    }

    res = checkFile.local('unzipped/plugin.json');
    if(!res){
        return [{
            version: "not_found",
            platform: "not_found"
        }]
    }

    const plugin_manifest = lowerCaseKeys(await readJSON('unzipped/plugin.json') || {});
    
    const {dwcversion : dwcVersion, sbcdsfversion : sbcDSfVersion, rrfversion : rrfVersion} = plugin_manifest;

    if(isFirstCharNum(dwcVersion)) {
        version_list.push(
            {
                version: dwcVersion,
                platform: "DWC"
            }
        )
    }
    if(isFirstCharNum(sbcDSfVersion)) {
        version_list.push(
            {
                version: sbcDSfVersion,
                platform: "DSF"
            }
        )
    }
    if(isFirstCharNum(rrfVersion)) {
        version_list.push(
            {
                version: rrfVersion,
                platform: "RRF"
            }
        )
    }


    if(version_list.length == 0) {
        version_list.push(
            {
                version: "not_found",
                platform: "not_found"
            }
        )
    }

    return version_list;

}

const getPluginPlatformVersionList = async (gituser, gitrepo) => {
    const releases = await getReleases(gituser, gitrepo) || [];
    for (let i = 0; i < releases.length; i++) {
        const release = releases[i];
        const {browser_download_url} = release;
        const version_list = await getPlatformVersionPerRelease(browser_download_url);
        releases[i].version_list = version_list;
      }
      await writeJSONSync(releases, `${gitrepo}.json`)
      console.log(gitrepo, " : Done");
    return releases
}


const list = [
    {
        "plugin_id": "BtnCmd",
        "author": "MintyTrebor",
        "plugin_manifest": {
            "dwcWebpackChunk": "BtnCmd",
            "id": "BtnCmd",
            "name": "BtnCmd",
            "author": "Minty Trebor",
            "version": "01.01.01",
            "license": "GPL-3.0-or-later",
            "homepage": "https://github.com/MintyTrebor",
            "dwcVersion": "3.5.0-b1",
            "dependencies": {
                "precompiled-mqtt": "^4.3.7",
                "deepmerge": "^4.2.2",
                "axios": "^1.2.1",
                "vue-draggable-resizable": "^2.3.0",
                "jsonpath": "^1.1.1",
                "vuedraggable": "^2.24.3"
            }
        },
        "latest_release": "01.01.01",
        "releases": [
            {
                "tag_name": "01.01.01",
                "name": "BtnCmd v01.01.01 for DWC 3.5+",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/01.01.01/BtnCmd_DWC3.5_v01.01.01.zip",
                "published_at": "2022-12-24T15:03:35Z"
            },
            {
                "tag_name": "Beta_0.10.15",
                "name": "Beta 0.10.15",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.15/BtnCmd_DWC3.4_Beta.0.10.15.zip",
                "published_at": "2022-11-06T19:52:38Z"
            },
            {
                "tag_name": "Beta_0.10.14",
                "name": "Beta 0.10.14",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.14/BtnCmd_DWC3.4_Beta.0.10.14.zip",
                "published_at": "2022-10-03T12:56:22Z"
            },
            {
                "tag_name": "Beta_0.10.13",
                "name": "Beta 0.10.13",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.13/BtnCmd_DWC3.4_Beta.0.10.13.zip",
                "published_at": "2022-07-11T13:16:18Z"
            },
            {
                "tag_name": "Beta_0.10.12",
                "name": "Beta 0.10.12",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.12/BtnCmd_DWC3.4_Beta.0.10.12.zip",
                "published_at": "2022-06-18T08:34:44Z"
            },
            {
                "tag_name": "Beta_0.10.11",
                "name": "Beta 0.10.11",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.11/BtnCmd_DWC3.4_Beta.0.10.11.zip",
                "published_at": "2022-06-11T06:51:51Z"
            },
            {
                "tag_name": "Beta_0.10.10",
                "name": "Beta 0.10.10",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.10/BtnCmd_DWC3.4_Beta.0.10.10.zip",
                "published_at": "2022-06-08T14:26:15Z"
            },
            {
                "tag_name": "Beta_0.10.09",
                "name": "Beta 0.10.09",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.09/BtnCmd_DWC3.4_Beta.0.10.09.zip",
                "published_at": "2022-05-05T10:21:22Z"
            },
            {
                "tag_name": "Beta_0.10.08",
                "name": "Beta 0.10.08",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.08/BtnCmd_DWC3.4_Beta.0.10.08.zip",
                "published_at": "2022-03-24T16:37:32Z"
            },
            {
                "tag_name": "Beta_0.10.07",
                "name": "Beta 0.10.07",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.07/BtnCmd_DWC3.4_Beta.0.10.07.zip",
                "published_at": "2022-03-04T14:49:15Z"
            },
            {
                "tag_name": "Beta_0.10.06",
                "name": "Beta 0.10.06",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.06/BtnCmd_DWC3.4RC1_Beta.0.10.06.zip",
                "published_at": "2022-02-11T17:08:43Z"
            },
            {
                "tag_name": "Beta_0.10.03",
                "name": "Beta 0.10.03 Input Panel Changes and bug fixes",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.03/BtnCmd_DWC3.4b7_Beta.0.10.03.zip",
                "published_at": "2021-12-28T13:24:32Z"
            },
            {
                "tag_name": "Beta_0.10.02",
                "name": "Beta 0.10.02 - Move to 3.4b7",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.10.02/BtnCmd_DWC3.4b7_Beta.0.10.02.zip",
                "published_at": "2021-12-21T16:23:50Z"
            },
            {
                "tag_name": "Beta_0.9.06",
                "name": "Beta 0.9.06",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.9.06/BtnCmd_DWC3.3_Beta.0.9.06.zip",
                "published_at": "2021-11-05T14:04:20Z"
            },
            {
                "tag_name": "Beta_0.9.04",
                "name": "Beta 0.9.04",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.9.04/BtnCmd_DWC3.3_Beta.0.9.04.zip",
                "published_at": "2021-10-20T14:57:19Z"
            },
            {
                "tag_name": "Beta_0.9.03",
                "name": "Beta 0.9.03",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.9.03/BtnCmd_DWC3.3_Beta.0.9.03.zip",
                "published_at": "2021-10-19T13:06:31Z"
            },
            {
                "tag_name": "Beta_0.9.02",
                "name": "Beta 0.9.02",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.9.02/BtnCmd_DWC3.3_Beta.0.9.02.zip",
                "published_at": "2021-10-16T12:34:55Z"
            },
            {
                "tag_name": "Beta_0.9.01",
                "name": "Beta 0.9.01",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Beta_0.9.01/BtnCmd_DWC3.3_Beta.0.9.01.zip",
                "published_at": "2021-10-06T11:20:39Z"
            },
            {
                "tag_name": "Alpha_0.8.21",
                "name": "Alpha 0.8.21",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.21/BtnCmd_DWC3.3_Alpha.0.8.21.zip",
                "published_at": "2021-10-01T09:27:41Z"
            },
            {
                "tag_name": "Alpha_0.8.20",
                "name": "Alpha 0.8.20 Tweaks & Bug Fixes",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.20/BtnCmd_DWC3.3_Alpha.0.8.20.zip",
                "published_at": "2021-06-20T14:13:57Z"
            },
            {
                "tag_name": "Alpha_0.8.19",
                "name": "Alpha 0.8.19 DWC 3.3",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.19/BtnCmd_DWC3.3_Alpha.0.8.19.zip",
                "published_at": "2021-06-17T11:30:42Z"
            },
            {
                "tag_name": "Alpha_0.8.18",
                "name": "Alpha 0.8.18 New Custom Panels",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.18/BtnCmd_DWC3.2_Alpha.0.8.18.zip",
                "published_at": "2021-05-08T08:04:30Z"
            },
            {
                "tag_name": "Alpha_0.8.17",
                "name": "Alpha 0.8.17",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.17/BtnCmd_DWC3.3b3_Alpha.0.8.17.zip",
                "published_at": "2021-04-24T19:17:33Z"
            },
            {
                "tag_name": "Alpha_0.8.16",
                "name": "Alpha 0.8.16 - Experimental New Machine Model Value Panel",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.16/BtnCmd_DWC3.3b3_Alpha.0.8.16.zip",
                "published_at": "2021-04-24T09:54:11Z"
            },
            {
                "tag_name": "Alpha_0.8.15",
                "name": "Alpha 0.8.15 - New Button Action & Mobile bug fixes",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.15/BtnCmd_DWC3.2_Alpha.0.8.15.zip",
                "published_at": "2021-04-21T12:35:07Z"
            },
            {
                "tag_name": "Alpha_0.8.14",
                "name": "Alpha 0.8.14 - New Panel & Bug Fixes",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.14/BtnCmd_DWC3.2_Alpha.0.8.14.zip",
                "published_at": "2021-04-17T12:06:13Z"
            },
            {
                "tag_name": "Alpha_0.8.13",
                "name": "Alpha 0.8.13 - Small UI Changes",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.13/BtnCmd_DWC3.2_Alpha.0.8.13.zip",
                "published_at": "2021-04-15T10:41:09Z"
            },
            {
                "tag_name": "Alpha_0.8.12",
                "name": "Alpha 0.8.12 - Mobile compatability, UI changes, bug fixes",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.12/BtnCmd_DWC3.2_Alpha.0.8.12.zip",
                "published_at": "2021-04-14T12:25:21Z"
            },
            {
                "tag_name": "Alpha_0.8.8",
                "name": "Alpha 0.8.8 - New Panels Feature",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.8/BtnCmd_DWC3.2_Alpha.0.8.8.zip",
                "published_at": "2021-04-09T13:44:59Z"
            },
            {
                "tag_name": "Alpha_0.8.6",
                "name": "Alpha 0.8.6 - Snap to Grid options + http improvements",
                "download_url": "https://github.com/MintyTrebor/BtnCmd/releases/download/Alpha_0.8.6/BtnCmd_DWC3.2_Alpha.0.8.6.zip",
                "published_at": "2021-04-06T15:24:55Z"
            }
        ]
    },
    {
        "plugin_id": "Closed-Loop-Plugin",
        "author": "Duet3D",
        "plugin_manifest": {
            "id": "ClosedLoopTuning",
            "name": "Closed Loop Tuning",
            "author": "Louis Irwin, Juan Rosario",
            "version": "3.5-b1",
            "dwcVersion": "3.5",
            "license": "GPL-3.0",
            "homepage": "https://duet3d.com",
            "tags": [
                "closed loop",
                "tuning"
            ]
        },
        "latest_release": "v3.5.0-b1",
        "releases": [
            {
                "tag_name": "v3.5.0-b1",
                "name": "Version 3.5.0-b1",
                "download_url": "https://github.com/Duet3D/Closed-Loop-Plugin/releases/download/v3.5.0-b1/ClosedLoopTuning-3.5-b1.zip",
                "published_at": "2022-12-27T13:11:42Z"
            },
            {
                "tag_name": "v3.4-b1",
                "name": "Version 3.4-b1",
                "download_url": "https://github.com/Duet3D/Closed-Loop-Plugin/releases/download/v3.4-b1/ClosedLoopTuning-3.4-b1.zip",
                "published_at": "2022-03-16T16:15:09Z"
            },
            {
                "tag_name": "0.2-alpha",
                "name": "Release 0.2 alpha",
                "download_url": "https://github.com/Duet3D/Closed-Loop-Plugin/releases/download/0.2-alpha/closed-loop-plugin.zip",
                "published_at": "2021-08-18T13:26:12Z"
            },
            {
                "tag_name": "0.1-alpha",
                "name": "Release 0.1 alpha",
                "download_url": "https://github.com/Duet3D/Closed-Loop-Plugin/releases/download/0.1-alpha/closed-loop-plugin.zip",
                "published_at": "2021-08-18T10:00:04Z"
            }
        ]
    },
    {
        "plugin_id": "DSF_ExecOnMcode_Plugin",
        "author": "LoicGRENON",
        "plugin_manifest": {
            "id": "ExecOnMcode",
            "name": "ExecOnMcode",
            "author": "Loïc GRENON",
            "version": "0.2",
            "license": "GPL-3.0-or-later",
            "homepage": "https://github.com/LoicGRENON/DSF_ExecOnMcode_Plugin",
            "dwcVersion": "3.4.5",
            "sbcRequired": true,
            "sbcDsfVersion": "3.4.5",
            "sbcExecutable": "execOnMcode.py",
            "sbcOutputRedirected": true,
            "sbcPermissions": [
                "codeInterceptionRead",
                "commandExecution",
                "fileSystemAccess",
                "launchProcesses",
                "registerHttpEndpoints"
            ],
            "sbcPythonDependencies": [
                "dsf-python>=3.4.5"
            ]
        },
        "latest_release": "v0.2",
        "releases": [
            {
                "tag_name": "v0.2",
                "name": "ExecOnMcode v0.2",
                "download_url": "https://github.com/LoicGRENON/DSF_ExecOnMcode_Plugin/releases/download/v0.2/ExecOnMcode-0.2.zip",
                "published_at": "2022-12-15T19:16:22Z"
            },
            {
                "tag_name": "v0.1",
                "name": "ExecOnMcode v0.1",
                "download_url": "https://github.com/LoicGRENON/DSF_ExecOnMcode_Plugin/releases/download/v0.1/ExecOnMcode-0.1.zip",
                "published_at": "2022-09-04T19:15:54Z"
            }
        ]
    },
    {
        "plugin_id": "DWC-CAN-Manager",
        "author": "Sindarius",
        "plugin_manifest": {
            "id": "CANManager",
            "name": "CAN Manager",
            "author": "Juan Rosario",
            "version": "1.0.0",
            "license": "LGPL-3.0-or-later",
            "homepage": "https://github.com/Sindarius/CANManager",
            "dwcVersion": "3.4"
        },
        "latest_release": "V1.0.0",
        "releases": [
            {
                "tag_name": "V1.0.0",
                "name": "Version 1.0 Release",
                "download_url": "https://github.com/Sindarius/DWC-CAN-Manager/releases/download/V1.0.0/CANManager-1.0.0.zip",
                "published_at": "2022-07-29T19:32:53Z"
            }
        ]
    },
    {
        "plugin_id": "DWC_GamepadJogger_Plugin",
        "author": "Sindarius",
        "plugin_manifest": {
            "id": "GamepadJogger",
            "name": "Gamepad Jogger",
            "author": "Juan Rosario (Sindarius)",
            "version": "1.0.0",
            "dwcVersion": "3.3",
            "license": "LGPL-3.0-or-later",
            "homepage": "https://github.com/Sindarius/DWC_GamepadJogger_Plugin"
        },
        "latest_release": "1.0.0",
        "releases": [
            {
                "tag_name": "1.0.0",
                "name": "3.3 and 3.4 support",
                "download_url": "https://github.com/Sindarius/DWC_GamepadJogger_Plugin/releases/download/1.0.0/GamepadJoggerPlugin_3_3.zip",
                "published_at": "2021-08-30T12:34:24Z"
            },
            {
                "tag_name": "0.2.0",
                "name": "Keyboard Control",
                "download_url": "https://github.com/Sindarius/DWC_GamepadJogger_Plugin/releases/download/0.2.0/GamepadJogger.zip",
                "published_at": "2020-12-23T13:24:58Z"
            },
            {
                "tag_name": "0.1.2",
                "name": "Update for 3.2 RC1",
                "download_url": "https://github.com/Sindarius/DWC_GamepadJogger_Plugin/releases/download/0.1.2/GamepadJogger.zip",
                "published_at": "2020-12-21T22:19:53Z"
            },
            {
                "tag_name": "0.1.1",
                "name": "Beta4 ",
                "download_url": "https://github.com/Sindarius/DWC_GamepadJogger_Plugin/releases/download/0.1.1/GamepadJogger.zip",
                "published_at": "2020-11-27T14:13:51Z"
            },
            {
                "tag_name": "0.1.0",
                "name": "First release of gamepad jogger",
                "download_url": "https://github.com/Sindarius/DWC_GamepadJogger_Plugin/releases/download/0.1.0/GamepadJogger.zip",
                "published_at": "2020-11-26T12:30:34Z"
            }
        ]
    },
    {
        "plugin_id": "EndstopsMonitorPlugin",
        "author": "Duet3D",
        "plugin_manifest": {
            "id": "EndstopsMonitor",
            "name": "Endstops Monitor",
            "author": "Duet3D Ltd",
            "version": "3.5.0-b1",
            "license": "GPL-3.0-or-later",
            "homepage": "https://github.com/Duet3D/DSF-Plugins",
            "dwcVersion": "3.5.0-b1",
            "tags": [
                "endstops"
            ]
        },
        "latest_release": "v3.5.0-b1",
        "releases": [
            {
                "tag_name": "v3.5.0-b1",
                "name": "Version 3.5.0-b1",
                "download_url": "https://github.com/Duet3D/EndstopsMonitorPlugin/releases/download/v3.5.0-b1/EndstopsMonitor-3.5.0-b1.zip",
                "published_at": "2022-12-27T13:10:03Z"
            },
            {
                "tag_name": "v3.4",
                "name": "Version 3.4",
                "download_url": "https://github.com/Duet3D/EndstopsMonitorPlugin/releases/download/v3.4/EndstopsMonitor-3.4.0.zip",
                "published_at": "2022-06-14T08:35:28Z"
            },
            {
                "tag_name": "v3.3",
                "name": "Version 3.3",
                "download_url": "https://github.com/Duet3D/EndstopsMonitorPlugin/releases/download/v3.3/EndstopsMonitor-3.3.0.zip",
                "published_at": "2022-06-14T08:33:51Z"
            },
            {
                "tag_name": "v3.4-rc2",
                "name": "Version 3.4-rc2",
                "download_url": "https://github.com/Duet3D/EndstopsMonitorPlugin/releases/download/v3.4-rc2/EndstopsMonitor-3.4.0-rc2.zip",
                "published_at": "2022-06-14T08:35:01Z"
            },
            {
                "tag_name": "v3.4-rc1",
                "name": "Version 3.4-rc1",
                "download_url": "https://github.com/Duet3D/EndstopsMonitorPlugin/releases/download/v3.4-rc1/EndstopsMonitor-3.4.0-rc1.zip",
                "published_at": "2022-06-14T08:34:30Z"
            }
        ]
    },
    {
        "plugin_id": "InputShapingPlugin",
        "author": "Duet3D",
        "plugin_manifest": {
            "id": "InputShaping",
            "name": "Input Shaping",
            "author": "Duet3D Ltd",
            "version": "3.5.0-b1",
            "license": "GPL-3.0-or-later",
            "homepage": "https://github.com/Duet3D/DSF-Plugins",
            "dwcVersion": "3.5",
            "tags": [
                "input shaping",
                "tuning"
            ]
        },
        "latest_release": "v3.5.0-b1",
        "releases": [
            {
                "tag_name": "v3.5.0-b1",
                "name": "Version 3.5.0-b1",
                "download_url": "https://github.com/Duet3D/InputShapingPlugin/releases/download/v3.5.0-b1/InputShaping-3.5.0-b1.zip",
                "published_at": "2022-12-27T13:07:55Z"
            },
            {
                "tag_name": "v3.4.1-b1",
                "name": "Version 3.4.1-b1",
                "download_url": "https://github.com/Duet3D/InputShapingPlugin/releases/download/v3.4.1-b1/InputShaping-3.4.1-b1.zip",
                "published_at": "2022-06-20T14:34:10Z"
            },
            {
                "tag_name": "v3.4.0",
                "name": "Version 3.4.0-b1",
                "download_url": "https://github.com/Duet3D/InputShapingPlugin/releases/download/v3.4.0/InputShaping-3.4.0-b1.zip",
                "published_at": "2022-06-14T08:51:39Z"
            }
        ]
    },
    {
        "plugin_id": "MotionWebcamServerPlugin",
        "author": "Duet3D",
        "plugin_manifest": {
            "id": "MotionWebcamServer",
            "name": "Motion Webcam Server",
            "author": "Duet3D Ltd",
            "version": "3.5.0-b1",
            "license": "GPL-2.0-only",
            "homepage": "https://github.com/Duet3D/DSF-Plugins",
            "sbcRequired": true,
            "sbcDsfVersion": "3.5.0-b1",
            "sbcExecutable": "motion",
            "sbcExecutableArguments": "-c /opt/dsf/sd/sys/motion.conf",
            "sbcOutputRedirected": false,
            "sbcPackageDependencies": [
                "libavcodec58",
                "libavdevice58",
                "libavformat58",
                "libavutil56",
                "libc6",
                "libgnutls30",
                "libjpeg62-turbo",
                "libmariadb3",
                "libmicrohttpd12",
                "libpq5",
                "libsqlite3-0",
                "libswscale5",
                "libwebp6",
                "libwebpmux3",
                "zlib1g"
            ],
            "sbcPermissions": [
                "networkAccess",
                "webcamAccess",
                "readSystem"
            ],
            "tags": [
                "motion",
                "webcam",
                "server"
            ]
        },
        "latest_release": "v3.5.0-b1",
        "releases": [
            {
                "tag_name": "v3.5.0-b1",
                "name": "Version 3.5.0-b1",
                "download_url": "https://github.com/Duet3D/MotionWebcamServerPlugin/releases/download/v3.5.0-b1/MotionWebcamServerPlugin-3.5.0-b1.zip",
                "published_at": "2022-12-27T13:17:03Z"
            },
            {
                "tag_name": "v3.4",
                "name": "Version 3.4",
                "download_url": "https://github.com/Duet3D/MotionWebcamServerPlugin/releases/download/v3.4/MotionWebcamServer-3.4.0.zip",
                "published_at": "2022-06-14T08:40:25Z"
            }
        ]
    },
    {
        "plugin_id": "ObjectCancelPlugin",
        "author": "Sindarius",
        "plugin_manifest": {
            "id": "ObjectCancel",
            "name": "Object Cancel",
            "author": "Juan Rosario",
            "version": "1.3.0",
            "license": "LGPL-3.0-or-later",
            "homepage": "https://github.com/Sindarius/ObjectCancelPlugin",
            "dwcVersion": "3.5"
        },
        "latest_release": "1.3",
        "releases": [
            {
                "tag_name": "1.3",
                "name": "Support for 3.5",
                "download_url": "https://github.com/Sindarius/ObjectCancelPlugin/releases/download/1.3/ObjectCancel-1.3.0.zip",
                "published_at": "2022-12-24T15:27:21Z"
            },
            {
                "tag_name": "1.2.0",
                "name": "1.2.0",
                "download_url": "https://github.com/Sindarius/ObjectCancelPlugin/releases/download/1.2.0/ObjectCancel-1.2.0.zip",
                "published_at": "2022-07-29T20:39:16Z"
            },
            {
                "tag_name": "1.1.0",
                "name": "Version 1.1 for DWC 3.4.1",
                "download_url": "https://github.com/Sindarius/ObjectCancelPlugin/releases/download/1.1.0/ObjectCancel-1.1.0.zip",
                "published_at": "2022-06-05T22:29:53Z"
            },
            {
                "tag_name": "1.0.0",
                "name": "Initial Release",
                "download_url": "https://github.com/Sindarius/ObjectCancelPlugin/releases/download/1.0.0/ObjectCancelPlugin-3.3.zip",
                "published_at": "2021-08-22T12:36:15Z"
            }
        ]
    },
    {
        "plugin_id": "ReleaseMgr",
        "author": "MintyTrebor",
        "plugin_manifest": {
            "dwcWebpackChunk": "ReleaseMgr",
            "id": "ReleaseMgr",
            "name": "ReleaseMgr",
            "author": "Minty Trebor",
            "version": "0.01.16",
            "license": "GPL-3.0-or-later",
            "homepage": "https://github.com/MintyTrebor",
            "dwcVersion": "3.5.0-b1",
            "dependencies": {
                "axios": "^1.2.1",
                "marked": "^4.2.4"
            }
        },
        "latest_release": "0.01.16Beta",
        "releases": [
            {
                "tag_name": "0.01.16Beta",
                "name": "ReleaseMgr v0.01.16 Beta",
                "download_url": "https://github.com/MintyTrebor/ReleaseMgr/releases/download/0.01.16Beta/ReleaseMgr_Beta_V0.01.16_DWC_3.5.zip",
                "published_at": "2022-12-24T14:06:19Z"
            },
            {
                "tag_name": "0.01.15Beta",
                "name": "ReleaseMgr v0.01.15 Beta",
                "download_url": "https://github.com/MintyTrebor/ReleaseMgr/releases/download/0.01.15Beta/ReleaseMgr_Beta_V0.01.15_DWC_3.4.zip",
                "published_at": "2022-09-28T12:59:33Z"
            },
            {
                "tag_name": "0.01.14Beta",
                "name": " ReleaseMgr v0.01.14 Beta  ",
                "download_url": "https://github.com/MintyTrebor/ReleaseMgr/releases/download/0.01.14Beta/ReleaseMgr_Beta_V0.01.14_DWC_3.3.zip",
                "published_at": "2022-07-07T15:26:26Z"
            },
            {
                "tag_name": "0.01.13Beta",
                "name": "v0.01.13",
                "download_url": "https://github.com/MintyTrebor/ReleaseMgr/releases/download/0.01.13Beta/ReleaseMgr_Beta_V0.01.13_DWC_3.3.zip",
                "published_at": "2022-03-17T16:14:36Z"
            },
            {
                "tag_name": "0.01.12Beta",
                "name": "ReleaseMgr v0.01.12 Beta ",
                "download_url": "https://github.com/MintyTrebor/ReleaseMgr/releases/download/0.01.12Beta/ReleaseMgr_Beta_V0.01.12_DWC_3.3.zip",
                "published_at": "2022-03-07T16:31:41Z"
            },
            {
                "tag_name": "0.01.11Beta",
                "name": "Beta 0.01.11",
                "download_url": "https://github.com/MintyTrebor/ReleaseMgr/releases/download/0.01.11Beta/ReleaseMgr_Beta_V0.01.11_DWC_3.3.zip",
                "published_at": "2022-03-05T16:45:54Z"
            },
            {
                "tag_name": "0.01.10Beta",
                "name": "First Release - v0.01.10Beta",
                "download_url": "https://github.com/MintyTrebor/ReleaseMgr/releases/download/0.01.10Beta/ReleaseMgr_Beta_V0.01.10_DWC_3.3.zip",
                "published_at": "2022-03-01T18:06:57Z"
            }
        ]
    },
    {
        "plugin_id": "RevoConfigPlugin",
        "author": "chrishamm",
        "plugin_manifest": {
            "id": "RevoPluginConfig",
            "name": "E3D Revo Config Plugin",
            "author": "Christian Hammacher",
            "version": "1.1.0",
            "license": "MIT",
            "homepage": "https://github.com/chrishamm/RevoConfigPlugin",
            "tags": [
                "config",
                "revo"
            ],
            "rrfVersion": "3.4"
        },
        "latest_release": "v1.1.0",
        "releases": [
            {
                "tag_name": "v1.1.0",
                "name": "Version 1.1.0",
                "download_url": "https://github.com/chrishamm/RevoConfigPlugin/releases/download/v1.1.0/RevoConfigPlugin-1.1.0.zip",
                "published_at": "2022-12-14T16:39:40Z"
            },
            {
                "tag_name": "v1.0.0",
                "name": "Version 1.0.0",
                "download_url": "https://github.com/chrishamm/RevoConfigPlugin/releases/download/v1.0.0/RevoConfigPlugin-1.0.0.zip",
                "published_at": "2022-12-09T16:25:54Z"
            }
        ]
    }
]

const run_all = async (list) => {
    for(x=0;x < list.length ; x ++){
        await getPluginPlatformVersionList(list[x]['author'], list[x]['plugin_id'])
    }
    return true
}
run_all(list).then(res=>console.log(true))