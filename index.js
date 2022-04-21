import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (paramsIsInvalid(username, avatar)) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    users.push(req.body);
    res.status(201).send("OK");
  }
});

app.get("/tweets", (req, res) => {
  // pegar apenas os 10 ultimos tweets
  const newTweets = [...tweets.reverse()];
  res.status(201).send(newTweets.slice(0, 10));
});

app.post("/tweets", (req, res) => {
  // depois fazer paginacao
  const { tweet } = req.body;
  const { user } = req.headers;
  console.log(user, tweet);
  if (paramsIsInvalid(tweet)) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    const avatar = users.find((u) => u.username === user).avatar;
    tweets.push({ username: user, tweet, avatar });
    res.status(201).send("OK");
  }
});

function paramsIsInvalid(username = null, avatar = null, tweet = null) {
  if (username === undefined || username === "") return true;
  if (avatar === undefined || avatar === "") return true;
  if (tweet === undefined || tweet === "") return true;
  return false;
}

app.listen(5000, () => {
  console.log("Servidor iniciado em http://localhost:5000");
});
