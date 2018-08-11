const express = require("express");
const app = express();
const port = 3000;

const JSONdata = require("./data.json");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

async function onGetRoot(request, response) {
    response.render("index");
}

function userHasAvatar(userAvatar) {
    return userAvatar;
}

function assignDefaultAvatarTo(users) {
    for (let i = 0; i < users.length; i++) {
        if (!userHasAvatar(users[i].avatar_url)) {
            users[i].avatar_url = "./default-avatar.png";
        }
    }
    return users;
}

async function onShowRespositories(request, response) {
    const usersData = JSONdata.users;
    assignDefaultAvatarTo(usersData);
    response.render("repositoriesPage", { usersData });
}

app.get("/", onGetRoot);
app.get("/repositories", onShowRespositories);

async function startServer() {
    app.listen(port);
    console.log("Server is up and running.\nOpen http://localhost:3000 to start");
}

startServer();