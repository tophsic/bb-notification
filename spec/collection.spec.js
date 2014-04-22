describe("Collection", function () {

  before(function () {
    this.Collection = require('notification/collections/notification');
  });

  after(function () {
  });

  it("instantiate", function () {
    var collection = new this.Collection(null, {
        url: 'notification'
    });
    expect(collection).to.be.an("object");
  });

  it("instantiate with an error", function () {
    var Collection = this.Collection;
    expect(function() {new Collection();}).to.throw(Error);
  });

  it("has default values", function() {
    var collection = new this.Collection(null, {
        url: 'notification'
    });

    expect(collection).to.be.ok;
    expect(collection).to.have.length(0);
  });

  it("fetch notification", function() {
    var server = sinon.fakeServer.create();

    var collection = new this.Collection(null, {
        url: 'notification'
    });

    collection.fetch();

    server.requests[0].respond(
        200,
        { "Content-Type": "application/json" },
        JSON.stringify([
          {
            link: "notification/1",
            status: "pending",
            progress: 0,
            message: "Notification 1"
          },
          {
            link: "notification/2",
            status: "pending",
            progress: 0,
            message: "Notification 2"
          },
          {
            link: "notification/3",
            status: "pending",
            progress: 0,
            message: "Notification 3"
          }
        ])
    );

    expect(collection).to.be.ok;
    expect(collection).to.have.length(3);

    server.restore();
  });
});
