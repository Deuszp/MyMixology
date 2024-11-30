@echo off
cd %~dp0frontend

echo Installing dependencies...
call npm install

echo Starting development server...
call npm start
