import axios, { AxiosRequestConfig } from "axios";
import * as moment from 'moment';

export interface IGitlabMergeRequest {
    title: string;
    created_at: string;
    author: {
        name: string;
    }
    web_url: string;
}

export interface IGitlabMergeRequestRequest {
    projectIds: string[];
    includeWorkInProgress: boolean;
    includeDraft: boolean;
}

export namespace Gitlab {
    export async function getMergeRequests(accessToken: string, request: IGitlabMergeRequestRequest) {
        const allRequests: IGitlabMergeRequest[] = [];
        for (const projectId of request.projectIds) {
            const requestConfig: AxiosRequestConfig = {
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
                validateStatus: () => true, // Make sure we always return
            };
            
            console.log({ projectId });
            const resp = await axios.get(`https://gitlab.com/api/v4/projects/${projectId}/merge_requests?state=opened&scope=all&sort=asc`, requestConfig);
        
            const mergeRequests: IGitlabMergeRequest[] = resp.data || [];
            allRequests.push(...mergeRequests.filter(mr => request.includeWorkInProgress || mr.title.startsWith("WIP:") === false)
                                             .filter(mr => request.includeDraft || mr.title.startsWith("Draft:") === false));
        }

        return allRequests.sort((a, b) => moment(a.created_at).diff(moment(b.created_at)));
    }
}