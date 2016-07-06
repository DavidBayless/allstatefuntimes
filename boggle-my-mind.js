var alphabet = require('alphabet');
var input = ['mid', 'rana', 'grant', 'bocca', 'cilia', 'waive', 'ossal', 'salmo', 'fice'];
var charMap = {};
var characters = [];

function Character(value) {
  this.value = value;
  this.children = [];
  this.parents = [];
  this.adj =  [];
}

Character.prototype.setChild = function(character) {
  if (!character instanceof Character) return;
  this.children.push(character);
};

Character.prototype.setParent = function(character) {
  if (!character instanceof Character) return;
  this.parents.push(character);
}

Character.prototype.setAdj = function() {
  this.adj = this.parents.concat(this.children);
}

input.forEach(function(word) {
  word = word.toUpperCase();
  word.split('').forEach(function(character, idx, werd) {
    if (idx === 0) {
      characters.push(new Character(character));
    } else {
      var child = new Character(character)
      characters[characters.length - 1].setChild(child);
      child.setParent(characters[characters.length - 1]);
      characters.push(child);
    }
  });
});
// console.log(characters);

for (var i = 0; i < characters.length; i++) {
  var letter = characters[i].value;
  if (!charMap[letter]) {
    charMap[letter] = characters[i];
  } else {
    characters[i].children[0] ? charMap[letter].setChild(characters[i].children[0]) : console.log('blah');
    characters[i].parents[0] ? charMap[letter].setParent(characters[i].parents[0]) : console.log('bloo');

  }
}

for (var j = 0; j < characters.length; j++) {
  characters[j].setAdj();
}
// console.log(charMap['I'].parents);
console.log(charMap['I'].adj);
console.log(charMap);
// console.log(charMap);
// console.log(charMap);
// console.log(charMap);
