describe("Notification", function() {



  before(function() {
    this.$fixture = $("<div id='notification'></div>");
    this.Notification = require('notification');
  });

  beforeEach(function() {
    this.$fixture.empty().appendTo($("#fixtures"));
  });

  after(function() {
    $("#fixtures").empty();
  });



  describe("instantiate", function() {
    it("normally", function() {
      var notification = new this.Notification({
          notification: { el: "#notification" },
          url: "notification"
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

  it("listen", sinon.test(function() {
      var clock = sinon.useFakeTimers(),
          notification = new this.Notification({
            notification: { el: "#notification" },
            url: 'notification'
          })
          ;

      this.spy(notification.collection, 'fetch');

      notification.listen();

      expect(notification.collection.fetch.callCount).to.be.equal(1);

      clock.tick(10001);
      expect(notification.collection.fetch.callCount).to.be.equal(2);

      clock.tick(50001);
      expect(notification.collection.fetch.callCount).to.be.equal(7);
  }));
});
