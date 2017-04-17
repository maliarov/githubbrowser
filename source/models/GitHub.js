import queryString from 'query-string';

export default {

    repositories: {
        search: searchRepositories
    }

};

function searchRepositories({ q, s, o } = {}) {
    const url = 'https://api.github.com/search/repositories' + '?' + queryString.stringify({ q, s, o });

    return fetch(url, { method: 'GET', headers: { Accept: 'application/vnd.github.mercy-preview+json' } })
        .then((response) => response.json());
}