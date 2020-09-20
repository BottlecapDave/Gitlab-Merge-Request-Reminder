import { IGitlabMergeRequestRequest, Gitlab } from "./gitlab";
import { Slack } from "./notifiers/slack";

export interface IReminderRequest extends IGitlabMergeRequestRequest {
    gitlabAccessToken: string;
    slackWebhookUrl: string;
}

export async function sendReminder(request: IReminderRequest) {
    var mergeRequests = await Gitlab.getMergeRequests(request.gitlabAccessToken, request);

    if (mergeRequests.length > 0) {
        await Slack.sendReminder(request.slackWebhookUrl, mergeRequests);
    }
}