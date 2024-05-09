const axios = require('axios');
const core = require('@actions/core');
const index = require('../src/index');

jest.mock('axios');
jest.mock('@actions/core');

describe('Create and start release on Digital.ai Release', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should make a POST request with the correct parameters', async () => {
    // Mock the action's inputs
    core.getInput.mockImplementation(name => {
      switch (name) {
        case 'serverUrl':
          return 'http://example.com';
        case 'username':
          return 'testuser';
        case 'password':
          return 'testpassword';
        case 'token':
          return '';
        case 'templateId':
          return 'Applications/template123';
        case 'releaseTitle':
          return 'New Release';
        case 'variables':
          return '{"var1": "value1", "var2": "value2"}';
        case 'startRelease':
          return 'true';
        default:
          return '';
      }
    });

    // Mock the response from the API
    const responseData = { id: '123', title: 'New Release', status: 'IN_PROGRESS' };
    axios.post.mockResolvedValueOnce({ data: responseData });

    // Call the run function
    await index.run();

    // Check if axios.post is called with the correct parameters
    expect(axios.post).toHaveBeenCalledWith(
      'http://example.com/api/v1/templates/Applications/template123/start',
      {
        releaseTitle: 'New Release',
        variables: { var1: 'value1', var2: 'value2' }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdHVzZXI6dGVzdHBhc3N3b3Jk' // Base64 encoded username:password
        }
      }
    );

    // Check if the output is set correctly
    expect(core.setOutput).toHaveBeenCalledWith('response', JSON.stringify(responseData));
  });
});
