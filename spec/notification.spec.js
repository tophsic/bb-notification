describe("Notification", function() {
  before(function() {
    this.Notification = require('notification');
  });

  describe("instantiate", function() {
    it("normally", function() {
      var notification = new this.Notification({
          url: 'notification'
      });
      expect(notification).to.be.an("object");
    });

    it("with an error", function() {
      var Notification = this.Notification,
          fn = function() {
            new Notification();
          }
      expect(fn).to.throw(Error);
    });
  });
});
