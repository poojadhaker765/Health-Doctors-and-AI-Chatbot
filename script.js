



const API_KEY = "AIzaSyBWY8tGNkbgrUTFleaCrzSbwUbPsv54Aoc";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage(message, "user");
    userInput.value = "";
    addMessage("Typing...", "bot");

    const aiReply = await getGeminiResponse(
        `User symptom: ${message}. Suggest a doctor and city location in India.`
    );

    chatBox.lastChild.remove();
    addMessage(aiReply, "bot");
});

function addMessage(text, sender) {
    const msg = document.createElement("div");
    msg.className = `message ${sender}`;
    msg.textContent = text;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getGeminiResponse(prompt) {
    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        const data = await res.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response found.";
    } catch (err) {
        console.error(err);
        return "Error connecting to Gemini.";
    }
}

