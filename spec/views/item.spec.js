var $ = require('jquery');

describe("Item view", function() {
  before(function() {
    this.$fixture = $("<div id='notification-item'></div>");
  });

  beforeEach(function() {
    this.$fixture.empty().appendTo($("#fixtures"));

    var View = require('notification/views/item');
    var Model = require('notification/models/notification');
    this.view = new View({
      el: this.$fixture,
      model: new Model()
    });
  });

  afterEach(function() {
    this.view.model.destroy();
  });

  after(function() {
    $("#fixtures").empty();
  });

  it("instantiate", function() {
    expect(this.view).to.be.an("object");
  });

  describe("render", function() {
    it("an empty notification", function() {
      var $message = $("#notification-item .message");

      expect($message.text()).to.equal("This is an empty notification");
    });

    it("a normal notification", function(done) {
      this.view.model.once("change", function() {
        var $message = $("#notification-item .message");

        expect($message.text()).to.equal("Notification 1");

        done();
      });

      this.view.model.set({
        link: "notification/1",
        message: "Notification 1"
      });
    });
  });
});
