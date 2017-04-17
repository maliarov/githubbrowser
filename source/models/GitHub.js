import queryString from 'query-string';

const headerAccept = 'application/vnd.github.mercy-preview+json';

export default {

	search: {
		repositories: searchRepositories,
		pulls: searchPullRequests
	}

};

function searchRepositories({q, s, o} = {}) {
	const url = 'https://api.github.com/search/repositories' + '?' + queryString.stringify({q, s, o});

	return fetch(url, {method: 'GET', headers: {Accept: headerAccept}})
		.then((response) => response.json());
}

function searchPullRequests({owner, repo, sort, direction} = {}) {
	const url = `https://api.github.com/repos/${owner}/${repo}/pulls` + '?' + queryString.stringify({sort, direction});

	return fetch(url, {method: 'GET', headers: {Accept: headerAccept}})
		.then((response) => response.json());
}