const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    // Get inputs
    let serverUrl = core.getInput('serverUrl');
    const username = core.getInput('username');
    const password = core.getInput('password');
    const token = core.getInput('token');
    const startRelease = core.getInput('startRelease');
    let templateId = core.getInput('templateId');
    let releaseTitle = core.getInput('releaseTitle');
    let variables = core.getInput('variables');
    
    // Remove trailing '/' from serverUrl
    if (serverUrl.endsWith('/')) {
      serverUrl = serverUrl.slice(0, -1);
    }

    // Remove leading and trailing '/' from templateId
    if (templateId.startsWith('/')) {
      templateId = templateId.slice(1);
    }
    if (templateId.endsWith('/')) {
      templateId = templateId.slice(0, -1);
    }
    
    // Check for empty required inputs
    if (!serverUrl || (!username && !token) || (!password && !token) || !templateId) {
      throw new Error('serverUrl, username/password or token, and templateId are required.');
    }

    // Generate release title if empty
    if (!releaseTitle) {
      const now = new Date();
      releaseTitle = `GitHub Actions Release ${now.toISOString()}`;
    }

    // Parse variables if provided
    if (variables) {
      variables = JSON.parse(variables);
    } else {
      variables = {};
    }

    // Construct request body
    const requestBody = {
      releaseTitle: releaseTitle,
      variables: variables
    };

    let url = `${serverUrl}/api/v1/templates/Applications/${templateId}/create`
    
    if (startRelease == 'true')
        url = `${serverUrl}/api/v1/templates/Applications/${templateId}/start`
    
    console.log('Request URL:', url);

    // Construct headers
    const headers = {
      'Content-Type': 'application/json'
    };

    // Add token to headers if provided
    if (token) {
      headers['x-release-personal-token'] = token;
    } else {
      // Add basic authentication if username and password are provided
      headers['Authorization'] = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`;
    }

    // Make API request
    const response = await axios.post(
      url,
      requestBody,
      {
        headers: headers
      }
    );

    // Log response and set output
    console.log('Response:', response.data);
    core.setOutput('response', JSON.stringify(response.data));
  } catch (error) {
    // Handle errors
    core.setFailed(error.message);
  }
}

module.exports = {
    run
  }

run();