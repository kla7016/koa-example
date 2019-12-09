// const Koa = require("koa");
// const KoaRouter = require("koa-router");
// const json = require("koa-json");
import Koa from "koa";
import KoaRouter from "koa-router";
import KoaJson from "koa-json";
import "@babel/polyfill";
import bodyParser from "koa-bodyparser";

const port = 3100;
const app = new Koa();
const router = new KoaRouter();

// Use as middleware
app.use(bodyParser());
app.use(KoaJson());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 400;
    ctx.body = `Error Body: ${err.message}`;
    console.log("Error message", err.message);
  }
});

router.get("/", ctx => (ctx.body = { text: "korkla" }));

// http://localhost:3100/test?korkla=10
router.get("/test", ctx => {
  //   console.log(ctx.request.query);
  ctx.body = { text: "Korkla Test" };
  //   console.log(ctx.response);
});

router.get("/withouthell", async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.body = { time: `Start at ${start}`, totaltime: `Total: ${ms} ms` };
});

var data = [
  { id: 1, name: "John" },
  { id: 2, name: "Alis" }
];
router.get("/data", read);
router.post("/data", add);
router.put("/data", update);
router.delete("/data", deleteData);

async function read(ctx) {
  ctx.body = data;
}

async function add(ctx) {
  var uin = ctx.request.body;
  data.push(uin);
  ctx.body = "Data Added";
}

async function update(ctx) {
  let uin = ctx.request.body;
  const index = data.findIndex(e => e.id === uin.id);
  let message;
  if (index === -1) {
    data.push(uin);
    message = "Data Added";
  } else {
    data[index] = uin;
    message = "Data Updated";
  }
  ctx.body = message;
}

async function deleteData(ctx) {
  let uin = ctx.request.body;
  const index = data.findIndex(e => e.id === uin.id);
  let message;
  if (index === -1) {
    ctx.status = 404;
    message = "Data Not Found";
  } else {
    delete data[index];
    message = "Data Delete";
  }
  ctx.body = message;
}

app.use(router.routes()).use(router.allowedMethods());
app.listen(port, () => console.log("Server Running"));
