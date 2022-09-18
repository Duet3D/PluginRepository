const {updatePluginStats, authorStats} =  require('./statUtils');

try{
	updatePluginStats().then(res => {
		console.log(res);

        await authorStats();
	})	
}
catch(e){
	console.log(e);
}
