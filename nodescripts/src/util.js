const axios = require('axios');
const wget = require('node-wget');
const { resolve } = require('path');

const insertLineToStr = (text, host_str = "") => {
    console.log(text);
    return host_str.concat('\n' , text);
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
        return await axios.post(`https://api.github.com/repos/Duet3D/PluginRepository/issues/${process.env.GITHUB_ISSUE}/comments`, JSON.stringify({"body":`"${comment}"`}), 
        {
            headers: {
                'Authorization' : `token ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github+json"
            }
        })

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

const exitProcess = async (message, host_str) => {
    insertLineToStr(message);
    const res_1 = await git.labelIssue('cannot-be-approved');
    const res_2 = await git.commentIssue(host_str);
    console.log(res_2)
    process.exit(1);
}

const readFile = (path) => {
    const fs = require('fs');
    return new Promise((resolve, reject) => {
        fs.readFile(path, (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(data.toString()));
        });
    });

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
        .on('end', () => resolve())
        .on('finish', () => resolve());
    })

}

const getStatus = (status) => {
    return status? "OK" : "NOT OK"
}

module.exports = {
    insertLineToStr,
    git,
    downloadFile,
    checkFile,
    exitProcess,
    readFile,
    writeLinetoFile,
    prepend,
    unzip,
    isFirstCharNum,
    getStatus
}