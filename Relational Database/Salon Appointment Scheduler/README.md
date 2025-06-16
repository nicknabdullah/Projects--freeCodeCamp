# Salon Appointment Scheduler

A bash script that manages appointments for a salon using PostgreSQL database.
Project: https://www.freecodecamp.org/learn/relational-database/build-a-salon-appointment-scheduler-project/build-a-salon-appointment-scheduler

## Description

This project is a command-line application that helps salon owners manage their customer appointments. It uses a PostgreSQL database to store customer information and appointment details.

## Features

-   Schedule new appointments
-   Store customer information
-   Track service appointments
-   Database-driven solution

## Requirements

-   PostgreSQL
-   Bash
-   Linux/Unix environment

## Setup

1. Create the database:

```bash
psql -U postgres < salon.sql
```

2. Make the script executable:

```bash
chmod +x salon.sh
```

3. Run the script:

```bash
./salon.sh
```

## Database Structure

The database includes tables for:

-   Customers
-   Services
-   Appointments

## License

This project is part of the freeCodeCamp Relational Database Certification.
