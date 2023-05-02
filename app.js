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
let keyType = 'lower';
let lang = 'en';
if (localStorage.getItem('lang')) {
  lang = localStorage.getItem('lang');
}

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

    this.ruLower = [
      'ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫',
      'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\', 'Del',
      'Caps', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', '↵',
      '⇧', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.', '↑', '⇧',
      'Ctrl', '⊞', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl',
    ];

    this.ruShift = [
      'Ё', '!', '"', '№', ';', '%', ':', '?', '*', '(', ')', '_', '+', '⌫',
      'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del',
      'Caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '↵',
      '⇧', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', '⇧',
      'Ctrl', '⊞', 'Alt', ' ', 'Alt', '←', '↓', '→', 'Ctrl',
    ];

    this.ruCaps = [
      'Ё', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', '⌫',
      'Tab', 'Й', 'Ц', 'У', 'К', 'Е', 'Н', 'Г', 'Ш', 'Щ', 'З', 'Х', 'Ъ', '/', 'Del',
      'Caps', 'Ф', 'Ы', 'В', 'А', 'П', 'Р', 'О', 'Л', 'Д', 'Ж', 'Э', '↵',
      '⇧', 'Я', 'Ч', 'С', 'М', 'И', 'Т', 'Ь', 'Б', 'Ю', ',', '↑', '⇧',
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
      if (lang === 'ru') {
        layout = this.ruLower;
      } else {
        layout = this.enLower;
      }
    } else if (param === 'shift') {
      if (lang === 'ru') {
        layout = this.ruShift;
      } else {
        layout = this.enShift;
      }
    } else if (param === 'caps') {
      if (lang === 'ru') {
        layout = this.ruCaps;
      } else {
        layout = this.enCaps;
      }
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
keyboard.buildKeyboard(keyType);
textarea.focus();

function shiftDown(code) {
  if (shift === true) return;
  shift = true;
  keyboard.buildKeyboard(keyType);
  setTimeout(() => {
    keyboardContainer.querySelector(`#${code}`).classList.add('keyboard__row-key_active');
  }, 20);
}

function shiftUp(code) {
  shift = false;
  keyboard.buildKeyboard(keyType);
  keyboardContainer.querySelector(`#${code}`).classList.add('keyboard__row-key_active');
  setTimeout(() => {
    keyboardContainer.querySelector(`#${code}`).classList.remove('keyboard__row-key_active');
  }, 20);
}

function capsLock(code) {
  if (caps === false) {
    caps = true;
    keyType = 'caps';
    keyboard.buildKeyboard(keyType);
    setTimeout(() => {
      keyboardContainer.querySelector(`#${code}`).classList.add('keyboard__row-key_active');
    }, 20);
  } else {
    caps = false;
    keyType = 'lower';
    keyboard.buildKeyboard(keyType);
    keyboardContainer.querySelector(`#${code}`).classList.add('keyboard__row-key_active');
    setTimeout(() => {
      keyboardContainer.querySelector(`#${code}`).classList.remove('keyboard__row-key_active');
    }, 20);
  }
}

function printSymbol(code) {
  let textVal = textarea.value;
  const notSymbols = [
    'Backspace', 'Delete', 'CapsLock', 'ShiftLeft', 'ShiftRight', 'ControlLeft',
    'MetaLeft', 'AltLeft', 'AltRight', 'ControlRight',
  ];
  const cursorPos = textarea.selectionStart;
  const symbol = keyboardContainer.querySelector(`#${code}`);
  const startStr = textVal.slice(0, cursorPos);
  const finishStr = textVal.slice(cursorPos);

  if (!notSymbols.includes(code)) {
    if (code === 'Space') {
      textVal = `${startStr} ${finishStr}`;
    } else if (code === 'Enter') {
      textVal = `${startStr}\n${finishStr}`;
    } else if (code === 'Tab') {
      textVal = `${startStr}\t${finishStr}`;
    } else {
      textVal = `${startStr}${symbol.innerText}${finishStr}`;
    }
    textarea.value = textVal;
    textarea.selectionStart = cursorPos + 1;
    textarea.selectionEnd = cursorPos + 1;
  } else if (code === 'Backspace') {
    if (textarea.selectionStart < textarea.selectionEnd) {
      textVal = startStr + finishStr;
      const leftStr = textVal.slice(0, textarea.selectionStart);
      const rightStr = textVal.slice(textarea.selectionEnd);
      textVal = leftStr + rightStr;
      textarea.value = textVal;
      textarea.selectionStart = cursorPos;
      textarea.selectionEnd = cursorPos;
      return;
    }
    if (cursorPos === 0) return;
    textVal = startStr.slice(0, -1) + finishStr;
    textarea.value = textVal;
    textarea.selectionStart = cursorPos - 1;
    textarea.selectionEnd = cursorPos - 1;
  } else if (code === 'Delete') {
    if (textarea.selectionStart < textarea.selectionEnd) {
      textVal = startStr + finishStr;
      const leftStr = textVal.slice(0, textarea.selectionStart);
      const rightStr = textVal.slice(textarea.selectionEnd);
      textVal = leftStr + rightStr;
      textarea.value = textVal;
      textarea.selectionStart = cursorPos;
      textarea.selectionEnd = cursorPos;
      return;
    }
    textVal = startStr + finishStr.slice(1);
    textarea.value = textVal;
    textarea.selectionStart = cursorPos;
    textarea.selectionEnd = cursorPos;
  }
}

// Mouse listener
keyboardContainer.addEventListener('mousedown', (e) => {
  const clickTo = e.target.closest('.keyboard__row-key');
  if (!clickTo) {
    return;
  }

  if (clickTo.getAttribute('id') === 'ShiftLeft' || clickTo.getAttribute('id') === 'ShiftRight') {
    keyType = 'shift';
    shiftDown(clickTo.getAttribute('id'));
  }

  if (clickTo.getAttribute('id') === 'CapsLock') {
    capsLock(clickTo.getAttribute('id'));
  }

  printSymbol(clickTo.getAttribute('id'));
});

document.addEventListener('mouseup', (e) => {
  textarea.focus();
  const clickTo = e.target.closest('.keyboard__row-key');
  if (!clickTo) {
    return;
  }

  if (clickTo.getAttribute('id') === 'ShiftLeft' || clickTo.getAttribute('id') === 'ShiftRight') {
    keyType = 'lower';
    shiftUp(clickTo.getAttribute('id'));
  }
});

// Phisical keyboard listeners
const pressed = new Set();
document.addEventListener('keydown', (e) => {
  // Exclude extra keys
  if (!keyboard.keyIds.includes(e.code)) return;

  // Ctrl + Alt (ru / en)
  pressed.add(e.code);
  if (pressed.has('ControlLeft') && pressed.has('AltLeft')) {
    if (lang === 'en') {
      lang = 'ru';
      localStorage.setItem('lang', 'ru');
    } else {
      lang = 'en';
      localStorage.setItem('lang', 'en');
    }

    keyboard.buildKeyboard(keyType);
    setTimeout(() => {
      keyboardContainer.querySelector('#ControlLeft').classList.add('keyboard__row-key_active');
      keyboardContainer.querySelector('#AltLeft').classList.add('keyboard__row-key_active');
    }, 20);

    pressed.clear();
    return;
  }

  e.preventDefault();

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    keyType = 'shift';
    shiftDown(e.code);
  }

  if (e.code === 'CapsLock') {
    capsLock(e.code);
  }

  keyboardContainer.querySelector(`#${e.code}`).classList.add('keyboard__row-key_active');

  printSymbol(e.code);
});

document.addEventListener('keyup', (e) => {
  // Exclude extra keys
  if (!keyboard.keyIds.includes(e.code)) return;
  if (e.code === 'CapsLock') return;

  pressed.delete(e.code);

  if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
    keyType = 'lower';
    shiftUp(e.code);
  }

  keyboardContainer.querySelector(`#${e.code}`).classList.remove('keyboard__row-key_active');
});
