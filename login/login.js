document.addEventListener('DOMContentLoaded', function() {
    const Eyecons = document.querySelectorAll('.Eyecon');
    const PasswordInputs = document.querySelectorAll('input[type="password"]');

    Eyecons.forEach(function(eyecon, index) {
        eyecon.addEventListener('click', function() {
            if (PasswordInputs[index].type === 'password') {
                PasswordInputs[index].type = 'text';
                eyecon.classList.remove('fa-eye-slash');
                eyecon.classList.add('fa-eye');
            } else {
                PasswordInputs[index].type = 'password';
                eyecon.classList.remove('fa-eye');
                eyecon.classList.add('fa-eye-slash');
            }
        });
    });
});
