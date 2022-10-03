const {updateVersion: updateRepoVersion} =  require('./util');

updateRepoVersion(process.argv[2]).then(res => {
	console.log(res)
})
