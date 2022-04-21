import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

let users = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
  },
];
let tweet = [
  {
    username: "bobesponja",
    avatar:
      "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info",
    tweet: "eu amo o hub",
  },
];

app.post("/sing-up", (req, res) => {
  const { username, avatar } = req.body;
  users.push({ username, avatar });
  res.send("OK");
});

app.listen(5000);
