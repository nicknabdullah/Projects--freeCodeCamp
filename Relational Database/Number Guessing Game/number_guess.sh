#!/bin/bash

# Set PSQL variable for executing PostgreSQL commands
PSQL="psql --username=freecodecamp --dbname=number_guess -t --no-align -c"

# Generate random secret number between 1 and 1000
SECRET_NUMBER=$((RANDOM % 1000 + 1))

# Initialize global variables
GAMES_PLAYED=0
BEST_GAME=0
GUESS_COUNT=0

# Main function
MAIN() {
  echo "Enter your username:"
  read USERNAME
    
  # Get user from DB
  USER_ROW=$($PSQL "SELECT username, games_played, best_game FROM users WHERE username='$USERNAME'")
  echo "DEBUG: Row fetched = $USER_ROW"

  if [[ -z $USER_ROW ]]
  then
    # New user - insert into table
    INSERT_NEW_USER=$($PSQL "INSERT INTO users(username, games_played) VALUES('$USERNAME', 0)")
    echo -e "\nWelcome, $USERNAME! It looks like this is your first time here."
  else
    # Existing user - extract values
    IFS="|" read -r USERNAME GAMES_PLAYED BEST_GAME <<< "$USER_ROW"
    echo -e "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
  fi

  # Start the guessing game
  echo -e "\nGuess the secret number between 1 and 1000:"
  GET_USER_INPUT
}

# Function to get and check user guesses
GET_USER_INPUT() {
  read USER_INPUT

  # Validate integer
  if [[ ! $USER_INPUT =~ ^[0-9]+$ ]]
  then
    echo "That is not an integer, guess again:"
    GET_USER_INPUT
    return
  fi

  GUESS_COUNT=$((GUESS_COUNT + 1))

  if [[ $USER_INPUT -lt $SECRET_NUMBER ]]
  then
    echo "It's higher than that, guess again:"
    GET_USER_INPUT
  elif [[ $USER_INPUT -gt $SECRET_NUMBER ]]
  then
    echo "It's lower than that, guess again:"
    GET_USER_INPUT
  else
    echo "You guessed it in $GUESS_COUNT tries. The secret number was $SECRET_NUMBER. Nice job!"

    # Update best game if it's better or first time
    if [[ -z $BEST_GAME || $BEST_GAME -eq 0 || $GUESS_COUNT -lt $BEST_GAME ]]
    then
      UPDATE_BEST_GAME=$($PSQL "UPDATE users SET best_game=$GUESS_COUNT WHERE username='$USERNAME'")
    fi

    # Increment games played
    GAMES_PLAYED=$((GAMES_PLAYED + 1))
    UPDATE_GAMES_PLAYED=$($PSQL "UPDATE users SET games_played=$GAMES_PLAYED WHERE username='$USERNAME'")
  fi
}

# Run the main function
MAIN