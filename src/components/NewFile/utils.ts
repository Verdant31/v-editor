export const initialCode = [
  `import 'isomorphic-fetch';`,
  ``,
  `const fetchRepositories = async () => {
    await fetch("https://api.github.com/users/verdant31/repos?page=1&per_page=5")
      .then(res => res.json())
      .then(res => console.log(res))
  }`,
  ``,
  `fetchRepositories();`,
].join('\n')