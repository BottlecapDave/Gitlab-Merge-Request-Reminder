import { IGitlabMergeRequest } from "../gitlabService";
import { ISlackConfig, SlackService } from "./slackService";

function createSlackConfig(): ISlackConfig {
  return {
    target: "@here",
    webhookUrl: process.env.TEST_SLACK_WEBHOOK_URL as string,
  }
}

function createMergeRequests(): IGitlabMergeRequest[] {
  return [{
    author: {
      name: "David Kendall",
    },
    created_at: "2023-07-07T10:00:00Z",
    labels: [],
    project: {
      name: "merge request reminder test",
    },
    title: "Merge request with mandatory labels",
    web_url: "https://gitlab.com/test/merge-request-reminder-test/-/merge_requests/1",
    draft: false,
    work_in_progress: false,
  },
  {
    author: {
      name: "David Kendall",
    },
    created_at: "2023-07-08T11:12:00Z",
    labels: [],
    project: {
      name: "merge request reminder test 2",
    },
    title: "wip: Merge request ",
    web_url: "https://gitlab.com/test/merge-request-reminder-test/-/merge_requests/2",
    draft: false,
    work_in_progress: false,
  }]
}

describe('SlackService', () => {
  test('when webhook valid, then slack message is sent', async () => {
    const config = createSlackConfig();
    const mergeRequests = createMergeRequests();
    const service = new SlackService();

    await service.sendReminder(config, mergeRequests);
  })
})