@echo off
chcp 65001 >nul
echo ========================================
echo   重启后端服务
echo ========================================
echo.

echo 正在停止运行中的Node.js进程...
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo 已停止旧的服务
) else (
    echo 没有发现运行中的服务
)

timeout /t 2 /nobreak >nul

echo.
echo 正在启动后端服务...
start "后端服务" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   后端服务已重启
echo ========================================
echo.
echo 请在新打开的窗口中查看服务日志
echo.
pause

