const {createPR} =  require('./createPR');
const {precheck} = require('./preCheck')

precheck().then(res => {
	console.log(res)
})
