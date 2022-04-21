import express, { json } from "express";
import cors from "cors";

const app = express();
app.use(json());
app.use(cors());

let users = [];
let tweets = [];

app.post("/sign-up", (req, res) => {
  if (req.body.username === "" || req.body.avatar === "") {
    res.status(400).send("Todos os campos são obrigatórios!");
    return;
  }

  users.push(req.body);
  res.status(200).send("OK");
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
