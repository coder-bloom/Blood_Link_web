const chatbotBtn = document.getElementById('chatbot-btn');
const chatbotWindow = document.getElementById('chatbot-window');
const closeChat = document.getElementById('close-chat');
const chat = document.getElementById('chat');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Open chatbot
chatbotBtn.addEventListener('click', () => {
  chatbotWindow.style.display = 'flex';
  chatbotBtn.style.display = 'none';
});

// Close chatbot
closeChat.addEventListener('click', () => {
  chatbotWindow.style.display = 'none';
  chatbotBtn.style.display = 'block';
});

// Send message to Flask backend
async function sendMessage() {
  const question = userInput.value.trim();
  if (!question) return;

  chat.innerHTML += `<div class="message user"><b>You:</b> ${question}</div>`;
  chat.scrollTop = chat.scrollHeight;

  const response = await fetch('/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question })
  });

  const data = await response.json();
  chat.innerHTML += `<div class="message bot"><b>Bot:</b> ${data.answer}</div>`;
  chat.scrollTop = chat.scrollHeight;
  userInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') sendMessage();
});
