import express, { json } from "express";
import cors from "cors";

// refresh 

const app = express();
app.use(json());
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (paramsIsInvalid(username, avatar)) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else if (avatarIsInvalid(avatar)) {
    res.status(400).send("A URL do avatar não é válida!");
  } else {
    users.push(req.body);
    res.status(201).send("OK");
  }
});

app.get("/tweets", (req, res) => {
  let { page } = req.query;

  if (pageIsInvalid(page)) res.status(400).send("Informe uma página válida!");

  page = parseInt(page);
  const tweetsPerPage = 10;
  const startTweet = (page - 1) * tweetsPerPage;
  const endTweet = page * tweetsPerPage;

  const tweetsToShow = [...tweets].reverse().slice(startTweet, endTweet);
  res.status(201).send(tweetsToShow);
});

app.post("/tweets", (req, res) => {
  const { tweet } = req.body;
  const { user } = req.headers;

  if (paramsIsInvalid(user, tweet)) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    const avatar = users.find((u) => u.username === user).avatar;
    tweets.push({ username: user, tweet, avatar });
    res.status(201).send("OK");
  }
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const tweetsUser = tweets.filter((tweet) => tweet.username === username);
  tweetsUser.length > 0
    ? res.status(200).send(tweetsUser)
    : res.status(400).send("Não foi encontrado tweets desse usuário!");
});

function paramsIsInvalid(...params) {
  return params.some((param) => param === undefined || param === "");
}

function pageIsInvalid(page) {
  return page < 1 || isNaN(parseInt(page)) || page === undefined;
}

function avatarIsInvalid(urlAvatar) {
  let re = new RegExp("(http|https)://");
  return !re.test(urlAvatar);
}

app.listen(5000, () => {
  console.log("Servidor iniciado em http://localhost:5000");
});
