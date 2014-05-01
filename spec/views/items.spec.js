var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');



describe("Items view", function() {



  before(function() {
    this.$fixture = $("<div id='notification-items' class='notifications'></div>");
    this.View = require('notification/views/items');
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

      expect(this.view).to.be.an("object");

      view.remove();
    });

    it("with an error", function() {
      var fn = function() {
        var view = new this.View({
          el: this.$fixture
        });
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
      var $items = $("#notification-items");
      expect($items.css('display')).to.be.equal('none');

      var $items = $("#notification-items ul");
      expect($items.hasClass("notification-items")).to.be.true;
    });

    it("listen collection sync", sinon.test(function() {
      this.stub(this.view);

      this.view.collection.trigger('sync', this.view.collection, [
        {
          link: "notification/1",
          message: "Notification 1"
        }
      ]);

      expect(this.view.onCollectionSync).to.have.been.called;
    }));

    it("render items", function() {
      this.view.collection.trigger('sync', this.view.collection, [
        {
          link: "notification/1",
          message: "Notification 1"
        },
        {
          link: "notification/2",
          message: "Notification 2"
        }
      ]);

      var $items = $("#notification-items ul li");

      expect($items).to.have.length(2);
      var message = $items.first().find('.message');
      expect(message).to.be.ok;
      expect(message.text()).to.be.equal('Notification 1');

      this.view.collection.trigger('sync', this.view.collection, [
        {
          link: "notification/3",
          message: "Notification 3"
        }
      ]);

      $items = $("#notification-items ul li");

      expect($items).to.have.length(1);
      message = $items.first().find('.message');
      expect(message).to.be.ok;
      expect(message.text()).to.be.equal('Notification 3');


      $items = $("#notification-items");
      $items.css('display', 'block');
      this.view.collection.trigger('sync', this.view.collection, [
      ]);

      expect($items.css('display')).to.be.equal('none');

      $items = $("#notification-items ul li");
      expect($items).to.have.length(0);

    });
  });



});
