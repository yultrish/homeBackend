window.addEventListener('load', () => {

    
    const register = document.querySelector("button.register");
    register.addEventListener('click', async (e) => {
        e.preventDefault();
    
        // checks for the input values
        const name = document.querySelector('input#name').value;
        const email = document.querySelector('input#email').value;
        const password = document.querySelector('input#password').value;
        const password_confirm = document.querySelector('input#password_confirm').value;

        // error message
        const error = document.querySelector('form .error');
        const message = document.querySelector('form .error .error-message');

        //checks for empty input
        if (email == '' || email == null || password == '' || password == null || password_confirm == '' || password_confirm == null || name == '' || name == null) {
            error.style.display = 'block';
            message.textContent = 'Please fill all fields';

            // remove error message after 3 seconds
            setTimeout(() => {
                error.style.display = 'none';
            }, 3000);
            return;
        } else {
            //make the fetch request
            const result = await fetch('http://localhost:7090/api/user', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password
                })
            })

            //check http status
            if (result.status != 201) {
                const response = await result.json();

                error.style.display = 'block';
                message.textContent = response.message;

                // remove error message after 3 seconds
                setTimeout(() => {
                    error.style.display = 'none';
                }, 3000);

                return;
            }
            if (result.status == 201) {
                //getting user back from server
                const response = await result.json();
                console.log(response);

                // redirect to login page
                window.location.href = './index.html';
            }

        }
    });

});

// Password visibility
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");

togglePassword.addEventListener("click", function () {
    const type = password.getAttribute('type') === "password" ? "text" : "password";
    password.setAttribute("type", type);
    this.classList.toggle("bi-eye")
});

// confirm password visibility
const togglePasswordConfirm = document.querySelector("#togglePasswordConfirm");
const password_confirm = document.querySelector("#password_confirm");

togglePasswordConfirm.addEventListener("click", function () {
    const type = password_confirm.getAttribute('type') === "password" ? "text" : "password";
    password_confirm.setAttribute("type", type);
    this.classList.toggle("bi-eye")
});