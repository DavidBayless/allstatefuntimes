var prompt = require('prompt');
var fs = require('fs');


var difficultyMap = {
  1: {
    lower: 4,
    upper: 5
  },
  2: {
    lower: 6,
    upper: 8
  },
  3: {
    lower: 9,
    upper: 11
  },
  4: {
    lower: 12,
    upper: 13
  },
  5: {
    lower: 14,
    upper: 15
  }
}
function rando(difficulty) {
  return Math.floor(Math.random() * (difficultyMap[difficulty].upper - difficultyMap[difficulty].lower + 1) + difficultyMap[difficulty].lower)
}

function promptClosure(correct) {
  var count = 4;
  return function promptLoop() {
    if (count > 0) {
      var question = "Guess ("+count+" left)? ";
      prompt.get("Guess ("+count+" left)? ", function(err, data) {
        if(data[question] === correct) {
          console.log('VICTORY WEWT L337!!1!');
          return;
        } else {
          console.log(checkSimilarities(data[question], correct) + '/' + correct.length + ' correct');
          promptLoop();
        }
      });
      count--;
    } else {
      console.log('YOU SUCK! THE WORD WAS: ' + correct.toUpperCase() + '!!!!!!!!');
      return;
    }
  }
}

function checkSimilarities(strOne, strTwo) {
  var common = []
  for (var i = 0; i < strOne.length; i++) {
    if (strOne.charAt(i) === strTwo.charAt(i)) common.push(strOne.charAt(i));
  }
  return common.length;
}

prompt.start();

prompt.get(['difficulty (1-5)'], function(err, data) {
  fs.readFile('enable1.txt', 'utf-8', function(err, wordz) {

    var usableWords = wordz.split('\n');
    var wordLength = rando(data["difficulty (1-5)"]);
    var finalWords = [];
    // console.log('sdfgdsfg', usableWords.length);
    var filteredWords = usableWords.filter(function(word) {
      word = word.trim();
      return (word.length === wordLength);
    });
    filteredWords.forEach(function(word, idx, arr) {
      arr[idx] = word.trim();
    });
    for (var i = 0; i < Math.floor(Math.random() * 10 + 5); i++) {
      finalWords.push(filteredWords[Math.floor(Math.random() * filteredWords.length)]);
    }
    var correct = finalWords[Math.floor(Math.random() * finalWords.length)];
    console.log(finalWords);

    var game = promptClosure(correct);
    game();
    // for (var j = 4; j > 0; j--) {
    // prompt.get("Guess ( left)? ", function(err, response) {
    //   console.log(response["Guess ( left)? "], ' ', correct);
    //   if (response["Guess ( left)? "] === correct) {
    //     console.log('VICTORY WEWT L337!!1!');
    //     return;
    //   }
    // });
    // }
  });
});
