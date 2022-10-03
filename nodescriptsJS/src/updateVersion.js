const {updateVersion} =  require('./util');

updateVersion(process.argv[2]).then(res => {
	console.log(res)
})
