async function sendMessage() {
  const input = document.getElementById("userInput");
  const message = input.value.trim();
  const chatBox = document.getElementById("chat-box");

  if (!message) return;

  chatBox.innerHTML += `<div class="user">You: ${message}</div>`;
  input.value = "";

  chatBox.innerHTML += `<div class="bot">Bot: Thinking...</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();

    // remove "Thinking..."
    chatBox.lastChild.remove();

    chatBox.innerHTML += `<div class="bot">Bot: ${data.reply}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
    chatBox.lastChild.remove();
    chatBox.innerHTML += `<div class="bot">Bot: Error connecting to AI service.</div>`;
  }
}
