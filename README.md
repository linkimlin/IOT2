# 智能家居控制系统

这是一个基于 Python 和 Web 技术的智能家居控制系统，支持远程监控和控制。

## 功能特点

- 实时监控环境数据（温度、湿度、光线）
- 远程控制窗帘（开关、停止、极限设置）
- 灯光控制（开关、自动模式）
- 空调控制（开关）
- 响应式 Web 界面，支持移动设备
- 内网穿透支持，实现远程访问

## 系统要求

- Python 3.8 或更高版本
- 串口设备（用于传感器数据采集）
- ngrok 账号（用于内网穿透）

## 安装步骤

1. 克隆项目到本地：
   ```bash
   git clone <your-repository-url>
   cd <repository-name>
   ```

2. 安装依赖：
   ```bash
   pip install -r requirements.txt
   ```

3. 配置环境变量：
   - 复制 `.env.example` 为 `.env`
   - 在 `.env` 文件中添加您的 ngrok 认证令牌：
     ```
     NGROK_AUTH_TOKEN=your_auth_token_here
     ```

4. 修改串口配置：
   - 在 `sensor_control.py` 中修改 `SERIAL_PORT` 为您的实际串口
   - 默认波特率为 9600，如需修改请同时更新 `BAUD_RATE`

## 运行系统

1. 启动后端服务器：
   ```bash
   python app.py
   ```
   系统会自动启动 ngrok 隧道，并在控制台显示公网访问地址。

2. 访问 Web 界面：
   - 本地访问：http://localhost:5000
   - 远程访问：使用 ngrok 提供的公网地址

## 部署到 GitHub Pages

1. 创建新的 GitHub 仓库

2. 将前端文件推送到仓库：
   ```bash
   git init
   git add static/
   git commit -m "Initial frontend commit"
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

3. 在仓库设置中启用 GitHub Pages：
   - 进入仓库设置
   - 找到 "Pages" 选项
   - 选择部署分支（通常是 main）
   - 选择部署目录（通常是 /root 或 /docs）

4. 修改前端配置：
   - 在 `static/js/app.js` 中更新 `API_BASE_URL` 为您的 ngrok 地址

## 使用说明

1. 传感器数据显示：
   - 温度、湿度、光线数据实时更新
   - 数据每秒自动刷新

2. 窗帘控制：
   - 开窗帘：点击"开窗帘"按钮
   - 关窗帘：点击"关窗帘"按钮
   - 停止：点击"停窗帘"按钮
   - 极限设置：点击"开极限"按钮，然后点击"停窗帘"记录极限时间
   - 重置：点击"重置"按钮清除极限设置

3. 灯光控制：
   - 开灯：点击"开灯"按钮
   - 关灯：点击"关灯"按钮
   - 自动模式：切换开关启用/禁用自动控制

4. 空调控制：
   - 开空调：点击"开空调"按钮
   - 关空调：点击"关空调"按钮

## 注意事项

1. 确保串口设备正确连接并配置
2. 保持 ngrok 隧道运行以确保远程访问
3. 定期检查系统日志，及时处理异常情况
4. 注意保护 ngrok 认证令牌，不要泄露给他人

## 故障排除

1. 无法连接串口：
   - 检查串口名称是否正确
   - 确认设备是否已连接
   - 检查波特率设置

2. 远程访问失败：
   - 确认 ngrok 隧道是否正常运行
   - 检查认证令牌是否正确
   - 查看 ngrok 控制台日志

3. Web 界面无响应：
   - 检查网络连接
   - 确认后端服务器是否运行
   - 查看浏览器控制台错误信息

## 许可证

MIT License 