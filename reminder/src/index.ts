import { sendReminder, IReminderRequest } from "./service";

async function run() {
    var config: IReminderRequest = {
        gitlabAccessToken: process.env.GITLAB_ACCESS_TOKEN?.trim() as string,
        projectIds: (process.env.GITLAB_PROJECT_IDS?.trim() || "").split(','),
        includeWorkInProgress: process.env.INCLUDE_WIP?.trim() !== "false",
        includeDraft: process.env.INCLUDE_DRAFT?.trim() !== "false",
        slack: {
            webhookUrl: process.env.SLACK_WEBHOOK_URL?.trim() as string,
            target: process.env.SLACK_TARGET?.trim() as string || '@here'
        }
    };

    if (!config.gitlabAccessToken) {
        throw new Error(`GITLAB_ACCESS_TOKEN was not specified`);
    } else if (!config.projectIds) {
        throw new Error(`GITLAB_PROJECT_IDS was not specified`);
    } else if (config.includeWorkInProgress == null) {
        throw new Error(`INCLUDE_WIP was not specified`);
    } else if (config.includeDraft == null) {
        throw new Error(`INCLUDE_DRAFT was not specified`);
    } else if (!config.slack.webhookUrl) {
        throw new Error(`SLACK_WEBHOOK_URL was not specified`);
    } else if (!config.slack.target) {
        throw new Error(`SLACK_TARGET was not specified`);
    }

    return sendReminder(config);
}

run();