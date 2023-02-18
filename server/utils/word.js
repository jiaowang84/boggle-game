const fs = require('fs');
const Trie = require('./trie').Trie;
let listOfValidWords = new Set();
let alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//convert dictionary to a trie
function convertDictFileToTrie(dictFile) {
    return new Promise((resolve, reject) => {
        fs.readFile(dictFile, 'utf8', function (err, contents) {
            console.log(dictFile);
            let trie = new Trie();
            contents.split('\n').forEach(word => trie.insert(word.toUpperCase()));
            resolve(trie);
        });
    })

}

//convert array of boardLetters into a 4x4 matrix
function convertBoardLettersTo4x4Matrix(boardLetters) {
    let letterMatrix = [];
    for (let row = 0; row < 4; row++) {
        letterMatrix[row] = [];
        for (let col = 0; col < 4; col++) {
            letterMatrix[row][col] = boardLetters[row * 4 + col];
        }
    }
    return letterMatrix;
}

function computeValidWords(trie, letterMatrix){
    let visited = [];
    for (let row = 0; row < 4; row++) {
        visited[row] = [];
        for (let col = 0; col < 4; col++) {
            visited[row][col] = false;
        }
    }
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            computeRecursive(row, col, trie, letterMatrix, '', visited);
        }
    }
    console.log('count of valid words for the current board: ', listOfValidWords.size);
    return listOfValidWords;
}

function computeRecursive(row, col, trie, letterMatrix, word, visited) {
    let currentChar = letterMatrix[row][col];
    visited[row][col] = true; 
    if(currentChar === '*'){
        alphabets.split('').forEach((alphabet=> {
            currentChar = alphabet;
            word = word + currentChar;
            traverse(row, col, trie, letterMatrix, word, visited);
            word = word.slice(0, -1);
        }))
    }else{
        word = word + currentChar;
        traverse(row, col, trie, letterMatrix, word, visited);
        word = word.slice(0, -1);
    }
    //console.log('row', row, ', col', col, ', WORD: ', word);    
    visited[row][col] = false;
}

function traverse(row, col, trie, letterMatrix, word, visited){
    if (trie.find(word).length > 0) {
        if (trie.contains(word.toUpperCase())) {
            //console.log('FOUND: ', word);
            listOfValidWords.add(word);
        }
        //go upward
        if (row - 1 >= 0 && visited[row - 1][col] === false) {
            computeRecursive(row - 1 , col, trie, letterMatrix, word, visited);
        }
        //go upward right
        if (row - 1 >= 0 && col + 1 < 4 && visited[row - 1][col + 1] === false) {
            computeRecursive(row - 1, col + 1, trie, letterMatrix, word, visited);
        }
        //go right
        if (col + 1 < 4 && visited[row][col + 1] === false) {
            computeRecursive(row, col + 1, trie, letterMatrix, word, visited);
        }
        //go downward right
        if (row + 1 < 4 && col + 1 < 4 && visited[row + 1][col + 1] === false) {
            computeRecursive(row + 1, col + 1, trie, letterMatrix, word, visited);
        }
        //go downward
        if (row + 1 < 4 && visited[row + 1][col] === false) {
            computeRecursive(row + 1, col, trie, letterMatrix, word, visited);
        }
        //go downward left
        if (row + 1 < 4 && col - 1 >= 0 && visited[row + 1][col - 1] === false) {
            computeRecursive(row + 1, col - 1, trie, letterMatrix, word, visited);
        }
        //go left
        if (col - 1 >= 0 && visited[row][col - 1] === false) {
            computeRecursive(row, col - 1, trie, letterMatrix, word, visited);
        }
        //go upward left
        if (row - 1 >= 0 && col - 1 >= 0 && visited[row - 1][col - 1] === false) {
            computeRecursive(row - 1, col - 1, trie, letterMatrix, word, visited);
        }
    }    
}

//to call
//computeValidWords(0, 0, [], convertDictFileToTrie(dictFile), convertBoardLettersTo4x4Matrix(boardLetters), '');
exports.convertDictFileToTrie = convertDictFileToTrie;
exports.convertBoardLettersTo4x4Matrix = convertBoardLettersTo4x4Matrix;
exports.computeValidWords = computeValidWords;

// function compute(trie, letterMatrix){
//     if(letterMatrix)
// }
