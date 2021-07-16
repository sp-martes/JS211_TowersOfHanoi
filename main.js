'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

const checkForWin = () => {
  // compares stacks b and c to tower with every() loop
  // Assigns the result to variables bWin and cWin
  // bWin and cWin values are equal to true or false depending on the results of loop
  let tower = [4,3,2,1];
  
  let bWin = tower.length == stacks.b.length && tower.every(function(element, index) {
    return element === stacks.b[index]; 
  });
  let cWin = tower.length == stacks.c.length && tower.every(function(element, index) {
    return element === stacks.c[index]; 
});
  if( bWin || cWin ){
    return true
  }
  else{
    return false
  }
}

const movePiece = (s,e) => {
  let starty = stacks[s];
  let endy = stacks[e];
  let startyPop = starty.pop();
  
  return endy.push(startyPop);

}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (s,e) => {
  
  if( (s != 'a' && s != 'b' && s !='c') || (e != 'a' && e !='b' && e !='c') ){
    console.log('Not a valid tower choice.');
    return false
  }

  let starty = stacks[s];
  let endy = stacks[e];

  // slices and parse ints last array object. variable becomes NaN if empty array
  let numStart = parseInt(starty.slice(-1));
  let numEnd = parseInt(endy.slice(-1));
  console.log( numStart, numEnd)
  // Only allows move if the starting number is smaller than ending number. Also doesn't allow if starting stack doesn't contain a number. 
  if( (numStart > numEnd) || isNaN(numStart) ){
    return false
  }
  else{
    return true
  }

}

const towersOfHanoi = (startStack, endStack) => {

  //trims stack choice entries and lowercases 
  let s = startStack.trim().toLowerCase();
  let e = endStack.trim().toLowerCase();
  
  if( isLegal(s,e) ) {
    movePiece(s,e)
  }
  else {
    console.log('No dice! Try again.')
  }
  }


  // only allows 'a' 'b' 'c' entries
  // if( (s != 'a' && s != 'b' && s !='c') || (e != 'a' && e !='b' && e !='c') ){
  //   return console.log('Not a tower! Try again')
  // }
  // applies user choice to array 'stacks'
  // let starty = stacks[s];
  // let endy = stacks[e];

  // slices and parse ints last array object. variable becomes NaN if empty array
  // let numStart = parseInt(starty.slice(-1));
  // let numEnd = parseInt(endy.slice(-1));

  // Only allows move if the starting number is smaller than ending number. Also doesn't allow if starting stack doesn't contain a number. 
  // convenient that comparing to NaN returns false.  
  
  // if( (numStart > numEnd) || isNaN(numStart) ){
  //   return console.log('No dice!: try again');
  // }

  //pops start stack top number and pushes it to end stack 
  // else{
  //   let startyPop = starty.pop();
  //   let sNumber = parseInt(s);
  // return endy.push(startyPop);



const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      if(checkForWin()){
        printStacks();
        return console.log('Success!!')
      }
      else{
        getPrompt();
      }
      
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
