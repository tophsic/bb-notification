describe("Notification view", function () {
  it("instanciate", function () {
    var View = require('notification/views/notification');
    expect(new View()).to.be.an("object");
  });
});
