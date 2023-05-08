@echo off

rem Define the name of the virtual environment folder
set VENV_FOLDER=backend\venv
set MAIN_FILE=backend.main

rem Check if the virtual environment folder exists
if exist %VENV_FOLDER% (
    echo Virtual environment folder found
    echo Starting FastAPI server...
    call %VENV_FOLDER%\Scripts\activate.bat
    uvicorn %MAIN_FILE%:app --reload
) else (
    echo Virtual environment folder not found
    echo Creating virtual environment...
    python -m venv %VENV_FOLDER%
    echo Installing requirements...
    %VENV_FOLDER%\Scripts\activate.bat && pip install -r requirements.txt
    echo Starting FastAPI server...
    uvicorn %MAIN_FILE%:app --reload
)

uvicorn %MAIN_FILE%:app --reload
