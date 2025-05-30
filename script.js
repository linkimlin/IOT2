// 配置API地址
const API_BASE_URL = 'http://localhost:5000';  // 临时使用本地地址测试

// 更新UI显示
function updateUI(data) {
    try {
        if (!data || typeof data !== 'object') {
            throw new Error('无效的数据格式');
        }
        
        // 更新传感器数据
        if (typeof data.temperature !== 'number' || 
            typeof data.humidity !== 'number' || 
            typeof data.light !== 'number') {
            throw new Error('传感器数据格式无效');
        }
        
        document.getElementById('temperature').textContent = `${data.temperature.toFixed(1)} ℃`;
        document.getElementById('humidity').textContent = `${data.humidity.toFixed(1)} %`;
        document.getElementById('light').textContent = `${data.light} lux`;

        // 更新窗帘状态
        const curtainStatus = document.getElementById('curtain-status');
        const curtainProgress = document.getElementById('curtain-progress');
        const curtainProgressText = document.getElementById('curtain-progress-text');
        
        if (typeof data.curtain_state !== 'string') {
            throw new Error('窗帘状态格式无效');
        }
        
        if (data.curtain_state === 'opening') {
            curtainStatus.textContent = '状态: 正在打开';
        } else if (data.curtain_state === 'closing') {
            curtainStatus.textContent = '状态: 正在关闭';
        } else {
            curtainStatus.textContent = '状态: 停止';
        }

        if (data.curtain_limit_time !== null && data.curtain_countdown !== null) {
            const position = (data.curtain_countdown / data.curtain_limit_time) * 100;
            curtainProgress.style.width = `${position}%`;
            curtainProgressText.textContent = `位置: ${data.curtain_countdown.toFixed(1)}秒 [${position.toFixed(1)}%]`;
        }

        // 更新灯光状态
        const lightStatus = document.getElementById('light-status');
        if (typeof data.light_on !== 'boolean' || typeof data.auto !== 'boolean') {
            throw new Error('灯光状态格式无效');
        }
        
        lightStatus.textContent = `状态: ${data.light_on ? '开启' : '关闭'}`;
        if (data.auto) {
            lightStatus.textContent += ' (自动模式)';
        }

        // 更新空调状态
        const acStatus = document.getElementById('ac-status');
        if (typeof data.ac_on !== 'boolean') {
            throw new Error('空调状态格式无效');
        }
        
        acStatus.textContent = `状态: ${data.ac_on ? '开启' : '关闭'}`;
    } catch (error) {
        console.error('更新UI时出错:', error);
        // 显示错误状态
        document.getElementById('temperature').textContent = '-- ℃';
        document.getElementById('humidity').textContent = '-- %';
        document.getElementById('light').textContent = '-- lux';
        document.getElementById('curtain-status').textContent = '状态: 错误';
        document.getElementById('light-status').textContent = '状态: 错误';
        document.getElementById('ac-status').textContent = '状态: 错误';
    }
}

// 发送命令
async function sendCommand(command) {
    try {
        console.log('发送命令:', command);
        const response = await fetch(`${API_BASE_URL}/api/command`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ command: command })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            throw new TypeError("服务器返回的数据不是 JSON 格式!");
        }
        
        const data = await response.json();
        console.log('命令响应:', data);
        
        if (data.success) {
            console.log('命令发送成功');
        } else {
            console.error('命令发送失败:', data.error);
        }
    } catch (error) {
        console.error('发送命令时出错:', error);
    }
}

// 定期获取传感器数据
async function updateData() {
    try {
        console.log('获取传感器数据...');
        const response = await fetch(`${API_BASE_URL}/api/sensor_data`, {
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.error('服务器返回的 Content-Type:', contentType);
            throw new TypeError("服务器返回的数据不是 JSON 格式!");
        }
        
        const data = await response.json();
        console.log('获取到的数据:', data);
        updateUI(data);
    } catch (error) {
        console.error('获取数据时出错:', error);
        // 显示错误状态
        document.getElementById('temperature').textContent = '-- ℃';
        document.getElementById('humidity').textContent = '-- %';
        document.getElementById('light').textContent = '-- lux';
        document.getElementById('curtain-status').textContent = '状态: 错误';
        document.getElementById('light-status').textContent = '状态: 错误';
        document.getElementById('ac-status').textContent = '状态: 错误';
    }
}

// 每1秒更新一次数据
setInterval(updateData, 1000);
// 页面加载时立即更新一次
updateData(); 