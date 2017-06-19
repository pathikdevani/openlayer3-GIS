
var Point = function () {
    var point = [
        [4e6, -2e6],
        [8e6, 2e6],
        [-5e6, -1e6],
        [-4e6, 1e6],
        [-3e6, -1e6],
        [4e4, 5e5],
        [6e7, 7e8],
        [0, 0],
        [1e6, 6e6],
        [1e6, 8e6],
        [3e6, 8e6]
    ];


    var pointStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: null,
            stroke: new ol.style.Stroke({color: 'red', width: 1})
        })
    });

    var geojsonObject = {
        'type': 'FeatureCollection',
        'crs': {
            'type': 'name',
            'properties': {
                'name': 'EPSG:3857'
            }
        },
        'features': []
    };

    $.each(point, function (i, val) {
        geojsonObject.features.push({
            'type': 'Feature',
            'geometry': {
                'type': 'Point',
                'coordinates': val
            }
        })
    });

    var source = new ol.source.Vector({
        features: (new ol.format.GeoJSON()).readFeatures(geojsonObject)
    });

    var layer = new ol.layer.Vector({
        source: source
    });

    Layer.call(this, layer);
};

Point.prototype = Object.create(Layer.prototype);
Point.prototype.constructor = Point;
