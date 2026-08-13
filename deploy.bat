@echo off
REM ============================================================
REM  One-click deploy for 诸葛宇轩 academic homepage
REM  Before running: create repo named "yuxuanzg.github.io" on
REM  GitHub (Public). Then double-click this file.
REM ============================================================
set "GIT=C:\Program Files\Git\bin\git.exe"

if not exist "%GIT%" (
  echo [ERROR] Git not found at %GIT%
  echo Please install Git from https://git-scm.com and re-run.
  pause
  exit /b 1
)

echo [1/3] Setting remote origin ...
"%GIT%" remote remove origin >nul 2>&1
"%GIT%" remote add origin https://github.com/yuxuanzg/yuxuanzg.github.io.git

echo [2/3] Ensuring branch main ...
"%GIT%" branch -M main

echo [3/3] Pushing to GitHub (a login window may appear) ...
"%GIT%" push -u origin main

echo.
echo ============================================================
if %errorlevel%==0 (
  echo SUCCESS! Now enable GitHub Pages:
  echo   Repo Settings -^> Pages -^> Source: Deploy from a branch
  echo   Branch: main / root  -^> Save
  echo Wait 1-2 minutes, then visit https://yuxuanzg.github.io
) else (
  echo FAILED. Check the error above, then re-run this script.
)
echo ============================================================
pause
