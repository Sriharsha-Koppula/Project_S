// 🌗 Toggle light/dark mode
const toggleButton = document.getElementById('modeToggle');
toggleButton.addEventListener('click', () => {
  document.body.classList.toggle('light');
  toggleButton.textContent = document.body.classList.contains('light') ? '🌞' : '🌙';
});

// ✉️ Send message
function sendMessage(e) {
  e.preventDefault();
  const input = document.getElementById('userInput');
  const text = input.value.trim();

  if (text !== "") {
    appendMessage(text, "user");
    input.value = "";

    const mode = document.body.classList.contains('light') ? 'Light Mode' : 'Dark Mode';

    // Send prompt to backend
    fetch("http://127.0.0.1:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: `(${mode}) ${text}` })
    })
    .then(res => res.json())
    .then(data => {
      // Split response line by line
      const lines = (data.response || "").split("\n");
      lines.forEach(line => {
        if (line.trim() !== "") {
          appendMessage(line.trim(), "bot");
        }
      });
    })
    .catch(error => {
      console.error("Error:", error);
      appendMessage("❌ Error reaching backend.", "bot");
    });
  }
}

// 🧱 Append message to chat window
function appendMessage(msg, sender) {
  const chatBody = document.getElementById('chatBody');
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message', sender);
  msgDiv.textContent = msg;
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}
