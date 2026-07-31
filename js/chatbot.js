const chatbotTab = document.getElementById("chatbot-pestana");
const chatbotWindow = document.getElementById("chatbot-ventana");
const cerrarChat = document.getElementById("cerrar-chat");


chatbotTab.addEventListener("click", function () {
    chatbotWindow.style.display = "flex";
});

cerrarChat.addEventListener("click", function () {
    chatbotWindow.style.display = "none";
});