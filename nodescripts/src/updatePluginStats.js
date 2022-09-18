const {updatePluginStats, authorStats} =  require('./statUtils');

try{
	updatePluginStats().then(res => {
		console.log(res);

        authorStats().then(res2 => {
			console.log(res2);
		});
	})	
}
catch(e){
	console.log(e);
}
