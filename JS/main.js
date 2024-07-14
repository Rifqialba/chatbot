document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatMessages = document.getElementById('chat-messages');
    const sendButton = document.querySelector('.todo-btn'); 

    sendButton.addEventListener('click', function (e) {
        e.preventDefault();
        const userMessage = userInput.value.trim();
        if (userMessage === '') return;

        appendUserMessage(userMessage);
        userInput.value = '';
        sendChatMessage(userMessage);
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();
    });
    function appendUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll ke bawah
    }

    function appendBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        messageElement.innerHTML = `
            <div class="message-content">${message}</div>
        `;
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; 
    }
    function appendErrorMessage() {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'error-message');
        messageElement.textContent = "Oops! AI didn't respond. Please try again later.";
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight; 
    }

    function sendChatMessage(message) {
        const url = 'https://"your_server"/v1/chat';
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }), 
        })
            .then(response => response.json())
            .then(data => {
                const botMessage = data.response; 
                if (botMessage) {
                    appendBotMessage(botMessage);
                } else {
                    appendErrorMessage();
                }
            })
            .catch(error => {
                console.error('Error sending message:', error);
                appendErrorMessage();
            });
    }
});
