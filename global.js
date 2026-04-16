console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'resume/', title: 'Resume' },
  { url: 'https://github.com/m1petersen', title: 'Github' }
];

let nav = document.createElement('nav');
document.body.prepend(nav);

const BASE_PATH = (location.hostname === "localhost" || location.hostname === "127.0.0.1")
  ? "/"                  // Local server
  : "/portfolio/";       // GitHub Pages repo name

for (let p of pages) {
  let url = p.url;
  let title = p.title;
  
  url = !url.startsWith('http') ? BASE_PATH + url : url;
  
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  
  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname
  );
  
  if (a.host !== location.host) {
    a.target = "_blank";
  }

  nav.append(a);
}

const isMacOsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
const defaultTheme = isMacOsDark ? "dark" : "light";

document.body.insertAdjacentHTML(
  'afterbegin',
  `
  <label class="color-scheme">
    Theme:
    <select>
      <option value="light dark">Automatic (${defaultTheme})</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
    </select>
  </label>
  `
);

let select = document.querySelector('.color-scheme select');

function setColorScheme(colorScheme) {
  document.documentElement.style.setProperty('color-scheme', colorScheme);
  select.value = colorScheme;
}

if ("colorScheme" in localStorage) {
  setColorScheme(localStorage.colorScheme);
}

select.addEventListener('input', function (event) {
  console.log('color scheme changed to', event.target.value);

  setColorScheme(event.target.value);

  localStorage.colorScheme = event.target.value;
});

let form = document.querySelector('form');

form?.addEventListener('submit', function (event) {
  event.preventDefault();

  let data = new FormData(form);

  let url = form.action + "?";

  for (let [name, value] of data) {
    url += `${name}=${encodeURIComponent(value)}&`;
    
    console.log(name, encodeURIComponent(value));
  }
  
  url = url.slice(0, -1);
  
  location.href = url;
});