const core = require('@actions/core');
const axios = require('axios');

async function run() {
  try {
    // Get inputs
    let serverUrl = core.getInput('serverUrl');
    const username = core.getInput('username');
    const password = core.getInput('password');
    const token = core.getInput('token');
    let startRelease = core.getInput('startRelease');
    let templateId = core.getInput('templateId');
    let releaseTitle = core.getInput('releaseTitle');
    let variables = core.getInput('variables');

    // Clean serverUrl and templateId
    serverUrl = serverUrl.replace(/\/+$/, ''); // Remove trailing slashes
    templateId = templateId.replace(/^\/+|\/+$/g, ''); // Remove leading and trailing slashes

    // Set default value for startRelease if not provided
    if (!startRelease) {
      startRelease = 'true';
    }

    // Validate required inputs
    if (!serverUrl || (!username && !token) || (!password && !token) || !templateId) {
      throw new Error('serverUrl, username/password or token, and templateId are required.');
    }

    // Generate release title if empty
    if (!releaseTitle) {
      const gitTag = process.env.GITHUB_TAG;
      const gitBranch = process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF.replace('refs/heads/', '');
      releaseTitle = gitTag || gitBranch || `GitHub Actions Release ${new Date().toISOString()}`;
    }

    // Parse variables if provided
    if (variables) {
      try {
        variables = JSON.parse(variables);
      } catch (error) {
        throw new Error('Failed to parse variables input as JSON.');
      }
    } else {
      variables = {};
    }

    // Construct request body
    const requestBody = {
      releaseTitle: releaseTitle,
      variables: variables
    };

    // Determine URL based on startRelease input
    let url = `${serverUrl}/api/v1/templates/${templateId}/${startRelease === 'true' ? 'start' : 'create'}`;

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
    const response = await axios.post(url, requestBody, { headers: headers });

    // Log response and set output
    console.log('Response:', response.data);
    core.setOutput('response', JSON.stringify(response.data));
    core.setOutput('id', response.data.id);
    core.setOutput('status', response.data.status);
  } catch (error) {
    // Handle errors
    core.setFailed(error.message);
  }
}

module.exports = {
  run
};

run();