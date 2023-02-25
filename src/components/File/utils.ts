export const initialCode = [
  `import 'isomorphic-fetch';`,
  ``,
  `const fetchRepositories = async () => {
    return await fetch("https://api.github.com/users/verdant31/repos?page=1&per_page=5")
      .then(res => res.json())
      .then(res => res.map(repo => repo.name));
  }`,
  ``,
  `const repositories = await fetchRepositories();`,
  ``,
  `console.log('My repositories: ', repositories)`,
].join('\n')
