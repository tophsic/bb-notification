var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');

describe("Items view", function () {
  before(function () {
    this.$fixture = $("<div id='notification-items'></div>");
    this.View = require('notification/views/items');
  });

  beforeEach(function () {
    this.$fixture.empty().appendTo($("#fixtures"));
  });

  afterEach(function () {
  });

  after(function () {
    $("#fixtures").empty();
  });

  it("instanciate", function () {
    var view = new this.View({
      el: this.$fixture,
      collection: Backbone.Events
    });

    expect(this.view).to.be.an("object");

    view.remove();
  });

  it("instanciate wit an error", function () {
    expect(function() {
      var view = new this.View({
        el: this.$fixture
      });
    }).to.throw(Error);
  });

  it("render", function () {
    var view = new this.View({
      el: this.$fixture,
      collection: Backbone.Events
    });
    var $items = $("#notification-items ul");

    expect($items.hasClass("notification-items")).to.be.true;

    view.remove();
  });

  it("listen collection sync", sinon.test(function () {
    var collection = Backbone.Events;

    var view = new this.View({
      el: this.$fixture,
      collection: collection
    });

    this.stub(view);

    collection.trigger('sync');

    expect(view.onCollectionSync).to.have.been.called;

    view.remove();
  }));
});
