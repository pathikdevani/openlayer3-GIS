


var GeoJson = function () {

    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'https://openlayers.org/en/v4.2.0/examples/data/geojson/countries.geojson',
            format: new ol.format.GeoJSON()
        })
    });
    Layer.call(this, layer);
};


GeoJson.prototype = Object.create(Layer.prototype);
GeoJson.prototype.constructor = GeoJson;