// Add favicon
function setFavicons(favImg) {
  const headTitle = document.querySelector('head');
  const setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', favImg);
  headTitle.appendChild(setFavicon);
}

setFavicons('./favicon.ico');

// Base html-tags
const bodyTag = document.body;
const wrapper = document.createElement('div');
const header = document.createElement('header');
const title = document.createElement('h1');
const main = document.createElement('main');
const textarea = document.createElement('textarea');
const keyboardContainer = document.createElement('div');
const footer = document.createElement('footer');
const appInfo = document.createElement('div');

// Add classes
bodyTag.className = 'body';
wrapper.className = 'wrapper';
title.className = 'title';
textarea.className = 'text-editor';
keyboardContainer.className = 'keyboard';
appInfo.className = 'app-info';

// Add texts
let footerHTML = 'The keyboard was created in the <span class="mark">Windows OS</span><br>';
footerHTML += 'To switch the language: <span class="mark">left ctrl + left alt</span>';
title.innerText = 'JSFE2023Q1 - Virtual keyboard';
appInfo.innerHTML = footerHTML;

// Append elements
header.appendChild(title);
main.appendChild(textarea);
main.appendChild(keyboardContainer);
footer.appendChild(appInfo);

wrapper.appendChild(header);
wrapper.appendChild(main);
wrapper.appendChild(footer);

// Add base markup
bodyTag.appendChild(wrapper);
