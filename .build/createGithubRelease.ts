const bodySuffix = "---\nEnjoying this tool? Why not make a one time or monthly [GitHub sponsorship](https://github.com/sponsors/bottlecapdave)?"

async function createGithubRelease(githubToken: string, githubOwnerRepo: string, tag: string, notes: string) {
  if (!githubToken) {
    throw new Error('Github token not specified');
  }

  if (!githubOwnerRepo) {
    throw new Error('Github owner/repo not specified');
  }

  if (!tag) {
    throw new Error('Tag not specified');
  }

  if (!notes) {
    throw new Error('Notes not specified');
  }

  console.log(`Publishing ${tag} release to ${githubOwnerRepo}`);

  const body = JSON.stringify({
    tag_name: tag,
    name: tag,
    body: notes,
    draft: false,
    prerelease:false
  });

  const response = await fetch(
    `https://api.github.com/repos/${githubOwnerRepo}/releases`,
    { 
      method: 'POST',
      headers: {
        "Accept": "application/vnd.github+json",
        "Authorization": `Bearer ${githubToken}`,
        "X-GitHub-Api-Version": "2022-11-28" 
      },
      body
    }
  );

  if (response.status >= 300) {
    throw new Error(response.statusText);
  }
}

createGithubRelease(
  process.env.GITHUB_TOKEN,
  process.env.GITHUB_REPOSITORY,
  process.argv[2],
  `${process.argv[3]}\n${bodySuffix}`
).then(() => console.log('Success'));