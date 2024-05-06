const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    // Get inputs
    const releaseServerAddress = core.getInput('ReleaseServerAddress');
    const username = core.getInput('username');
    const password = core.getInput('password');
    const templateId = core.getInput('templateId');
    let releaseTitle = core.getInput('releaseTitle');
    let variables = core.getInput('variables');
    
    // Check for empty required inputs
    if (!releaseServerAddress || !username || !password) {
      throw new Error('ReleaseServerAddress, username, and password are required.');
    }

    // Generate release title if empty
    if (!releaseTitle) {
      const now = new Date();
      releaseTitle = `Release ${now.toISOString()}`;
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
      folderId: templateId,
      variables: variables
    };

    // Make API request
    const response = await axios.post(
      `${releaseServerAddress}/api/v1/templates/${templateId}/start`,
      requestBody,
      {
        auth: {
          username: username,
          password: password
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
