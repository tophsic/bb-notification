describe("Application", function () {
  it("provides the 'Notification' function", function () {
    expect(Notification).to.be.an("function");
  });

  it("Notification instanciation", function () {
    var notification = new Notification();
    expect(notification).to.be.an("object");
  });
});
