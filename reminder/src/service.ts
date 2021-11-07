import { IGitlabMergeRequestRequest, Gitlab } from "./gitlab";
import { ISlackConfig, Slack } from "./notifiers/slack";

export interface IReminderRequest extends IGitlabMergeRequestRequest {
    gitlabAccessToken: string;
    slack: ISlackConfig;
}

export async function sendReminder(request: IReminderRequest) {
    var mergeRequests = await Gitlab.getMergeRequests(request.gitlabAccessToken, request);

    if (mergeRequests.length > 0) {
        await Slack.sendReminder(request.slack, mergeRequests);
    }
}