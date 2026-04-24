import { fetchJSON, renderProjects, fetchGitHubData } from './global.js';

// Fetch all project data from the JSON file
const projects = await fetchJSON('./lib/projects.json');

// Get only the first 3 projects
const latestProjects = projects.slice(0, 3);

// Select the container where the latest projects will be displayed
const projectsContainer = document.querySelector('.projects');

// Render the latest projects into the container
renderProjects(latestProjects, projectsContainer, 'h2');

const githubData = await fetchGitHubData('m1petersen');
const profileStats = document.querySelector('#profile-stats');

if (profileStats) {
  profileStats.innerHTML = `
      <dl>
        <dt>Public Repos:</dt><dd>${githubData.public_repos}</dd>
        <dt>Public Gists:</dt><dd>${githubData.public_gists}</dd>
        <dt>Followers:</dt><dd>${githubData.followers}</dd>
        <dt>Following:</dt><dd>${githubData.following}</dd>
      </dl>
  `;
}
