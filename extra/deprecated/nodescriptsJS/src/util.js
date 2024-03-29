const axios = require('axios');
const { url } = require('inspector');
const wget = require('node-wget');

const insertLineToStr = (text, host_str = "") => {
    console.log(text);
    return host_str.concat(text, '\n');
}

const git = {
    labelIssue : async (label) => {
        try{
            return await axios.post(`https://api.github.com/repos/Duet3D/PluginRepository/issues/${process.env.GITHUB_ISSUE}/labels`, {"labels":[label]}, 
            {
                headers: {
                    'Authorization' : `token ${process.env.GITHUB_TOKEN}`,
                    "Accept": "application/vnd.github+json"
                }
            })
        }
        catch(e){
            return e
        }
    },
    commentIssue : async (comment) => {
        console.log(comment)
        return await axios.post(`https://api.github.com/repos/Duet3D/PluginRepository/issues/${process.env.GITHUB_ISSUE}/comments`, JSON.stringify({"body":`${comment}`}), 
        {
            headers: {
                'Authorization' : `token ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github+json"
            }
        })
    }
}

const isUserCollaborator = async () => {    
    try{
        const {status} = await axios.get(`https://api.github.com/repos/Duet3D/PluginRepository/collaborators/${process.env.GITHUB_USER}`, 
        {
            headers: {
                'Authorization' : `token ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github+json"
            }
        })
        if(status == 204){
            return true;
        }
        return false;
    }
    catch(e){
        console.log(e)
        return false;
    }

}

const isUserOrgMember = async () => {    
    try{
        const {status} = await axios.get(`https://api.github.com/orgs/Duet3D/members/${process.env.GITHUB_USER}`, 
        {
            headers: {
                'Authorization' : `token ${process.env.PAT_DUET3D_ADMIN_ORG_READ}`,
                "Accept": "application/vnd.github+json"
            }
        })
        if(status == 204){
            return true;
        }
        return false;
    }
    catch(e){
        console.log(e)
        return false;
    }

}

const downloadFile = async (url, dest) => {
    return new Promise((resolve, reject) => {
        wget({
            url: url,
            dest: dest,
            timeout: 2000
        },
            function (error, response, body) {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            }
        );
    })
}

const isFirstCharNum = (str) => {
	return (str && str.match(/^\d+/) || [])[0] != undefined
}

const checkFile = {
    local: (path) => {
        const fs = require('fs')
        try {
            if (fs.existsSync(path)) {
                return true
            }
            else{
                return false
            }
        } catch(err) {
            return false
        }
    },
    remote: async (url) => {
        try{
            const {status} = await axios.get(url);
            return status == 200
        }
        catch(e){
            const {response} = e;
            return false

        }
    }
}

const exitProcess = async (msg, checklog) => {
    console.log(msg);

    let checklog_out = insertLineToStr(msg, checklog);

    const res_1 = await git.labelIssue('cannot-be-approved');
    const res_2 = await git.commentIssue(checklog_out);
    process.exit(1);
}


const readFile = (path) = {
    JSON: async (path) => {
        const fs = require('fs');
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) reject(err);
                resolve(JSON.parse(data.toString()));
            });
        });    
    },
    TEXT: async (path) => {
        const fs = require('fs');
        return new Promise((resolve, reject) => {
            fs.readFile(path, (err, data) => {
                if (err) reject(err);
                resolve(data.toString());
            });
        });
    }
}


const writeFile = {
    writeJSON: (json, path) => {
        const fs = require('fs');
        return fs.writeFile(path, JSON.stringify(json), (err) => {
            if (err) throw err;
            return
        });
    },
    writeJSONSync: (json, path) => {
        const fs = require('fs');
        return new Promise((resolve, reject) => {
            fs.writeFile(path, JSON.stringify(json, null, 4), (err) => {
                if (err) reject(err);
                resolve();
            });
        })
    }
}

const writeLinetoFile = (str, path) => {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        fs.writeFile(path, str, (err) => {
            if (err) reject(err);
            resolve('ok');
        });
    })
}

const extractRepoURLDetails = (url) => {
    const split = url.split('/');
    let index = split.indexOf('github.com') == -1 ? split.indexOf('www.github.com') : split.indexOf('github.com')
    let repo = split[index+2]
    if(repo.slice(-4) == '.git'){
        repo = repo.slice(0, repo.length - 4)
    }
    return {PluginAuthor:split[index+1], PluginRepo: repo}
} 


const prepend = (text, file) => {
    const fs = require('fs');
    const data = fs.readFileSync(file)
    fd = fs.openSync(file, 'w+')
    buf = new Buffer(text)
    return new Promise((resolve, reject) => {
        fs.writeSync(fd, buf, 0, buf.length, 0);
        fs.write(fd, data, 0, data.length, buf.length, (err)=>{
            if (err) reject(err);
            fs.close(fd);
            resolve('ok');
        })
    })
}

const unzip = () => {
    const fs = require('fs');
    const unzipper = require('unzipper');
    return new Promise((resolve, reject)=>{
        fs.createReadStream('asset.zip').pipe(unzipper.Extract({ path: 'unzipped/' }))
        .on('error', (err) => reject(err))
        .on('close', () => resolve());
    })

}

const getStatus = (status) => {
    return status? "OK" : "NOT OK"
}

const lowerCaseKeys = (plugin_manifest) => {
    const plugin_manifest_keys = Object.keys(plugin_manifest).map(x=> [x, x.toLowerCase()]);
    const plugin_manifest_new = {}
    plugin_manifest_keys.forEach( key => {plugin_manifest_new[key[1]] = plugin_manifest[key[0]]})
    return plugin_manifest_new
}

const getFrontmatterObject = (key, plugin_md) => {
    const fm_val = (plugin_md.split('\n').find( x => x.includes(key)) || "").replace(`${key}:`, "").trim();
    return fm_val == "" ? undefined : fm_val;
}

const updateVersion = async (release_type = 'patch', file = 'package.json') => {
    const ver_block = { major : 0, minor : 1, patch : 2 };
    const package_json = await readFile.JSON('package.json');
    const ver_list = (package_json['version']||[]).split('.');
    ver_list[ver_block[release_type]] = parseInt(ver_list[ver_block[release_type]]) + 1;
    package_json['version'] =  ver_list.join('.');

    return await writeFile.writeJSONSync(package_json, file);
}

const getFileSizeKiB = async (file) => {
	const fs = require('fs');
	const stat = await fs.promises.stat(file)
	return stat.size/1024;
}

const fetchURL = async (url) => {
    const {data} = await axios.get(url);
    return data;
}

module.exports = {
    insertLineToStr,
    git,
    isUserCollaborator,
    isUserOrgMember,
    downloadFile,
    checkFile,
    fetchURL,
    exitProcess,
    readFile,
    writeFile,
    updateVersion,
    writeLinetoFile,
    prepend,
    unzip,
    isFirstCharNum,
    getStatus,
    getFrontmatterObject,
    lowerCaseKeys,
    extractRepoURLDetails,
    getFileSizeKiB
}