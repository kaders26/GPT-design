var typed = new Typed(".auto-text", {
    strings: ["virtual assistant", "rights advocate", "law expert"],
    typeSpeed: 90,
    backSpeed: 40,
    loop: true
});
document.addEventListener('DOMContentLoaded', function(event) {
    var chatMessages = document.querySelectorAll('.exp-chat span');
  
    chatMessages.forEach(function(message) {
        var text = message.innerHTML;
        message.innerHTML = '';
  
        function typeWriter(text) {
            var fullText = '';
            var i = 0;
            var interval = setInterval(function() {
                fullText += text.charAt(i);
                message.innerHTML = fullText;
                i++;
                if (i >= text.length) {
                    clearInterval(interval);
                    message.style.animation = 'none';
                }
            }, 30); 
        }
  
        typeWriter(text);
    });
});

// Sayfa-2'nin scroll olayını dinleyerek sınıf eklemesi
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var page2 = document.querySelector('.page-2');

    if (scrollPosition > 0) {
        page2.classList.add('scrolled');
    } else {
        page2.classList.remove('scrolled');
    }
});

// Sayfa-1'in scroll olayını dinlemeden sadece sayfa-2'yi kontrol etmek
var page2 = document.querySelector('.page-2');
page2.addEventListener('wheel', function(e) {
    // Yukarı scroll yapılıyorsa scrolled sınıfını ekleyerek yukarı kaydır
    if (e.deltaY < 0) {
        page2.classList.add('scrolled');
    }
});
