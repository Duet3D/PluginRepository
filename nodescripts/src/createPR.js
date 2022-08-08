const {precheck, createPR} =  require('./functions');

createPR().then(res => {
	console.log(res)
})
