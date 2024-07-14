// chatbot.js
document.addEventListener('DOMContentLoaded', function () {
    const datetimeElement = document.getElementById('datetime');
    const today = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false,
    };
    datetimeElement.textContent = today.toLocaleDateString('en-US', options);
});
