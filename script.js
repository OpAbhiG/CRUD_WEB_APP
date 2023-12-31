document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginEmail = document.getElementById("login-email");
    const loginPassword = document.getElementById("login-password");
    const loginError = document.getElementById("login-error");
    const loadingOverlay = document.getElementById("loading-overlay");

    // Function to show the loading overlay
    function showLoadingOverlay() {
        loadingOverlay.style.display = "flex";
    }

    // Function to hide the loading overlay
    function hideLoadingOverlay() {
        loadingOverlay.style.display = "none";
    }

    const registerForm = document.getElementById("register-form");
    const registerName = document.getElementById("register-name");
    const registerEmail = document.getElementById("register-email");
    const registerPassword = document.getElementById("register-password");
    const registerGender = document.getElementById("register-gender");
    const registerError = document.getElementById("register-error");

    let registeredUsers = [];

    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = loginEmail.value;
        const password = loginPassword.value;

        // Show loading overlay
        showLoadingOverlay();

        // Simulate a login delay (you can replace this with actual login logic)
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Check if there is a matching user
        const user = registeredUsers.find((u) => u.email === email && u.password === password);

        // Hide loading overlay
        hideLoadingOverlay();

        if (!user) {
            loginError.textContent = "Invalid email or password.";
        } else {
            loginError.textContent = "Login successful!";
            // Redirect to create.html (change the URL as needed)
            window.location.href = "create.html";
        }
    });

    registerForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const name = registerName.value;
        const email = registerEmail.value;
        const password = registerPassword.value;
        const gender = registerGender.value;

        // Check if the email is already registered
        const existingUser = registeredUsers.find((u) => u.email === email);

        if (existingUser) {
            registerError.textContent = "Email already registered.";
        } else {
            // Register the new user
            const newUser = {
                name: name,
                email: email,
                password: password,
                gender: gender,
            };

            registeredUsers.push(newUser);
            registerError.textContent = "Registration successful!";
        }
    });
});
