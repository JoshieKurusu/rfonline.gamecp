// Display Text When a Button is Clicked with
function indicator() {
    const blue_indicator = document.querySelector(".info-indicator");
    const red_indicator = document.querySelector(".error-indicator");
    blue_indicator.classList.remove("hidden");
    setTimeout(function() {
        red_indicator.classList.remove("hidden");
        setTimeout(function() {
            blue_indicator.classList.add("hidden");
            red_indicator.classList.add("hidden");
        }, 1000)
    }, 2000);
}

// Hide the Login Card/Form and show Register Card/Form when clicked register btn
const register = document.getElementById("register");
const login = document.getElementById("login");
function register_btn() {
    register.classList.remove("hidden");
    login.classList.add("hidden");
}

// Hide the Login Card/Form and show Recover Password Card/Form when clicked recover password btn
const recovery_password = document.getElementById("recovery_password");
function recovery_pass_btn() {
    recovery_password.classList.remove("hidden");
    login.classList.add("hidden");
}

// Hide the Login Card/Form and show Recovery FireGuard Card/Form when clicked recovery fireguard btn
const recover_fireguard = document.getElementById("recover_fireguard");
function recovery_fireguard_btn() {
    recover_fireguard.classList.remove("hidden");
    login.classList.add("hidden");
}

// Hide the Register, Recover Password, Recovery FireGuard Card/Form and show login Card/Form when clicked
function back_to_login() {
    login.classList.remove("hidden");
    register.classList.add("hidden");
    recovery_password.classList.add("hidden");
    recover_fireguard.classList.add("hidden");
}



