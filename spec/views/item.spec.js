var $ = require('jquery');

describe("Item view", function () {
  before(function () {
    this.$fixture = $("<div id='notification-item'></div>");
  });

  beforeEach(function () {
    this.$fixture.empty().appendTo($("#fixtures"));

    var View = require('notification/views/item');
    var Model = require('notification/models/notification');
    this.view = new View({
      el: this.$fixture,
      model: new Model()
    });
  });

  afterEach(function () {
    this.view.model.destroy();
  });

  after(function () {
    $("#fixtures").empty();
  });

  it("instanciate", function () {
    expect(this.view).to.be.an("object");
  });

  it("can render an empty notification", function () {
    var $message = $(".notification-item .message");

    expect($message.text()).to.equal("This is an empty notification");
  });

  it("can render a normal notification", function(done) {
    this.view.model.once("change", function () {
      var $message = $(".notification-item .message");

      expect($message.text()).to.equal("Notification 1");
      expect($message.hasClass('pending')).to.be.true;

      done();
    });

    this.view.model.set({
      link: "notification/1",
      status: "pending",
      progress: 0,
      message: "Notification 1"
    });
  });
});
