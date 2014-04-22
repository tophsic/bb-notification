describe("Model", function () {
  var Model = require('notification/models/notification');

  it("has default values", function () {
    var model = new Model();

    expect(model).to.be.ok;
    expect(model.get("status")).to.equal("");
    expect(model.get("link")).to.equal("");
    expect(model.get("message")).to.equal("This is an empty notification");
  });
});
