# Digital.ai Release GitHub Actions

This GitHub Action enables the creation of a new release and start it on the Digital.ai Release. It facilitates seamless integration between your GitHub repository and Digital.ai Release, automating release management processes.

## Example Usage

```yaml
name: Create and Start Release

on: [push]

jobs:
    create-and-start-release:
      runs-on: ubuntu-latest
      steps:

        - name: Create & Start Release
          id: release
          uses: digital-ai/github-actions-release@v1.0.0-beta.1
          with:
            serverUrl: 'http://digital-ai-release-server-url:5516'
            username: ${{ secrets.RELEASE_USERNAME }}
            password: ${{ secrets.RELEASE_PASSWORD }}
            templateId: 'Applications/FolderXXXXXXXXX/ReleaseXXXXXXXXX'
            releaseTitle: 'New Release from GitHub Actions'
            variables: '{"var1": "value1", "var2": "value2"}'
            startRelease: 'true'

        - name: Get Release Data
          run: echo ${{ steps.release.outputs.response }}
        
        - name: Get Release Id
          run: echo ${{ steps.release.outputs.id }}
        
        - name: Get Release Status
          run: echo ${{ steps.release.outputs.status }}
 ```
#### Example Actions File : [start-digital-ai-release.yml](examples/start-digital-ai-release.yml)

## Inputs

| Name           | Description                                                                                                                                                                                                                              | Required | Default                          |
|----------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|----------------------------------|
| `serverUrl`    | The address of the Digital.ai Release server.                                                                                                                                                                                            | Yes      | -                                |
| `username`     | Username for authentication to the Digital.ai Release server. Required if `token` is not provided.                                                                                                                                       | Yes*     | -                                |
| `password`     | Password for authentication to the Digital.ai Release server. Required if `token` is not provided.                                                                                                                                       | Yes*     | -                                |
| `token`        | Personal access token for authentication to the Digital.ai Release server. If provided, `username` and `password` are not required.                                                                                                      | Yes*     | -                                |
| `templateId`   | The full template identifier in Digital.ai Release is as follows: For example, `Applications/Folder3f5cf31df/Releasec4e4b7bce4` <br/>For more details, [click here](https://apidocs.digital.ai/xl-release/22.3.x/rest-docs/#identifiers) | Yes      | -                                |
| `releaseTitle` | Optional. Title of the release. If not provided, a default title will be assigned.                                                                                                                                                       | No       | GITHUB_TAG /<br/>GITHUB_HEAD_REF |
| `variables`    | Optional. JSON string representing the variables object to be passed to the release template.                                                                                                                                            | No       | -                                |
| `startRelease` | Optional. It indicating whether to start the release. Default is true.                                                                                                                                                                   | No       | true                             |

## Outputs

| Name       | Description                                                    |
|------------|----------------------------------------------------------------|
| `response` | The response containing the data of the newly created release. |
| `id`       | The id of the newly created release.                           |
| `status`   | The status of the newly created release.                       |