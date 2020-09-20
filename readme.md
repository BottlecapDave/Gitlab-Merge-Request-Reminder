# GitLab Merge Request Reminder

Sends a notification to a Slack webhook highlighting open merge requests for a given GitLab repository. If no merge requests are open, then no notification will be sent.

## Environment Variables

| Variable             | Details                                                                           | Values         |
| -------------------- | --------------------------------------------------------------------------------- | -------------- |
| GITLAB_ACCESS_TOKEN  | The access token for the GitLab repository. This needs at least `read_api` access |                |
| GITLAB_PROJECT_IDS   | The GitLab project ids the merge requests are for. This should be comma separated |                |
| INCLUDE_WIP          | Determines if work in progress merge requests should be included                  | "true"/"false" |
| INCLUDE_DRAFT        | Determines if draft merge requests should be included                             | "true"/"false" |
| SLACK_WEBHOOK_URL    | The URL of the slack incoming webhook                                             |                |

## Docker

This is available as a docker image, available on [docker hub](https://hub.docker.com/repository/docker/bottlecapdave/gitlab-merge-request-reminder).

### Build

```
SET TAG=v1.0.0 && npm run build-docker
```