const {submissionPrecheck:pluginSubmissionPrecheck} =  require('./functions');

pluginSubmissionPrecheck().then(res => {
	console.log(res)
})
