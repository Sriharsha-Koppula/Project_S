// Toggle light/dark mode
const toggleButton = document.getElementById('modeToggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggleButton.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
});

// Send message
function sendMessage(e) {
  e.preventDefault();
  const input = document.getElementById('userInput');
  const text = input.value.trim();

  if (text !== "") {
    appendMessage(text, "user");
    input.value = "";

    // Get current theme mode
    const mode = document.body.classList.contains('light') ? 'Light Mode' : 'Dark Mode';

    // Send to backend
    fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: `(${mode}) ${text}` })
    })
    .then(res => res.json())
    .then(data => {
      appendMessage(data.response, "bot");
    })
    .catch(error => {
      console.error("Error:", error);
      appendMessage("❌ Error reaching backend.", "bot");
    });
  }
}

// Append message to chat
function appendMessage(msg, sender) {
  const chatBody = document.getElementById('chatBody');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = msg;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}
