# Create and start release on Digital.ai Release from GitHub Actions

This GitHub Action enables the creation of a new release and start it on the Digital.ai Release. It facilitates seamless integration between your GitHub repository and Digital.ai Release, automating release management processes.

## Example Usage

```yaml
name: Create and Start Release

on: [push]

jobs:
  create-and-start-release:
    runs-on: ubuntu-latest
    steps:
    
      - name: Create and Start Release
        id: release
        uses: digital-ai/github-actions-release@main
        with:
          serverUrl: 'http://digital-ai-release-server-url:5516'
          token: ${{ secrets.DIGITAL_AI_RELEASE_TOKEN }}
          templateId: 'Folder3f5cf31df154440495/Releasec4e4b7bce46f4720a'
          releaseTitle: 'New Release from GitHub Actions'
          variables: '{"var1": "value1", "var2": "value2"}'
          startRelease: true

       - name: Get Release Data
         run: echo ${{ steps.release.outputs.response }}
         
```

## Inputs

| Name         | Description                                                                                                                         | Required | Default                          |
|--------------|-------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------|
| `serverUrl`  | The address of the Digital.ai Release server.                                                                                       | Yes      | -                                |
| `username`   | Username for authentication to the Digital.ai Release server. Required if `token` is not provided.                                  | No       | -                                |
| `password`   | Password for authentication to the Digital.ai Release server. Required if `token` is not provided.                                  | No       | -                                |
| `token`      | Personal access token for authentication to the Digital.ai Release server. If provided, `username` and `password` are not required. | No       | -                                |
| `templateId` | The full template identifier in Digital.ai Release. for example, `Folder3f5cf31df154440495/Releasec4e4b7bce46f4720a`                | Yes      | -                                |
| `releaseTitle`| Optional. Title of the release. If not provided, a default title will be assigned.                                                 | No       | GITHUB_TAG /<br/>GITHUB_HEAD_REF |
| `variables`  | Optional. JSON string representing the variables object to be passed to the release template.                                       | No       | -                                |
| `startRelease` | Optional. Boolean value indicating whether to start the release. Default is true.                                                 | No       | true                             |

## Outputs

| Name         | Description                                                                               |
|--------------|-------------------------------------------------------------------------------------------|
| `response`   | The response containing the data of the newly created release.                            |
