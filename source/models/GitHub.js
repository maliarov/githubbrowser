import queryString from 'query-string';

const headerAccept = 'application/vnd.github.mercy-preview+json';

async function searchRepositories({ q, s, o } = {}) {
  const query = queryString.stringify({ q, s, o });
  const url = `https://api.github.com/search/repositories?${query}`;

  const res = await fetch(url, { method: 'GET', headers: { Accept: headerAccept } });
  const json = await res.json();

  return json;
}

async function searchPullRequests({
  owner, repo, sort, direction,
} = {}) {
  const query = queryString.stringify({ sort, direction });
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?${query}`;

  const res = await fetch(url, { method: 'GET', headers: { Accept: headerAccept } });
  const json = await res.json();

  return json;
}

export default {
  search: {
    repositories: searchRepositories,
    pulls: searchPullRequests,
  },
};
