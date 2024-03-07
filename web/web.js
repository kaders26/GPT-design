var typed = new Typed(".auto-text", {
    strings: ["virtual assistant", "rights advocate", "law expert"],
    typeSpeed: 90,
    backSpeed: 40,
    loop: true
});
document.addEventListener('DOMContentLoaded', function(event) {
    var chatMessages = document.querySelectorAll('.exp-chat span');
  
    chatMessages.forEach(function(message) {
        // Mesaj içeriğini al
        var text = message.innerHTML;
        message.innerHTML = '';

        // Mesajın daha önce gösterilip gösterilmediğini kontrol etmek için bir sınıf tanımla
        var animationClass = 'shown';

        // Eğer mesaj daha önce gösterilmediyse animasyonu başlat
        if (!message.classList.contains(animationClass)) {
            // Yazıyı yazdıran fonksiyon
            function typeWriter(text) {
                var fullText = '';
                var i = 0;
                var interval = setInterval(function() {
                    fullText += text.charAt(i);
                    message.innerHTML = fullText;
                    i++;
                    if (i >= text.length) {
                        clearInterval(interval);
                        // Animasyonu kaldır ve mesajın daha önce gösterildiğini işaretle
                        message.classList.add(animationClass);
                    }
                }, 30);
            }

            typeWriter(text);
        }
    });
});
window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY;
    var page1 = document.querySelector('.page-1');
    var page2 = document.querySelector('.page-2');
    var page1Height = page1.clientHeight;
    
    if (scrollPosition > page1Height) {
        page2.classList.add('active');
    } else {
        page2.classList.remove('active');
    }
});


$(document).ready(function() {
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) { // Eğer sayfa scroll edilirse
            $('#navbar').addClass('scrolled');
        } else {
            $('#navbar').removeClass('scrolled');
        }
    });
});

  
  