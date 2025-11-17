@echo off
chcp 65001 >nul
echo ========================================
echo    AI创业方案推荐网站 - 服务启动器
echo ========================================
echo.

echo [1/2] 正在启动后端服务（端口3000）...
start "后端服务" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 2 /nobreak >nul

echo [2/2] 正在启动前端服务（端口5173）...
start "前端服务" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   服务启动完成！
echo ========================================
echo.
echo 后端服务: http://localhost:3000
echo 前端服务: http://localhost:5173
echo.
echo 请在新打开的窗口中查看服务日志
echo 按任意键关闭此窗口（服务将继续运行）...
pause >nul

