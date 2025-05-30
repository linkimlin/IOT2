// 配置API地址
const API_BASE_URL = 'https://f5b6-124-64-23-130.ngrok-free.app';  // ngrok地址

// 更新UI显示
function updateUI(data) {
    // 更新传感器数据
    document.getElementById('temperature').textContent = `${data.temperature.toFixed(1)} ℃`;
    document.getElementById('humidity').textContent = `${data.humidity.toFixed(1)} %`;
    document.getElementById('light').textContent = `${data.light} lux`;

    // 更新窗帘状态
    const curtainStatus = document.getElementById('curtain-status');
    const curtainProgress = document.getElementById('curtain-progress');
    const curtainProgressText = document.getElementById('curtain-progress-text');
    
    if (data.curtain_state === 'opening') {
        curtainStatus.textContent = '状态: 正在打开';
    } else if (data.curtain_state === 'closing') {
        curtainStatus.textContent = '状态: 正在关闭';
    } else {
        curtainStatus.textContent = '状态: 停止';
    }

    if (data.curtain_limit_time) {
        const position = (data.curtain_countdown / data.curtain_limit_time) * 100;
        curtainProgress.style.width = `${position}%`;
        curtainProgressText.textContent = `位置: ${data.curtain_countdown.toFixed(1)}秒 [${position.toFixed(1)}%]`;
    }

    // 更新灯光状态
    const lightStatus = document.getElementById('light-status');
    lightStatus.textContent = `状态: ${data.light_on ? '开启' : '关闭'}`;
    if (data.auto) {
        lightStatus.textContent += ' (自动模式)';
    }

    // 更新空调状态
    const acStatus = document.getElementById('ac-status');
    acStatus.textContent = `状态: ${data.ac_on ? '开启' : '关闭'}`;
}

// 发送命令
function sendCommand(command) {
    fetch(`${API_BASE_URL}/api/command`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command: command })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('命令发送成功');
        } else {
            console.error('命令发送失败:', data.error);
        }
    })
    .catch(error => {
        console.error('发送命令时出错:', error);
    });
}

// 定期获取传感器数据
function updateData() {
    fetch(`${API_BASE_URL}/api/sensor_data`)
        .then(response => response.json())
        .then(data => {
            updateUI(data);
        })
        .catch(error => {
            console.error('获取数据时出错:', error);
        });
}

// 每1秒更新一次数据
setInterval(updateData, 1000);
// 页面加载时立即更新一次
updateData(); 