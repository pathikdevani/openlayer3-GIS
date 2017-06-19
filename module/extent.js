
var Extent = function (e) {

    var $this = this;
    this.transform = function (extent) {
        return ol.proj.transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
    };

    this.index = 0;
    this.location = [
        [68.17665, 7.96553, 97.40256, 35.49401],//India
        [-73.41544, -55.25, -53.62835, -21.83231],//Argentina
        [2.6917, 4.24059, 14.57718, 13.86592],//Nigeria
        [11.02737, 55.36174, 23.90338, 69.10625]//Sweden
    ];


    var layer = new ol.layer.Tile({
        extent: $this.transform(this.location[$this.index]),
        source: new ol.source.TileJSON({
            url: 'https://api.tiles.mapbox.com/v3/mapbox.world-black.json?secure',
            crossOrigin: 'anonymous'
        })
    });


    Layer.call(this, layer);
};
Extent.prototype = Object.create(Layer.prototype);
Extent.prototype.constructor = Extent;

Extent.prototype.next = function () {
    if (this.index >= this.location.length - 1) {
        this.index = 0;
    } else {
        this.index++;
    }
    this.layer.setExtent(this.transform(this.location[this.index]));
};


Extent.prototype.prev = function () {
    if (this.index <= 0) {
        this.index = this.location.length - 1;
    } else {
        this.index--;
    }
    this.layer.setExtent(this.transform(this.location[this.index]));
};


