const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    // Get inputs
    const serverUrl = core.getInput('serverUrl');
    const username = core.getInput('username');
    const password = core.getInput('password');
    const templateId = core.getInput('templateId');
    const startRelease = core.getInput('startRelease');
    let releaseTitle = core.getInput('releaseTitle');
    let variables = core.getInput('variables');
    
    // Check for empty required inputs
    if (!serverUrl || !username || !password || !templateId) {
      throw new Error('serverUrl, username, password and templateId are required.');
    }

    // Generate release title if empty
    if (!releaseTitle) {
      const now = new Date();
      releaseTitle = `GitHub Action Release ${now.toISOString()}`;
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
    
    console.log(url)

    // Make API request
    const response = await axios.post(
      url,
      requestBody,
      {
        auth: {
          username: username,
          password: password
        }
        ,
        headers: {
          'Content-Type': 'application/json'
        }
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

run();
