# GitLab Merge Request Reminder

Sends a notification to a Slack webhook highlighting open merge requests for a given GitLab repository. If no merge requests are open, then no notification will be sent.

## Environment Variables

| Variable             | Details                                                                           | Example Values |
| -------------------- | --------------------------------------------------------------------------------- | -------------- |
| GITLAB_ACCESS_TOKEN  | The access token for the GitLab repository. This needs at least `read_api` access and be done by following the [Gitlab instructions](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html). |                |
| GITLAB_PROJECT_IDS   | The GitLab project ids the merge requests are for. This should be comma separated (e.g. 12345,678910) | `12345,678910` |
| INCLUDE_WIP          | Determines if work in progress merge requests should be included. This is true by default.                  | `true` or `false` |
| INCLUDE_DRAFT        | Determines if draft merge requests should be included. This is true by default.                            | `true` or `false` |
| SLACK_WEBHOOK_URL    | The URL of the slack incoming webhook to send the notification to.                                            |                |
| SLACK_TARGET         | The target of the slack message. This is `@here` by default. | `@here` |

## Docker

This is available as a docker image, available on [docker hub](https://hub.docker.com/repository/docker/bottlecapdave/gitlab-merge-request-reminder).

## Example Uses

Because the logic is within a docker image, it can be run in a variety of places. Below I'll document examples of use.

### Gitlab Job

You could create a gitlab job which is run on a [schedule](https://docs.gitlab.com/ce/ci/pipelines/schedules.html). For example

```
merge-request-reminder:
  stage: notify
  image: bottlecapdave/gitlab-merge-request-reminder:v1.0.0
  only:
    refs:
      - schedules
  script:
    - node /app/lib/index.js
```

## Build

```
SET TAG=v1.0.0 && npm run build-docker
```