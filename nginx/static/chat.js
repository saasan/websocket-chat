function main() {
    const ws = new WebSocket(`ws://${location.host}/ws`);
    const username = document.getElementById('username');
    const message = document.getElementById('message');
    const messages = document.getElementById('messages');

    ws.onmessage = (event) => {
        const messageItem = document.createElement('li');
        messageItem.textContent = event.data;
        messages.insertBefore(messageItem, messages.firstChild);
    };

    document.getElementById('chat-form').addEventListener('submit', (event) => {
        event.preventDefault();

        if (username && message) {
            ws.send(`${username.value}: ${message.value}`);
            message.value = '';
        } else {
            alert('名前とメッセージを入力してください。');
        }
    });

    window.addEventListener('beforeunload', () => {
        if (username.value) {
            ws.send(`${username.value} が退出しました。`);
        }
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}
