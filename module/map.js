
var Map = function (options) {
    options = $.extend({}, {
        view: new ol.View({
            center: [0, 0],
            zoom: 2
        }),
        target: "map"
    }, options);
    options.layers = [];


    this.layers = {};
    this.map = new ol.Map(options);
};

Map.prototype = {
    panTo: function (location) {
        var view = this.map.getView();
        view.animate({
            duration: 1500,
            center: ol.proj.fromLonLat(location)
        })
    },

    zoomIn: function (unit) {
        var view = this.map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom + (unit || 1));
    },

    zoomOut: function (unit) {
        var view = this.map.getView();
        var zoom = view.getZoom();
        view.setZoom(zoom - (unit || 1));
    },


    addLayer: function (name, layer) {
        this.layers[name] = layer;
        this.map.addLayer(this.layers[name].getLayer());
        return layer;
    },

    getLayer: function (name) {
        return this.layers[name];
    }
};