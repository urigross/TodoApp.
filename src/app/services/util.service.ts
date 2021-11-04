export const utilService = {
  load: loadFromStorage,
  save: saveToStorage,
  makeId,
  getRandomColor
}
function loadFromStorage(key:string) {
  var val = localStorage.getItem(key);
  return JSON.parse(val)
}
function saveToStorage(key:string, val:any) {
  localStorage.setItem(key, JSON.stringify(val))
}

function makeId(length = 5) {
  var txt = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (var i = 0; i < length; i++) {
     txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
     color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}