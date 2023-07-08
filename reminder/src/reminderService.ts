import { IGitlabMergeRequestRequest, GitlabService } from "./gitlabService";
import { ISlackConfig, SlackService } from "./notifiers/slackService";

export interface IReminderRequest extends IGitlabMergeRequestRequest {
    gitlabAccessToken: string;
    slack: ISlackConfig;
}

export class ReminderService {
    constructor(private gitlabService: GitlabService, private slackService: SlackService) {}
    
    async sendReminder(request: IReminderRequest) {
        const mergeRequests = await this.gitlabService.getMergeRequests(request.gitlabAccessToken, request);
    
        if (mergeRequests.length > 0) {
            await this.slackService.sendReminder(request.slack, mergeRequests);
        }
    }
}