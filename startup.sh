#!/bin/bash

export VENV_FOLDER="backend/venv"
export MAIN_FILE="backend.main"

# Check if venv folder exists
if [ ! -d $VENV_FOLDER ]; then
    echo "Virtual environment not found. Creating virtual environment..."
    python3 -m venv $VENV_FOLDER
    source $VENV_FOLDER/bin/activate
    pip3 install -r requirements.txt
else
    echo "Virtual environment found. Activating virtual environment..."
    source $VENV_FOLDER/bin/activate
fi

# Start FastAPI
uvicorn ${MAIN_FILE}:app --reload
