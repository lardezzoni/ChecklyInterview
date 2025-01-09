import { ApiCheck } from 'checkly/constructs'
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../../../config/config.env') });
console.log('Config path:', path.resolve(__dirname, '../../../../config/config.env'));

export const apiCheck = new ApiCheck('api-health-check', {
  name: 'API Health Check',
  frequency: 5, 
  locations: ['us-east-1', 'eu-west-1'], 
  degradedResponseTime: 2000, 
  maxResponseTime: 5000, 
  request: {
    method: 'GET',
    url: process.env.URL+'/api', 
    assertions: [
      {
        source: 'STATUS_CODE',
        property: '',
        comparison: 'EQUALS',
        target: '200', 
        regex: 'false', 
      },
      {
        source: 'JSON_BODY',
        property: 'message',
        comparison: 'EQUALS',
        target: 'Hello from Node.js backend!',
        regex: 'false', 
    },
],
},
})
