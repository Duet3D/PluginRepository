const {updateVersion: updateRepoVersion} =  require('./util');

updateRepoVersion(process.argv[3]).then(res => {
	console.log(res)
})
