let chai = require("chai");
let chaiHttp = require("chai-http");
let expect = chai.expect;
chai.use(chaiHttp);

describe("Test Koa EndPoing", () => {
  it("Should return status as 200 for /", function(done) {
    chai
      .request("http://localhost:3100")
      .get("/")
      .then(function(res) {
        expect(res).to.have.status(200);
        done();
      })
      .catch(function(err) {
        throw err;
      });
  });
  it("Should return status as 404 for /about", function(done) {
    chai
      .request("http://localhost:3100")
      .get("/about")
      .then(function(res) {
        expect(res).to.have.status(404);
        done();
      })
      .catch(function(err) {
        throw err;
      });
  });
});
