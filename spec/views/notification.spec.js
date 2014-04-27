describe("View", function () {
  it("View instanciation", function () {
    var View = require('notification/views/notification');
    expect(new View()).to.be.an("object");
  });
});
