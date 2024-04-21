const express = require('express');
const { TimegraphClient } = require('@analog-labs/timegraph-js');

const app = express();

// Định nghĩa các route cho API của bạn
app.get('/createUser', async (req, res) => {
    try {
        // Tạo một phiên giao tiếp mới với Timegraph
        const timeGraphClient = new TimegraphClient({
            url: 'https://timegraph.staging.analog.one/graphql',
            // Thay thế 'YOUR_SESSION_KEY' bằng session key của bạn
            sessionKey: 'YOUR_SESSION_KEY',
        });

        // Thực hiện các thao tác tương tác với API của Analog
        const createUserResponse = await timeGraphClient.user.create({ address: req.query.walletAddress });

        // Trả về kết quả cho người dùng
        res.json(createUserResponse);
    } catch (error) {
        console.error('Lỗi:', error);
        // Trả về lỗi nếu có vấn đề xảy ra
        res.status(500).json({ error: 'Đã xảy ra lỗi khi tạo người dùng' });
    }
});

// Lắng nghe các yêu cầu trên cổng 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API server đang chạy trên cổng ${PORT}`);
});
