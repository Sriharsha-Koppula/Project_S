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

    const mode = document.body.classList.contains('light') ? 'Light Mode' : 'Dark Mode';

    fetch("https://plumsoft-backend-442797114823.us-central1.run.app/ask", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ query: text })  // ✅ Clean query sent to backend
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
  msgDiv.innerHTML = formatParagraphs(msg);
  chatBody.appendChild(msgDiv);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Format text into paragraphs
function formatParagraphs(text) {
  return text
    .split(/\n\s*\n/)
    .map(p => `<p>${p.trim()}</p>`)
    .join("");
}
