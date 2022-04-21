import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  const { username, avatar } = req.body;

  if (paramsIsInvalid()) {
    res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    users.push(req.body);
    res.status(200).send("OK");
  }

  function paramsIsInvalid() {
    if (username === undefined || username === "") return true;
    if (avatar === undefined || avatar === "") return true;
    if (!avatar.startsWith("http")) return true;
    return false;
  }
});

app.post("/tweets", (req, res) => {
  const { username, tweet } = req.body;
  const user = users.find((user) => user.username === username);
  const avatar = user.avatar;
  tweets.push({ username, tweet, avatar });
});

app.get("/tweets", (req, res) => {
  res.send(tweets);
});

app.listen(5000, () => {
  console.log("Servidor iniciado em http://localhost:5000");
});
