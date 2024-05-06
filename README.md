# Create and start release on Digital.ai Release from Github Actions

This GitHub Action enables the creation of a new release and starts it in the Digital.ai Release. It facilitates seamless integration between your GitHub repository and Digital.ai Release, automating release management processes.

## Inputs

| Name         | Description                                                                               | Required | Default |
|--------------|-------------------------------------------------------------------------------------------|----------|---------|
| `serverUrl`  | The address of the Digital.ai Release server.                                             | Yes      | -       |
| `username`   | Username for authentication to the Digital.ai Release server. Required if `token` is not provided. | No       | -       |
| `password`   | Password for authentication to the Digital.ai Release server. Required if `token` is not provided. | No       | -       |
| `token`      | Personal access token for authentication to the Digital.ai Release server. If provided, `username` and `password` are not required. | No       | -       |
| `templateId` | The full template identifier in Digital.ai Release.                                        | Yes      | -       |
| `releaseTitle` | Optional. Title of the release. If not provided, a default title will be assigned.       | No       | -       |
| `variables`  | Optional. JSON string representing the variables object to be passed to the release template. | No       | -       |
| `startRelease` | Optional. Boolean value indicating whether to start the release. Default is true.        | No       | true    |

## Outputs

| Name         | Description                                                                               |
|--------------|-------------------------------------------------------------------------------------------|
| `response`   | The response containing the data of the newly created release.                            |

## Example Usage

```yaml
name: Create and Start Release

on: [push]

jobs:
  create-and-start-release:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v2

      - name: Create and Start Release
        uses: your-username/your-action-repo@v1
        with:
          serverUrl: 'http://your-digital-ai-release-server-url'
          token: ${{ secrets.DIGITAL_AI_TOKEN }}
          templateId: 'your-template-identifier'
          releaseTitle: 'New Release'
          variables: '{"var1": "value1", "var2": "value2"}'
          startRelease: true
