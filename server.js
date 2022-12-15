const express = require("express");
const nunjucks = require("nunjucks");

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
const user = [];

// NOTE: 템플릿 엔진을 사용하겠다는 의미
app.set("view engine", "html");

// NOTE: 브라우저가 link나 script 태그를 만나 해당 파일을 요청할 때 경로를 알려줌
app.use(express.static("public"));

// NOTE: express에 내장된 querystring 모듈을 사용해서 body를 파싱하겠다는 의미
app.use(express.urlencoded({ extended: false }));

// NOTE: nunjucks가 사용할 express 객체 지정
nunjucks.configure("views", {
  express: app,
});

app.get("/", (req, res) => {
  const user = app.get("login");
  if (user !== undefined) {
    const nickname = user["nickname"];
    res.render("index", { nickname: `${nickname}님 안녕하세요` });
  } else {
    res.render("index");
  }
});

app.get("/join", (req, res) => {
  res.render("join");
});

app.post("/join", (req, res) => {
  const { id, pw, nickname } = req.body;
  app.set("login", { id, pw, nickname });
  user.push({ id, pw, nickname });
  res.redirect("/welcome");
});

app.get("/welcome", (req, res) => {
  const login = app.get("login");
  app.set("login", undefined);
  res.render("welcome", login);
});

app.get("/login", (req, res) => {
  res.render("login");
});

const isIdPwCorrect = (id, pw) => {
  for (let i = 0; i < user.length; i++) {
    if (user[i]["id"] === id && user[i]["pw"] === pw) {
      app.set("login", { id: user[i]["id"], pw: user[i]["pw"], nickname: user[i]["nickname"] });
      return true;
    }
    return false;
  }
};

app.post("/login", (req, res) => {
  const { id, pw } = req.body;
  if (isIdPwCorrect(id, pw)) {
    res.redirect("/");
  } else {
    res.render("login");
  }
});

app.listen(PORT, () => {
  console.log(`Server Start`);
});
