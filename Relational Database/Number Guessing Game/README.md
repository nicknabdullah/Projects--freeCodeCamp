# Number Guessing Game

A simple bash script that creates a number guessing game where users try to guess a randomly generated number between 1 and 1000.

Project: https://www.freecodecamp.org/learn/relational-database/build-a-number-guessing-game-project/build-a-number-guessing-game

## Features
- Maintains a game history database using PostgreSQL
- Tracks user attempts and best game scores
- Personalizes experience by recording username
- Provides feedback if guess is too high or too low
- Displays game statistics upon completion

## Prerequisites
- PostgreSQL database
- psql command-line tool
- Bash shell environment

## Database Schema
The game uses a database named 'number_guess' with a table containing:
- user_id (SERIAL PRIMARY KEY)
- username (VARCHAR)
- games_played (INTEGER)
- best_game (INTEGER)

## How to Play
1. Run the script using: `./number_guess.sh`
2. Enter your username when prompted
3. Guess numbers between 1-1000
4. The game will tell you if your guess is too high or too low
5. Continue guessing until you find the correct number
6. View your game statistics after winning

## Game Statistics
The game tracks and displays:
- Number of games played
- Best game (least number of guesses)
- Current game attempt count

## Error Handling
- Validates numeric input
- Handles new and returning players
- Ensures database connection and data integrity