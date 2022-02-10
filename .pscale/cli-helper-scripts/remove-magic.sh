#!/bin/bash

BRANCH_NAME=${BRANCH_NAME:-"remove-magic"}
DDL_STATEMENTS="ALTER table hp_character DROP house, DROP is_wizard, DROP ancestry, DROP wand_id, DROP patronus, DROP is_hogwarts_student, DROP is_hogwarts_staff;"

./create-db-branch-dr-and-connection.sh "$BRANCH_NAME" "$DDL_STATEMENTS"