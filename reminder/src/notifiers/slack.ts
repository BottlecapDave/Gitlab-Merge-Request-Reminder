import { IGitlabMergeRequest } from "../gitlab";
import * as moment from 'moment';
import axios, { AxiosRequestConfig } from "axios";

export interface ISlackConfig {
    webhookUrl: string;
    target: string;
}

export namespace Slack {
    export async function sendReminder(config: ISlackConfig, mergeRequests: IGitlabMergeRequest[]) {
        const blocks = [];
        blocks.push({
            type: "section",
            text: {
                type: "mrkdwn",
                text: `${config.target} Looks like there are some open merge requests...`
            }
        },
        {
            type: "divider"
        });

        for (const request of mergeRequests) {
            blocks.push({
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `*<${request.web_url}|(${request.project.name}) ${request.title}>*\n${request.author.name} | opened ${moment(request.created_at).fromNow()}`
                }
            })
        }

        const requestConfig: AxiosRequestConfig = {
            validateStatus: () => true, // Make sure we always return
        };

        await axios.post(
            config.webhookUrl,
            {
                text: "Looks like there are some open merge requests...",
                blocks
            },
            requestConfig
        );
    }
}