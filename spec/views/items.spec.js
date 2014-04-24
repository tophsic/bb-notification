var $ = require('jquery');

describe("Items view", function () {
  before(function () {
    this.$fixture = $("<div id='notification-items'></div>");
  });

  beforeEach(function () {
    this.$fixture.empty().appendTo($("#fixtures"));

    var View = require('notification/views/items');
    this.view = new View({
      el: this.$fixture
    });
  });

  afterEach(function () {
    this.view.remove();
  });

  after(function () {
    $("#fixtures").empty();
  });

  it("instanciate", function () {
    expect(this.view).to.be.an("object");
  });

  it("can be rendered", function () {
    var $items = $("#notification-items ul");

    expect($items.hasClass("notification-items")).to.be.true;
  });
});
