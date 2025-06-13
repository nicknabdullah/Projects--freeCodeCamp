#!/bin/bash

PSQL="psql -X --username=freecodecamp --tuples-only --dbname=salon -c"

echo -e "\n~~~~~ Welcome to My Salon, what would you like? ~~~~~\n"

MAIN_MENU() {
  if [[ $1 ]]
  then 
    echo -e "\n$1"
  fi

  echo -e "\n1) cut \n2) shave \n3) shampoo" 
  read MAIN_MENU_SELECTION

  case $MAIN_MENU_SELECTION in
    1|2|3) BOOK_APPOINTMENT $MAIN_MENU_SELECTION ;;
    # 4) EXIT ;;
    *) MAIN_MENU "I could not find that service. What would you like today?" ;;
  esac
}

BOOK_APPOINTMENT() {
  # get service id
  SERVICE_ID_SELECTED=$1

  # get service name
  SERVICE_NAME=$($PSQL "select name from services where service_id = $SERVICE_ID_SELECTED" | xargs)

  # get phone number
  echo -e "\nWhat's your phone number?"
  read CUSTOMER_PHONE

  # get customer name
  CUSTOMER_NAME=$($PSQL "select name from customers where phone = '$CUSTOMER_PHONE'" | xargs)
  
  # if customer doesn't exist
  if [[ -z $CUSTOMER_NAME ]]
  then
    # get new customer name
    echo -e "\nWhat's your name?"
    read CUSTOMER_NAME
    
    # insert new customer
    INSERT_CUSTOMER_RESULT=$($PSQL "insert into customers(name, phone) values('$CUSTOMER_NAME', '$CUSTOMER_PHONE')")
  fi

  # get customer_id
  CUSTOMER_ID=$($PSQL "select customer_id from customers where phone = '$CUSTOMER_PHONE'" | xargs)

  # get appointment time
  echo -e "\nWhat time would you like your $SERVICE_NAME, $CUSTOMER_NAME?"
  read SERVICE_TIME

  # insert appointment
  INSERT_APPOINTMENT_RESULT=$($PSQL "insert into appointments(customer_id, service_id, time) values($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")
  
  # send to main menu
  MAIN_MENU "I have put you down for a $SERVICE_NAME at $SERVICE_TIME, $CUSTOMER_NAME."

}

EXIT() {
  echo -e "\nThank you for stopping in.\n"
}

MAIN_MENU