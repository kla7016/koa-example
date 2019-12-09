var koa = require("koa");
var app = new koa();

app.use(first);
app.use(second);
app.use(third);

function* first(next) {
  console.log("I'll be logger first. ");
  yield next;
  console.log("I'll be logger last.");
}

function* second(next) {
  console.log("I'll be logger second. ");
  yield next;
  console.log("I'll be logger fifth.");
}

function* third(next) {
  console.log("I'll be logger third. ");
  yield next;
  console.log("I'll be logger fourth.");
}

app.listen(3000);
