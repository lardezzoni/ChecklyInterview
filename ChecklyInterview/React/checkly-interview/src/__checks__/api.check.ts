import { ApiCheck } from 'checkly/constructs'

export const apiCheck = new ApiCheck('api-health-check', {
  name: 'API Health Check',
  frequency: 5, // Run every 5 minutes
  locations: ['us-east-1', 'eu-west-1'], // Monitoring locations
  degradedResponseTime: 2000, // Warn if response time exceeds 2s
  maxResponseTime: 5000, // Fail if response time exceeds 5s
  request: {
    method: 'GET',
    url: 'http://localhost:5000/api', // Replace with your API URL
    assertions: [
      {
        source: 'STATUS_CODE',
        property: '',
        comparison: 'EQUALS',
        target: '200', // Status code must be a string
        regex: 'false', // Not needed for STATUS_CODE
      },
      {
        source: 'JSON_BODY',
        property: 'message',
        comparison: 'EQUALS',
        target: 'Hello from server!',
        regex: 'false', // Set regex to false for an exact match
    },
],
},
})