'use strict';

document.addEventListener('DOMContentLoaded', (e) => {
  const gitHubFileSourceRadio = document.getElementById('githubSource');
  const localFileSourceRadio = document.getElementById('localSource');

  const localFileInput = document.getElementById('localFileInput');
  // const gitHubFileInput = document.getElementById('githubFileInput');
  const repoList = document.getElementById('repoList');
  const repoContent = document.getElementById('repoContentList');

  // When GitHub is selected as source, hide local file input and present the repo input dropdown
  if (gitHubFileSourceRadio) {
    gitHubFileSourceRadio.addEventListener('change', async (e) => {
      localFileInput.style.display = 'none';

      // Repo list

      const userSelectedRepos = async () => {
        try {
          const repos = await fetch('/github/repos', {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          });

          const data = await repos.json();

          if (!data) {
            return;
          }

          const repositories = data.data.repositories.map((repository) => {
            return {
              url: repository.url,
            };
          });

          return repositories;
        } catch (error) {
          console.error(`Error fetching repositories: ${error.message}`);
          throw error;
        }
      };
      const repos = await userSelectedRepos();

      if (repoList) {
        const selectList = document.createElement('select');
        selectList.id = 'selectRepoList';
        selectList.name = 'repo';
        repoList.appendChild(selectList);
        repos.forEach((repo) => {
          const opt = document.createElement('option');
          opt.value = repo.url;
          opt.innerHTML = repo.url;
          selectList.appendChild(opt);
        });
      }

      // Select repo and load file details
      const selectRepoList = document.getElementById('selectRepoList');

      if (selectRepoList) {
        console.log(selectRepoList.value);

        selectRepoList.addEventListener('change', async (e) => {
          console.log('Hey');
          const repoSlug = selectRepoList.value.split('.com')[1].split('/').join('mode');
          const response = await fetch(`/github/repos/files?repoUrl=${repoSlug}`, {
            headers: {
              Accept: 'application/json',
            },
            method: 'GET',
          });

          const data = await response.json();

          if (!data) {
            return;
          }

          const repoContentArray = data.data;
          console.log(repoContentArray);

          if (repoContent) {
            const selectRepoContentList = document.createElement('select');
            selectRepoContentList.id = 'selectRepoContentList';
            selectRepoContentList.name = 'repoContent';
            repoContent.appendChild(selectRepoContentList);

            // Check if one has been created before, hence replace content
            repoContentArray.forEach((content) => {
              const opt = document.createElement('option');
              opt.value = content.html_url;
              opt.innerHTML = content.name;
              selectRepoContentList.appendChild(opt);
            });
          }

          // End
        });
      }
    });
  }
});
