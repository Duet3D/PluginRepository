const {submissionCreatePR:pluginSubmissionCreatePR} =  require('./functions');

pluginSubmissionCreatePR().then(res => {
	console.log(res)
})