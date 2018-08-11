const express = require("express");
const app = express();
const port = 3000;

const JSONdata = require("./data.json");
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

async function onGetRoot(request, response) {
    response.render("index");
}

async function onShowRespositories(request, response) {
    const data = JSONdata.users;
    response.render("repositoriesPage", { data });
}

app.get("/", onGetRoot);
app.get("/repositories", onShowRespositories);

async function startServer() {
    app.listen(port);
    console.log("Server is up and running.\nOpen http://localhost:3000 to start");
}

startServer();