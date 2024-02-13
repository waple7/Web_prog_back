document.addEventListener('DOMContentLoaded', function () {
    const registrationButton = document.getElementById('registrationButton');

    if (registrationButton) {
        registrationButton.addEventListener('click', showRegistrationForm);
    } else {
        console.error('Элемент не найден.');
    }

    function showRegistrationForm() {
        Swal.fire({ // вызов окна
            title: 'Регистрация',
            html:
                '<label for="swal_username">Имя пользователя:</label>' +
                '<input id="swal_username" class="swal2-input" required>' +
                '<label for="swal_email">Электронная почта:</label>' +
                '<input id="swal_email" class="swal2-input" type="email" required>' +
                '<label for="swal_phone">Номер телефона:</label>' +
                '<input id="swal_phone" class="swal2-input" type="tel" required>' +
                '<label for="swal_password">Пароль:</label>' +
                '<input id="swal_password" class="swal2-input" type="password" required>'+
                '<label for="swal_confirm_password">Подтвердите пароль:</label>' +
                '<input id="swal_confirm_password" class="swal2-input" type="password" required>',
            focusConfirm: false,

            preConfirm: () => {  // выполняется перед закрытием окна
                const swalUsername = Swal.getPopup().querySelector('#swal_username').value; //возвращает DOM-элемент, представляющий всплывающее окно SweetAlert2.
                const swalEmail = Swal.getPopup().querySelector('#swal_email').value;
                const swalPhone = Swal.getPopup().querySelector('#swal_phone').value;
                const swalPassword = Swal.getPopup().querySelector('#swal_password').value;
                const swalConfirmPassword = Swal.getPopup().querySelector('#swal_confirm_password').value;


                if (swalUsername === "" || swalUsername.length < 4) {
                    Swal.showValidationMessage('Введите корректное имя пользователя');
                    return false;
                }

                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(swalEmail)) {
                    Swal.showValidationMessage('Введите корректный адрес электронной почты');
                    return false;
                }

                if (!swalPhone.match(/^\+?\d{11}$/)) {
                    Swal.showValidationMessage('Введите корректный номер телефона (включая код страны)');
                    return false;
                }

                if (swalPassword === "" || swalPassword.length < 4) {
                    Swal.showValidationMessage('Этот пароль недостающей длинны!');
                    return false;
                }
                if (swalPassword !== swalConfirmPassword) {
                    Swal.showValidationMessage('Пароли не совпадают');
                    return false;
                }
                console.log('Имя пользователя:', swalUsername);
                console.log('Электронная почта:', swalEmail);
                console.log('Номер телефона:', swalPhone);
                console.log('Пароль:', swalPassword);
            },
        });
    }
});