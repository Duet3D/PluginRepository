const {precheck, createPR} =  require('./functions');

precheck().then(res => {
	console.log(res)
})
