document.addEventListener('DOMContentLoaded', () => {
    const passwordInput1 = document.getElementById('password1');
    const passwordInput2 = document.getElementById('password2');
    const togglePassword1 = document.getElementById('togglePassword1');
    const togglePassword2 = document.getElementById('togglePassword2');

    togglePassword1.addEventListener('click', () => {
        const type = passwordInput1.getAttribute('type') === 'password1' ? 'text' : 'password1';
        passwordInput1.setAttribute('type', type);

        togglePassword1.classList.toggle('fa-eye-slash');
    });

    togglePassword2.addEventListener('click', () => {
        const type = passwordInput2.getAttribute('type') === 'password2' ? 'text' : 'password2';
        passwordInput2.setAttribute('type', type);

        togglePassword2.classList.toggle('fa-eye-slash');
    });
});