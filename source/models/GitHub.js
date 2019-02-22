import queryString from 'query-string';

const headerAccept = 'application/vnd.github.mercy-preview+json';

function searchRepositories({ q, s, o } = {}) {
  const query = queryString.stringify({ q, s, o });
  const url = `https://api.github.com/search/repositories?${query}`;

  return fetch(url, { method: 'GET', headers: { Accept: headerAccept } })
    .then(res => res.json());
}

function searchPullRequests({
  owner, repo, sort, direction,
} = {}) {
  const query = queryString.stringify({ sort, direction });
  const url = `https://api.github.com/repos/${owner}/${repo}/pulls?${query}`;

  return fetch(url, { method: 'GET', headers: { Accept: headerAccept } })
    .then(res => res.json());
}

export default {
  search: {
    repositories: searchRepositories,
    pulls: searchPullRequests,
  },
};
