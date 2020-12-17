let submitButton = document.getElementById('register');

submitButton.onclick = function(event) {
    var username = document.getElementById('username').value;
    var firstchar = "";
    var password = document.getElementById('password').value;
    var confirmpassword = document.getElementById('passwordconfirm').value;
    if (username.length != 0) {
        firstchar = username.charAt(0);
    }
    if (username.length < 3 || firstchar.toLowerCase() == firstchar.toUpperCase()) {
      alert("USERNAME INVALID:\nName must be filled out\nName must begin with a character\nName must be 3 or more characters long");
      document.getElementById('username').focus();
      event.preventDefault();
    }
    if (password.length < 8 || !passwordCheck(password)) {
        alert("PASSWORD INVALID:\nPassword must be filled out\nPassword must have more than 8 characters\nPassword must contain upper case letter, special character, and number");
        document.getElementById('password').focus();
        event.preventDefault();
    }
    if (password != confirmpassword) {
        alert("CONFIRM PASSWORD INVALID:\nPasswords must match");
        document.getElementById('passwordconfirm').focus();
        event.preventDefault();
    }
}

function passwordCheck(pass) {
    var x = false;
    for (var i = 0; i < pass.length; i++) {
        if (/^[A-Z]+$/.test(pass.charAt(i))) {
            //alert("PASS CAPITAL");
            for (var n = 0; n < pass.length; n++) {
                if (/^[0-9]+$/.test(pass.charAt(n))) {
                   //alert("PASS NUMBER");
                    x = true;
                }
            }
        }
    }
    if (!/[/*-+!@#$^&*]/g.test(pass)) {
        //alert("NO SPECIAL");
        x = false;
    }
    return x;
}