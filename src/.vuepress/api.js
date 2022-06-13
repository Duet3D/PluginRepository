const axios = require('axios').default
const getReleases = async () => {
    const {data} = await axios.get('https://api.github.com/repos/Duet3D/DSF-Plugins/releases')
    const releases = data.map(x => {tag_name : x.tag_name})
    console.log(releases)
    return releases
}

module.exports = {
    getReleases
}