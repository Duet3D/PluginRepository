const {updateAuthorStats} =  require('./statUtils');

try{
	updateAuthorStats().then(res => {
		console.log(res);
	})	
}
catch(e){
	console.log(e);
}
