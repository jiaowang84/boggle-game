
# Pre-requisites
1. node & npm (this project is bootstrapped using Create-React-App)

# Installation

1. Run the below command:

```
npm install
```

# Running 

1. Run the below command: 

```
npm run server
```

Then you can access the page at http://localhost:9000. 



# UI Development for fast iteration

1. Run the below command (in separate terminals): 

```
node server/app.js
```

```
npm start
```

Then you can access the page at http://localhost:3000. Your changes in the react components will be auto-reloaded. 

Introduction of the app - Boggle Coding Challenge: 
Boggle is a word game that is played on a 4x4 board with 16 letter tiles. 
The goal is to find as many words as possible given a time constraint.  
For this exercise, we are making one modification.  Now it is possible for one or more of the letter tiles to be blank (denoted by *).  
When a tile is blank, it can be treated as any other letter.  Note that in one game it does not have to be the same character for each word.  
For example, if the tiles C, T, and * are adjacent.  The words cot, cat, and cut can all be used. 
You will be given a text file containing all valid English words (a dictionary).
You will also be given an initial board configuration as a text file with commas separating the letters. Use this as a guide for how to set up the board

For example a file may contain:

A, C, E, D, L, U, G, *, E, *, H, T, G, A, F, K

This is equivalent to the board:

A C E D
L U G *
E * H T
G A F K

Some sample words from this board are ace, dug, eight, hole, huge, hug, tide.  

Implement the user interface for a single person Boggle game.  The player should be able to enter a word and then the program will validate that the word is actually in the board and is a valid English word.  This is a very open-ended problem as it is meant to show how you think about the user and your frontend development skills. 

Send us your solution whenever you're done. Please include instructions on how to run/build your solution.