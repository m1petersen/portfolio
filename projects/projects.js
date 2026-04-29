import { fetchJSON, renderProjects } from '../global.js';
import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7.9.0/+esm';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
const projectsTitle = document.querySelector('.projects-title');

if (projectsTitle) {
    projectsTitle.textContent = `${projects.length} Projects`;
}

let query = '';
let selectedYear = null;

function renderPieChart(projectsGiven) {
  let svg = d3.select('#projects-pie-plot');
  svg.selectAll('path').remove();
  let legend = d3.select('.legend');
  legend.html('');

  let rolledData = d3.rollups(
    projectsGiven,
    (v) => v.length,
    (d) => d.year,
  );

  let data = rolledData.map(([year, count]) => {
    return { value: count, label: year };
  });

  let colors = d3.scaleOrdinal(d3.schemeTableau10);
  let arcGenerator = d3.arc().innerRadius(0).outerRadius(50);
  let sliceGenerator = d3.pie().value((d) => d.value);
  let arcData = sliceGenerator(data);
  let arcs = arcData.map((d) => arcGenerator(d));

  arcs.forEach((arc, i) => {
    svg.append('path')
       .attr('d', arc)
       .attr('fill', colors(i))
       .attr('class', () => (data[i].label === selectedYear ? 'selected' : ''))
       .on('click', () => {
         selectedYear = selectedYear === data[i].label ? null : data[i].label;
         setFilters();
       });
  });

  data.forEach((d, idx) => {
    legend.append('li')
          .attr('style', `--color:${colors(idx)}`)
          .attr('class', () => (d.label === selectedYear ? 'legend-item selected' : 'legend-item'))
          .html(`<span class="swatch"></span> ${d.label} <em>(${d.value})</em>`);
  });
}

function setFilters() {
  let filteredProjects = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    let matchesQuery = values.includes(query.toLowerCase());
    let matchesYear = selectedYear ? project.year === selectedYear : true;
    return matchesQuery && matchesYear;
  });

  renderProjects(filteredProjects, projectsContainer, 'h2');

  let pieChartData = projects.filter((project) => {
    let values = Object.values(project).join('\n').toLowerCase();
    return values.includes(query.toLowerCase());
  });

  renderPieChart(pieChartData);
}

let searchInput = document.querySelector('.searchBar');
if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    query = event.target.value;
    setFilters();
  });
}

setFilters();