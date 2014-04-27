var $ = require('jquery');
var Backbone = require('backbone');



describe("Notification view", function() {



  before(function() {
    this.$fixture = $("<div id='notification'></div>");
    this.View = require('notification/views/notification');
  });

  beforeEach(function() {
    this.$fixture.empty().appendTo($("#fixtures"));
  });

  after(function() {
    $("#fixtures").empty();
  });



  describe("instantiate", function() {
    it("normally", function() {
      var view = new this.View({
        el: this.$fixture,
        collection: Backbone.Events
      });
      expect(view).to.be.an("object");
    });

    it("with an error", function() {
      var View = this.View;
      var fn = function() {
        var view = new View();
      };
      expect(fn).to.throw(Error);
    });
  });

  describe("render", function() {
    beforeEach(function() {
      this.view = new this.View({
        el: this.$fixture,
        collection: new Backbone.Collection()
      });
    });

    afterEach(function() {
      this.view.remove();
    });

    it("empty list", function() {
      var $items = $("#notification .notification");

      expect($items).to.have.length(1);
      expect($items.hasClass("notify")).to.be.false;
    });

    it("after collection fetch", sinon.test(function() {
      this.stub(this.view);

      this.view.collection.trigger('sync', this.view.collection, [
        {
          link: "notification/1",
          message: "Notification 1"
        }
      ]);

      expect(this.view.render).to.have.been.called;
    }));

    it("list", function() {
      this.view.collection.length = 1;
      this.view.collection.trigger('sync', this.view.collection, []);

      var $items = $("#notification .notification");

      expect($items).to.have.length(1);
      expect($items.hasClass("notify")).to.be.true;
    });

  });


});
