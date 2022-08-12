const {submissionPrecheck} =  require('./functions');

submissionPrecheck().then(res => {
	console.log(res)
})
