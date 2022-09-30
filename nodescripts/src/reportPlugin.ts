const {reportPlugin:reportAbusePlugin} =  require('./functions');

reportAbusePlugin().then(res => {
	console.log(res)
})
