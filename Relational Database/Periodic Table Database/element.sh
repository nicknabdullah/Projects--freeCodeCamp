#!/bin/bash

PSQL="psql --username=freecodecamp --dbname=periodic_table -t --no-align -c"

# Check if argument is provided
if [[ -z $1 ]]; then
  echo "Please provide an element as an argument."
  exit 0
fi

# Common SQL query parts
BASE_QUERY="SELECT atomic_number, name, symbol, types.type, atomic_mass, 
      melting_point_celsius, boiling_point_celsius 
      FROM elements 
      JOIN properties USING(atomic_number) 
      JOIN types USING(type_id)"

# Determine search criteria based on input
if [[ $1 =~ ^[0-9]+$ ]]; then
  CONDITION="atomic_number = $1"
elif [[ $1 =~ ^[A-Za-z]{1,2}$ ]]; then
  CONDITION="symbol ILIKE '$1'"
elif [[ $1 =~ ^[A-Za-z]+$ ]]; then
  CONDITION="name ILIKE '$1'"
else
  echo "I could not find that element in the database."
  exit 0
fi

# Execute query
ELEMENT=$($PSQL "$BASE_QUERY WHERE $CONDITION")

# Check if element exists
if [[ -z $ELEMENT ]]; then
  echo "I could not find that element in the database."
  exit 0
fi

# Parse result
IFS="|" read -r ATOMIC_NUMBER NAME SYMBOL TYPE MASS MELTING BOILING <<< "$ELEMENT"

# Output result
echo "The element with atomic number $ATOMIC_NUMBER is $NAME ($SYMBOL). \
It's a $TYPE, with a mass of $MASS amu. \
$NAME has a melting point of $MELTING celsius and a boiling point of $BOILING celsius."