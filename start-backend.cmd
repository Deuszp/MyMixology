@echo off
cd %~dp0backend
set PYTHONPATH=%~dp0backend
call venv\Scripts\activate
echo Installing dependencies...
pip install -r requirements.txt
echo Starting server...
python start.py
