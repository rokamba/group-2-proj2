document.getElementById("login").onclick = function () {
    location.href = "/login";
};

document.getElementById("logout").onclick = function () {
    location.href = "/api/users/logout";
};

document.getElementById("new-post").onclick = function () {
    location.href = "/post";
};
