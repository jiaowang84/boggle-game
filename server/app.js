const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const word = require('./utils/word');
const dictFile = path.join(__dirname, 'data/dictionary.txt');
const testBoardLetters = ['T', 'A', 'P', '*', 'E', 'A', 'K', 'S', 'O', 'B', 'R', 'S', 'S', '*', 'X', 'D'];
const testBoardLetterWOAsterisk = ['T', 'A', 'P', 'E', 'E', 'A', 'K', 'S', 'O', 'B', 'R', 'S', 'S', 'T', 'X', 'D'];
let port = process.env.PORT;
if (port == null || port == "") {
    port = 9000;
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

word.convertDictFileToTrie(dictFile).then(trie => {
    // Express only serves static assets in production
    if (process.env.NODE_ENV === "production") {
        console.log('here', path.join(__dirname, '..', 'build'));
        app.use(express.static(path.join(__dirname, '..', 'build')));

        app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname, 'build', '..', 'index.html'));
        });
    }

    app.post('/getValidWordsFromBoardLetters', function (req, res) {
        let boardLetters = req.body.boardLetters;
        let letterMatrix = word.convertBoardLettersTo4x4Matrix(boardLetters);
        let validWords = word.computeValidWords(trie, letterMatrix);
        res.send( [...validWords]);
    });

    app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});



