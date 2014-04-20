describe("Application", function () {
  it("provides the 'Notification' function", function () {
    expect(Notification).to.be.an("function");
  });

  it("Notification instanciation", function () {
    var notification = new Notification({
        url: 'notification'
    });
    expect(notification).to.be.an("object");
  });

  it("Notification instanciation error", function () {
    expect(function() {new Notification({});}).to.throw(Error);
  });
});
