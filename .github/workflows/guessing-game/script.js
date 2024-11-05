// 获取画布和上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 设置画布尺寸
canvas.width = 800;
canvas.height = 400;

// 定义小球属性
let ball = {
    x: 100,
    y: 300,
    radius: 20,
    color: 'red',
    gravity: 1.5,
    lift: -20,
    velocity: 0
};

// 定义动画属性
let showLoveMessage = false;
let messageOpacity = 0;

// 监听键盘事件
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        ball.velocity = ball.lift;

        // 触发显示“我爱你 宝宝”动画的条件
        showLoveMessage = true;
        messageOpacity = 0; // 重置透明度
    }
});

// 游戏更新函数
function update() {
    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制小球
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();

    // 更新小球位置和速度
    ball.velocity += ball.gravity;
    ball.y += ball.velocity;

    // 防止小球掉出底部
    if (ball.y + ball.radius > canvas.height) {
        ball.y = canvas.height - ball.radius;
        ball.velocity = 0;
    }

    // 防止小球超出顶部
    if (ball.y - ball.radius < 0) {
        ball.y = ball.radius;
        ball.velocity = 0;
    }

    // 显示“我爱你”动画
    if (showLoveMessage) {
        ctx.font = '48px serif';
        ctx.fillStyle = `rgba(255, 0, 0, ${messageOpacity})`;
        ctx.textAlign = 'center';
        ctx.fillText('我爱你 宝宝', canvas.width / 2, canvas.height / 2);

        // 增加透明度以创建淡入效果
        if (messageOpacity < 1) {
            messageOpacity += 0.01;
        } else {
            // 动画结束后保持显示一段时间
            setTimeout(() => {
                showLoveMessage = false;
            }, 2000);
        }
    }

    requestAnimationFrame(update);
}

// 启动游戏
update();

