const requestSender = new XMLHttpRequest();

requestSender.onreadystatechange = apiHandler;

function apiHandler(response) {
    if (requestSender.readyState === 4 && requestSender.status === 200) {
        console.log(response.target.response);
    }
}

// requestSender.open("GET", "https://api.github.com/users/Ichinya", true);
requestSender.send();