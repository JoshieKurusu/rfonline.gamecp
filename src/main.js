// GET THE SECTION CLASS
const section = document.querySelector(".section");

document.addEventListener("DOMContentLoaded", () => {
    // CHANGE THE STYLE WHEN ITS IN REGISTER PAGE
    function registerPageCSS() {
        // CORRECT PATHNAME IS /rfonline.gamecp/register.html AND THE STATIC IS /register.html
        if (window.location.pathname === "/rfonline.gamecp/register.html" || window.location.pathname === "/register.html") {
            section.classList.add("registration-page");
        }
    }
    registerPageCSS();

    // GET ALL THE INPUT ELEMENT
    const inputElements = document.querySelectorAll(".form-control:not(.email)");

    // REMOVE ANY CHARACTERS THAT ARE NOT ALPHANUMERIC FOR ALL THE INPUT ELEMENT
    inputElements.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
            inputElement.value = inputElement.value.replace(/[^a-zA-Z0-9]/g, "");
        });
    });

    // GET ALL THE PIN INPUT ELEMENT
    const pinInputElements = document.querySelectorAll(".pin");

    // TRIM THE PIN NOT TO EXCEED TO 7 DIGITS AND REMOVE ANY NON-DIGITAL CHARACTERS
    pinInputElements.forEach((pinInputElement) => {
        pinInputElement.addEventListener("input", () => {
            pinInputElement.value = pinInputElement.value.replace(/\D/g, "").slice(0, 6);
        });
    });

    // GET ALL THE EMAIL INPUT ELEMENT
    const emailInputElements = document.querySelectorAll(".email");

    // ONLY ALLOW THE ALPHANUMERIC AND ONE (1) "@"
    emailInputElements.forEach((emailInputElement) => {
        emailInputElement.addEventListener("input", () => {
            let inputValue = emailInputElement.value.replace(/[^a-zA-Z0-9@]/g, "");

            const inputParts = inputValue.split("@");
            if (inputParts.length > 2) {
                inputValue = inputParts[0] + "@" + inputParts.slice(1).join("").replace(/@/g, "");
            }
            emailInputElement.value = inputValue;
        });
    });
});

// GET USERNAME AND PASSWORD INPUT ELEMENT AND ALSO THE LOGIN BUTTON
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const loginBtn = document.querySelector(".login-btn");

// GET THE USERNAME AND PASSWORD LABEL
const usernameLabel = document.querySelector(".username-label");
const passwordLabel = document.querySelector(".password-label");

// GET THE TOAST CONTAINER
const toastContainer = document.querySelector(".toast-container");

// ADD A CUSTOM ACTIVE CSS WHEN THERES A VALUE IN INPUT ELEMENT
function handleLoginLabel(input, label) {
    if (input.value) {
        label.classList.add("active-form-label");
    } else {
        label.classList.remove("active-form-label");
    }
}
usernameInput.addEventListener("input", () => handleLoginLabel(usernameInput, usernameLabel));
passwordInput.addEventListener("input", () => handleLoginLabel(passwordInput, passwordLabel));

loginBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // HANDLING SUBMISSION MANUALLY TO MAKE SURE NOT SKIPPING VALIDATION
    if (!usernameInput.checkValidity() || !passwordInput.checkValidity()) {
        usernameInput.reportValidity();
        passwordInput.reportValidity();
        return;
    } else {
        if (usernameInput.value === "admin" && passwordInput.value === "admin") {
            console.log("Login Successfully!");

            handleLoginLabel(usernameInput, usernameLabel);
            handleLoginLabel(passwordInput, passwordLabel);

            handleAuthNotice()
            setTimeout(() => {
                handleLoginSuccess();
            }, 800);
        } else {
            console.log("Wrong username or password!");

            handleLoginLabel(usernameInput, usernameLabel);
            handleLoginLabel(passwordInput, passwordLabel);

            handleAuthNotice()
            setTimeout(() => {
                handleLoginFailed();
            }, 800);
        }
    }
});

// HANDLE AUTHENTICATION NOTICE TOAST
function handleAuthNotice() {
    const toastAuthNotice = document.createElement("div");

    toastAuthNotice.className = "toast authenticate-toast";
    toastAuthNotice.setAttribute("role", "alert");
    toastAuthNotice.setAttribute("aria-live", "assertive");
    toastAuthNotice.setAttribute("aria-atomic", "true");

    toastAuthNotice.innerHTML = `
        <!-- SVG -->
        <div class="toast-header">
            <svg viewBox="0 0 448 512">
                <path fill="currentColor" d="M400 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V80c0-26.51-21.49-48-48-48zm-176 86c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z" />
            </svg>
        </div>
        <!-- TEXT -->
        <div class="toast-body">
            <h6>Authenticating</h6>
            <p>Please wait...</p>
        </div>
        <!-- CLOSE BUTTON -->
        <button type="button" data-bs-dismiss="toast" aria-label="Close" class="close-toast-btn btn">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="htpp://www.w3.org/2000" viewBox="0 0 352 512">
                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
        </button>
    `;
    toastContainer.appendChild(toastAuthNotice);

    new bootstrap.Toast(toastAuthNotice).show();

    // REMOVE FROM THE DOM AFTER IT HIDES
    toastAuthNotice.addEventListener("hidden.bs.toast", () => {
        toastAuthNotice.remove();
    });
}

// HANDLE LOGIN FAILED TOAST
function handleLoginFailed() {
    const toastLoginFailed = document.createElement("div");

    toastLoginFailed.className = "toast failed-toast";
    toastLoginFailed.setAttribute("role", "alert");
    toastLoginFailed.setAttribute("aria-live", "assertive");
    toastLoginFailed.setAttribute("aria-atomic", "true");
    toastLoginFailed.setAttribute("data-bs-delay", "4200");

    toastLoginFailed.innerHTML = `
        <!-- SVG -->
        <div class="toast-header">
            <svg viewBox="0 0 512 512">
                <path fill="currentColor" d="M497.9 150.5c9 9 14.1 21.2 14.1 33.9v143.1c0 12.7-5.1 24.9-14.1 33.9L361.5 497.9c-9 9-21.2 14.1-33.9 14.1H184.5c-12.7 0-24.9-5.1-33.9-14.1L14.1 361.5c-9-9-14.1-21.2-14.1-33.9V184.5c0-12.7 5.1-24.9 14.1-33.9L150.5 14.1c9-9 21.2-14.1 33.9-14.1h143.1c12.7 0 24.9 5.1 33.9 14.1l136.5 136.4zM377.6 338c4.7-4.7 4.7-12.3 0-17l-65-65 65.1-65.1c4.7-4.7 4.7-12.3 0-17L338 134.4c-4.7-4.7-12.3-4.7-17 0l-65 65-65.1-65.1c-4.7-4.7-12.3-4.7-17 0L134.4 174c-4.7 4.7-4.7 12.3 0 17l65.1 65.1-65.1 65.1c-4.7 4.7-4.7 12.3 0 17l39.6 39.6c4.7 4.7 12.3 4.7 17 0l65.1-65.1 65.1 65.1c4.7 4.7 12.3 4.7 17 0l39.4-39.8z" />
            </svg>
        </div>
        <!-- TEXT -->
        <div class="toast-body">
            <h6>User not found!</h6>
            <p>Invalid Username or Password. Please try again.</p>
        </div>
        <!-- CLOSE BUTTON -->
        <button type="button" data-bs-dismiss="toast" aria-label="Close" class="close-toast-btn btn">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="htpp://www.w3.org/2000" viewBox="0 0 352 512">
                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
        </button>
    `;
    toastContainer.appendChild(toastLoginFailed);

    new bootstrap.Toast(toastLoginFailed).show();

    // REMOVE FROM THE DOM AFTER IT HIDES
    toastLoginFailed.addEventListener("hidden.bs.toast", () => {
        toastLoginFailed.remove();
    });
}

// HANDLE LOGIN SUCCESSFUL TOAST
function handleLoginSuccess() {
    const toastLoginFailed = document.createElement("div");

    toastLoginFailed.className = "toast success-toast";
    toastLoginFailed.setAttribute("role", "alert");
    toastLoginFailed.setAttribute("aria-live", "assertive");
    toastLoginFailed.setAttribute("aria-atomic", "true");
    toastLoginFailed.setAttribute("data-bs-delay", "4200");

    toastLoginFailed.innerHTML = `
        <!-- SVG -->
        <div class="toast-header">
            <svg viewBox="0 0 512 512">
                <path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.29-22.628 0L216 308.118l-70.059-70.059c-6.249-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z" />
            </svg>
        </div>
        <!-- TEXT -->
        <div class="toast-body">
            <h6>Aunthenticated!</h6>
            <p>Welcome!</p>
        </div>
        <!-- CLOSE BUTTON -->
        <button type="button" data-bs-dismiss="toast" aria-label="Close" class="close-toast-btn btn">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times" role="img" xmlns="htpp://www.w3.org/2000" viewBox="0 0 352 512">
                <path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
            </svg>
        </button>
    `;
    toastContainer.appendChild(toastLoginFailed);

    new bootstrap.Toast(toastLoginFailed).show();

    // REMOVE FROM THE DOM AFTER IT HIDES
    toastLoginFailed.addEventListener("hidden.bs.toast", () => {
        toastLoginFailed.remove();
    });
}