/*let submitButton = document.getElementById('register');

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
*/
function setFlashMessageFadeOut(flashMessageElement) {
    setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
    }, 4000);
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement('div');
    let innerFlashDiv = document.createElement('div');
    let innerTextNode = document.createTextNode(message);
    innerFlashDiv.appendChild(innerTextNode);
    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.setAttribute('id', 'flash-message');
    innerFlashDiv.setAttribute('class', 'alert alert-success');
    document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

function createCard(postData) {
    return `<div class="card" id="post-${postData.id}">
                <img class="card-image" src="${postData.thumbnail}"" alt="Missing Image">
                <div class="card-body">
                    <p class="card-title">${postData.title}</p>
                    <p class="card-text">${postData.description}</p>
                    <a href="/post/${postData.id}" id="anchor-buttons">Post Details</a>
                </div>
            </div>`;
}

function executeSearch() {
    let searchTerm = document.getElementById('search-bar').value;
    if (!searchTerm) {
        location.replace('/');
        //addFlashFromFrontEnd('empty search term, here are the most recent 8 posts');
        return;
    }
    let mainContent = document.getElementById('posts');
    let searchURL = `/posts/search?search=${searchTerm}`;
    let newMainContentHTML = '';
    fetch(searchURL)
    .then((data) => {
        return data.json();
    })
    .then((data_json) => {
        data_json.results.forEach((row) => {
            newMainContentHTML += createCard(row);
        });
        mainContent.innerHTML = newMainContentHTML;
        if (data_json.message) {
            addFlashFromFrontEnd(data_json.message);
        }
    })
    .catch((err) => console.log(err));
}

let flashElement = document.getElementById('flash-message');
if (flashElement) {
    setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById('search-button');
if (searchButton) {
    searchButton.onclick = executeSearch;
}