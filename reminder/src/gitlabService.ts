import axios, { AxiosRequestConfig } from "axios";
import * as moment from 'moment';

export interface IGitlabProject {
    name: string;
}

export interface IGitlabMergeRequest {
    title: string;
    project: IGitlabProject;
    created_at: string;
    author: {
        name: string;
    };
    web_url: string;
    labels: string[];
    draft: boolean;
    work_in_progress: boolean;
}

export interface IGitlabMergeRequestRequest {
    projectIds: string[];
    includeWorkInProgress: boolean;
    includeDraft: boolean;
    mandatoryLabels: string[];
    excludedLabels: string[];
    gitlabBaseURL: string;
}

export class GitlabService {
    async getMergeRequests(accessToken: string, request: IGitlabMergeRequestRequest) {
        const requestConfig: AxiosRequestConfig = {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            validateStatus: () => true, // Make sure we always return
        };

        const allRequests: IGitlabMergeRequest[] = [];
        for (const projectId of request.projectIds) {
            const projectResp = await axios.get(`${request.gitlabBaseURL}/api/v4/projects/${projectId}`, requestConfig);

            if (projectResp.status === 401) {
                throw new Error(`Not authenticated to see merge requests for project '${projectId}'`);
            }
            else if (projectResp.status === 403) {
                throw new Error(`Not authorised to see merge requests for project '${projectId}'`);
            }
            if (projectResp.status === 404) {
                throw new Error(`Failed to find project '${projectId}'`);
            }

            const project = projectResp.data;
            const resp = await axios.get(`${request.gitlabBaseURL}/api/v4/projects/${projectId}/merge_requests?state=opened&scope=all&sort=asc`, requestConfig);
            if (resp.status === 401) {
                throw new Error(`Not authenticated to see merge requests for project '${projectId}'`);
            }
            else if (resp.status === 403) {
                throw new Error(`Not authorised to see merge requests for project '${projectId}'`);
            }

            const mergeRequests: IGitlabMergeRequest[] = resp.data || [];
            allRequests.push(...mergeRequests.filter(mr => request.includeWorkInProgress || mr.title.toLowerCase().startsWith("wip:") === false)
                                             .filter(mr => request.includeDraft || mr.title.toLowerCase().startsWith("draft:") === false)
                                             .filter(mr => {
                                                if (request.mandatoryLabels.length > 0) {
                                                    for (const mandatoryLabel of request.mandatoryLabels) {
                                                        if (mr.labels.includes(mandatoryLabel) === false) {
                                                            return false;
                                                        }
                                                    }
                                                }

                                                return true;
                                             })
                                             .filter(mr => {
                                                if (request.excludedLabels.length > 0) {
                                                    for (const excludedLabel of request.excludedLabels) {
                                                        if (mr.labels.includes(excludedLabel)) {
                                                            return false;
                                                        }
                                                    }
                                                }

                                                return true;
                                             })
                                             .map(mr => { return { ...mr, project } }));
        }

        return allRequests.sort((a, b) => moment(a.created_at).diff(moment(b.created_at)));
    }
}