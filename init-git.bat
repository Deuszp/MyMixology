@echo off
echo Checking Git remote...
git remote -v

echo Adding files to Git...
git add .

echo Creating commit...
git commit -m "Update GitHub Pages deployment configuration"

echo Pushing to GitHub...
git push

echo Done!
pause