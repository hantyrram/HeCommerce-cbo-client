const config = {};
const ENV = 'prod';
Object.defineProperty(config,'ENV',{value:ENV,configurable:false,writable:false});
Object.defineProperty(config,'API_VERSION',{value:'apiv1',configurable:false,writable:false});

module.exports = config;