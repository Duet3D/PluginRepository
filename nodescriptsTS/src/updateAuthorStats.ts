const {updateAuthorStats:updatePluginAuthorStats} =  require('./statUtils');

try{
	updatePluginAuthorStats().then(res => {
		console.log(res);
	})	
}
catch(e){
	console.log(e);
}
