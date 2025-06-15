# Periodic Table Database

A shell script to retrieve information about chemical elements from a PostgreSQL database.
For project:
https://www.freecodecamp.org/learn/relational-database/build-a-periodic-table-database-project/build-a-periodic-table-database

## Description

This script (`element.sh`) queries a PostgreSQL database containing information about chemical elements and displays their properties based on user input. The script can accept atomic numbers, element symbols, or element names as arguments.

## Prerequisites

- PostgreSQL database server
- `periodic_table` database installed
- Bash shell

## Usage

```bash
./element.sh [ARGUMENT]
```

Where `[ARGUMENT]` can be:
- Atomic number (e.g., "1")
- Element symbol (e.g., "H")
- Element name (e.g., "Hydrogen")

## Examples

```bash
./element.sh 1
# Output: The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu.

./element.sh H
# Output: The element with atomic number 1 is Hydrogen (H). It's a nonmetal, with a mass of 1.008 amu.
```

## Error Handling

- If no argument is provided, the script will display: "Please provide an element as an argument."
- If the element is not found, the script will display: "I could not find that element in the database."

## License

This project is open source and available under the MIT License.