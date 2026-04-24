import { fetchJSON, renderProjects } from '../global.js';

// Fetch the project data from the JSON file
const projects = await fetchJSON('../lib/projects.json');

// Select the container where the projects will be rendered
const projectsContainer = document.querySelector('.projects');

// Render the projects into the container
renderProjects(projects, projectsContainer, 'h2');

const projectsTitle = document.querySelector('.projects-title');

// Check if the element exists so we don't get errors
if (projectsTitle) {
    projectsTitle.textContent = `${projects.length} Projects`;
}