document.addEventListener("DOMContentLoaded", function() {
  const messageBar = document.querySelector(".bar-wrapper input");
  const sendBtn = document.querySelector(".bar-wrapper button");
  const messageBox = document.querySelector(".message-box");
  const history = document.querySelector(".history");

  let API_URL = "https://api.openai.com/v1/chat/completions";
  let API_KEY = /* API_KEY_YOUR_HERE; */

  sendBtn.onclick = sendMessage;

  messageBar.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

  function sendMessage() {
    if (messageBar.value.length > 0) {
      const UserTypedMessage = messageBar.value;
      messageBar.value = "";

      // Yeni mesaj kutusunun metnini sol kenardan başlat
      document.querySelector(".bar-wrapper input").style.textAlign = "left";

      let message =
        `<div class="chat message">
          <img src="img/user.jpg">
          <span>
            ${UserTypedMessage}
          </span>
        </div>`;

      let response =
        `<div class="chat response">
          <img src="img/chatbot.jpg">
          <span class= "new">...
          </span>
        </div>`;

      messageBox.insertAdjacentHTML("beforeend", message);

      setTimeout(() => {
        messageBox.insertAdjacentHTML("beforeend", response);

        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            "model": "gpt-3.5-turbo",
            "messages": [{ "role": "user", "content": UserTypedMessage }]
          })
        };

        fetch(API_URL, requestOptions)
          .then(res => res.json())
          .then(data => {
            const ChatBotResponse = document.querySelector(".response .new");
            ChatBotResponse.innerHTML = data.choices[0].message.content;
            ChatBotResponse.classList.remove("new");
          })
          .catch((error) => {
            const ChatBotResponse = document.querySelector(".response .new");
            ChatBotResponse.innerHTML = "Oops! An error occurred. Please try again";
            ChatBotResponse.classList.remove("new");
          });
      }, 100);
    }
  }

  document.querySelector(".side-bar button").addEventListener("click", startNewChat);

  function startNewChat() {
      // Save message history to side bar
      saveMessageHistoryToSideBar();
      // Clear the message history
      messageBox.innerHTML = `
        <div class="chat response">
          <img src="img/chatbot.jpg">
          <span>Hello there! <br> How can I help you today.</span>
        </div>
      `;
  }

  function saveMessageHistoryToSideBar() {
    const messages = document.querySelectorAll(".message-box .chat");

    // İkinci input'u başlık olarak kullanarak buton oluştur
    const messageTitle = messages[1].querySelector("span").textContent;
    const button = document.createElement("button");
    
    const maxLength = 35; // Maksimum başlık uzunluğu
    button.textContent = truncate(messageTitle, maxLength); // Başlık 20 karakterden uzunsa kes
    button.style.textAlign = "left"; // Başlık metnini soldan başlat
    history.prepend(button); // Listeyi tersine çevirip ekleyin

    button.addEventListener("click", function() {
      // Geçmiş sohbet içeriğini göster
      const historySection = document.createElement("section");
      historySection.classList.add("history-content");
      messages.forEach(message => {
        historySection.appendChild(message.cloneNode(true));
      });
      // Eğer varsa önceki geçmiş içeriğini temizle
      const existingHistoryContent = document.querySelector(".history-content");
      if (existingHistoryContent) {
        existingHistoryContent.remove();
      }
      // Geçmiş sohbet içeriğini ekleyin
      messageBox.appendChild(historySection);
    });
  }

  // Verilen metni belirli bir uzunlukta kesen fonksiyon
  function truncate(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) ;
    } else {
      return text;
    }
  }
});
