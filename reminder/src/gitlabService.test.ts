import { GitlabService, IGitlabMergeRequest, IGitlabMergeRequestRequest } from "./gitlabService"

function createRequestData(): IGitlabMergeRequestRequest {
  return {
    gitlabBaseURL: 'https://gitlab.com',
    includeDraft: true,
    includeWorkInProgress: true,
    projectIds: [process.env.TEST_PROJECT_ID as string],
    mandatoryLabels: [],
  }
}

function getAccessToken(): string {
  return process.env.TEST_GITLAB_ACCESS_TOKEN as string
}

function assertMergeRequest(mergeRequest: IGitlabMergeRequest) {
  expect(mergeRequest.project.name).toEqual('merge request reminder test');
  expect(mergeRequest.author.name).toEqual('David Kendall');
}

function assertMergeRequests(mergeRequests: IGitlabMergeRequest[], includeWip: boolean, includeDraft: boolean) {
  expect(mergeRequests.length).toBeGreaterThanOrEqual(1);
  let wipPresent = false;
  let draftPresent = false;
  let lastMergeRequestTimestamp: Date | undefined;
  for (const mergeRequest of mergeRequests) {
    if (mergeRequest.title.toLowerCase().includes('wip')) {
      wipPresent = true
    }

    if (mergeRequest.title.toLowerCase().includes('draft')) {
      draftPresent = true
    }

    assertMergeRequest(mergeRequest);

    const createdAt = new Date(mergeRequest.created_at);
    if (lastMergeRequestTimestamp) {
      expect(createdAt > lastMergeRequestTimestamp).toEqual(true);
    }

    lastMergeRequestTimestamp = createdAt;
  }

  expect(wipPresent).toEqual(includeWip);
  expect(draftPresent).toEqual(includeDraft);
}

describe('GitlabService', () => {
  test('when unauthenticated, then error is thrown', async () => {
    const accessToken = '';
    const request = createRequestData();
    const service = new GitlabService();
  
    await expect(service.getMergeRequests(accessToken, request))
          .rejects
          .toThrow(`Failed to find project '${request.projectIds[0]}'`);
  })
  
  test('when project id does not exist, then error is thrown', async () => {
    const accessToken = getAccessToken();
    const request: IGitlabMergeRequestRequest = {
      ...createRequestData(),
      projectIds: ['a']
    };
    const service = new GitlabService();
  
    await expect(service.getMergeRequests(accessToken, request))
          .rejects
          .toThrow(`Failed to find project '${request.projectIds[0]}'`);
  })
  
  test('when include draft is set to false, then no draft merge requests are returned', async () => {
    const accessToken = getAccessToken();
    const request: IGitlabMergeRequestRequest = {
      ...createRequestData(),
      includeDraft: false,
    };
    const service = new GitlabService();
  
    const mergeRequests = await service.getMergeRequests(accessToken, request);
    assertMergeRequests(mergeRequests, request.includeWorkInProgress, request.includeDraft);
  })
  
  test('when include draft is set to true, then draft merge requests are returned', async () => {
    const accessToken = getAccessToken();
    const request: IGitlabMergeRequestRequest = {
      ...createRequestData(),
      includeDraft: true,
    };
    const service = new GitlabService();
  
    const mergeRequests = await service.getMergeRequests(accessToken, request);
    assertMergeRequests(mergeRequests, request.includeWorkInProgress, request.includeDraft);
  })
  
  test('when include wip is set to false, then no wip merge requests are returned', async () => {
    const accessToken = getAccessToken();
    const request: IGitlabMergeRequestRequest = {
      ...createRequestData(),
      includeWorkInProgress: false,
    };
    const service = new GitlabService();
  
    const mergeRequests = await service.getMergeRequests(accessToken, request);
    assertMergeRequests(mergeRequests, request.includeWorkInProgress, request.includeDraft);
  })
  
  test('when include wip is set to true, then wip merge requests are returned', async () => {
    const accessToken = getAccessToken();
    const request: IGitlabMergeRequestRequest = {
      ...createRequestData(),
      includeWorkInProgress: true,
    };
    const service = new GitlabService();
  
    const mergeRequests = await service.getMergeRequests(accessToken, request);
    assertMergeRequests(mergeRequests, request.includeWorkInProgress, request.includeDraft);
  })
  
  test('when mandatory label is specified but not present, then no merge requests are returned', async () => {
    const accessToken = getAccessToken();
    const request: IGitlabMergeRequestRequest = {
      ...createRequestData(),
      mandatoryLabels: ['non-existent']
    };
    const service = new GitlabService();
  
    const mergeRequests = await service.getMergeRequests(accessToken, request);
    
    expect(mergeRequests.length).toEqual(0);
  })
  
  test('when mandatory label is specified, then only merge requests with the labels are returned', async () => {
    const accessToken = getAccessToken();
    const request: IGitlabMergeRequestRequest = {
      ...createRequestData(),
      mandatoryLabels: ['test-label', 'test-label-2']
    };
    const service = new GitlabService();
  
    const mergeRequests = await service.getMergeRequests(accessToken, request);
    
    expect(mergeRequests.length).toEqual(1);
    assertMergeRequest(mergeRequests[0]);
    expect(mergeRequests[0].title).toEqual('Merge request with mandatory labels');
  })
})