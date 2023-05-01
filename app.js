// Add favicon
function setFavicons(favImg) {
  const headTitle = document.querySelector('head');
  const setFavicon = document.createElement('link');
  setFavicon.setAttribute('rel', 'shortcut icon');
  setFavicon.setAttribute('href', favImg);
  headTitle.appendChild(setFavicon);
}

setFavicons('https://rs.school/favicon.ico');

// General vars
let caps = false;
let shift = false;
let ru = false;

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

class Keyboard {
  constructor() {
    this.keyIds = [
      'Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace',
      'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'Delete',
      'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter',
      'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ShiftRight',
      'ControlLeft', 'MetaLeft', 'AltLeft', 'Space', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight', 'ControlRight',
    ];

    this.enLower = [
      '`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫',
      'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\', 'Del',
      'Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', '↵',
      '⇧', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '↑', '⇧',
      'Ctrl', '⊞', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl',
    ];

    this.enShift = [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '⌫',
      'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}', '|', 'Del',
      'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"', '↵',
      '⇧', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?', '↑', '⇧',
      'Ctrl', '⊞', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl',
    ];

    this.enCaps = [
      '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '⌫',
      'Tab', 'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '[', ']', '\\', 'Del',
      'Caps', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ';', '\'', '↵',
      '⇧', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.', '/', '↑', '⇧',
      'Ctrl', '⊞', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl',
    ];
  }

  buildKeyboard(param) {
    let row;
    let key;
    let layout;

    // Clear container
    keyboardContainer.innerHTML = '';

    if (!param || param === 'lower') {
      layout = this.enLower;
    } else if (param === 'shift') {
      layout = this.enShift;
    } else if (param === 'caps') {
      layout = this.enCaps;
    }

    for (let i = 0; i < this.keyIds.length; i += 1) {
      if (i === 0 || i === 14 || i === 29 || i === 42 || i === 55) {
        row = document.createElement('div');
        row.className = 'keyboard__row';
        keyboardContainer.appendChild(row);
      }

      key = document.createElement('div');
      key.className = 'keyboard__row-key';
      key.setAttribute('id', this.keyIds[i]);
      key.innerText = layout[i];

      row.appendChild(key);

      if (i === 13) {
        key.className = 'keyboard__row-key backspace';
      }

      if (i === 14) {
        key.className = 'keyboard__row-key tab';
      }

      if (i === 28) {
        key.className = 'keyboard__row-key del';
      }

      if (i === 29) {
        key.className = 'keyboard__row-key caps';
      }

      if (i === 41) {
        key.className = 'keyboard__row-key enter';
      }

      if (i === 42) {
        key.className = 'keyboard__row-key l-shift';
      }

      if (i === 53) {
        key.className = 'keyboard__row-key arrow up';
      }

      if (i === 54) {
        key.className = 'keyboard__row-key r-shift';
      }

      if (i === 55) {
        key.className = 'keyboard__row-key l-ctrl';
      }

      if (i === 58) {
        key.className = 'keyboard__row-key space';
      }

      if (i === 60) {
        key.className = 'keyboard__row-key arrow left';
      }

      if (i === 61) {
        key.className = 'keyboard__row-key arrow down';
      }

      if (i === 62) {
        key.className = 'keyboard__row-key arrow right';
      }

      if (i === 63) {
        key.className = 'keyboard__row-key r-ctrl';
      }
    }
  }
}

const keyboard = new Keyboard();
keyboard.buildKeyboard('lower');

function shiftDown(code) {
  if (shift === true) return;
  shift = true;
  keyboard.buildKeyboard('shift');
  setTimeout(() => {
    keyboardContainer.querySelector(`#${code}`).classList.add('keyboard__row-key_active');
  }, 20);
}

function shiftUp(code) {
  shift = false;
  keyboard.buildKeyboard('lower');
  keyboardContainer.querySelector(`#${code}`).classList.add('keyboard__row-key_active');
  setTimeout(() => {
    keyboardContainer.querySelector(`#${code}`).classList.remove('keyboard__row-key_active');
  }, 20);
}

function capsLock(code) {
  if (caps === false) {
    caps = true;
    keyboard.buildKeyboard('caps');
    setTimeout(() => {
      keyboardContainer.querySelector(`#${code}`).classList.add('keyboard__row-key_active');
    }, 20);
  } else {
    caps = false;
    keyboard.buildKeyboard('lower');
    keyboardContainer.querySelector(`#${code}`).classList.add('keyboard__row-key_active');
    setTimeout(() => {
      keyboardContainer.querySelector(`#${code}`).classList.remove('keyboard__row-key_active');
    }, 20);
  }
}

// Keyboard mouse listener
keyboardContainer.addEventListener('mousedown', (e) => {
  const clickTo = e.target.closest('.keyboard__row-key');
  if (!clickTo) {
    return;
  }

  if (clickTo.getAttribute('id') === 'ShiftLeft' || clickTo.getAttribute('id') === 'ShiftRight') {
    shiftDown(clickTo.getAttribute('id'));
  }

  if (clickTo.getAttribute('id') === 'CapsLock') {
    capsLock(clickTo.getAttribute('id'));
  }
});

keyboardContainer.addEventListener('mouseup', (e) => {
  const clickTo = e.target.closest('.keyboard__row-key');
  if (!clickTo) {
    return;
  }

  if (clickTo.getAttribute('id') === 'ShiftLeft' || clickTo.getAttribute('id') === 'ShiftRight') {
    shiftUp(clickTo.getAttribute('id'));
  }
});

// Phisical keyboard listeners
document.addEventListener('keydown', (e) => {
  // Exclude extra keys
  if (!keyboard.keyIds.includes(e.code)) return;

  e.preventDefault();

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shiftDown(e.code);
  }

  if (e.code === 'CapsLock') {
    capsLock(e.code);
  }

  keyboardContainer.querySelector(`#${e.code}`).classList.add('keyboard__row-key_active');
});

document.addEventListener('keyup', (e) => {
  // Exclude extra keys
  if (!keyboard.keyIds.includes(e.code)) return;
  if (e.code === 'CapsLock') return;

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    shiftUp(e.code);
  }

  keyboardContainer.querySelector(`#${e.code}`).classList.remove('keyboard__row-key_active');
  // pressed.delete(e.code);
});

// keyboardContainer.querySelector('#CapsLock').classList.add('test');
