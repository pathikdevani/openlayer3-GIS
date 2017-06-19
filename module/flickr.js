var Flickr = function (infoId) {
    var $this = this;
    $this.source = new ol.source.Vector();
    $this.cache = {};


    var layer = new ol.layer.Vector({
        source: $this.source,
        style: function (feature) {
            return [$this.photoStyle(feature, 0.10)];
        }
    });


    $.ajax({
        url: "https://www.flickr.com/services/feeds/geo/?format=json&per_page=5",
        dataType: 'jsonp',
        jsonpCallback: 'jsonFlickrFeed',
        success: function (data) {
            var transform = ol.proj.getTransform('EPSG:4326', 'EPSG:3857');
            data.items.forEach(function (item) {
                var feature = new ol.Feature(item);
                feature.set("url", item.media.m);
                var coordinate = transform([parseFloat(item.longitude), parseFloat(item.latitude)]);
                var geometry = new ol.geom.Point(coordinate);
                feature.setGeometry(geometry);
                $this.source.addFeature(feature);
            })
        }
    });

    $this.$info = $("#" + infoId);
    $this.$info.click(function (e) {
        e.stopPropagation();
        $this.$info.hide();
    });
    $this.$info.hide();

    Layer.call($this, layer);
};

Flickr.prototype = Object.create(Layer.prototype);
Flickr.prototype.constructor = Flickr;

Flickr.prototype.photoStyle = function (feature, scale) {
    var $this = this;
    var url = feature.get("url");
    var key = scale + url;
    if (!$this.cache[key]) {
        $this.cache[key] = new ol.style.Style({
            image: new ol.style.Icon({
                scale: scale,
                src: url
            })
        });
    }
    return $this.cache[key];
};

Flickr.prototype.interaction = function (map) {
    var $this = this;
    $this.select = new ol.interaction.Select({
        layers: [$this.layer],
        style: function (feature) {
            return [$this.photoStyle(feature, 0.10)];
        }
    });

    map.map.addInteraction($this.select);
    $this.select.getFeatures().on("add", function (event) {
        var feature = event.target.item(0);
        var url = feature.get("url");
        var description = feature.get("description");
        var title = feature.get("title");

        var $content = $this.$info.find(".content");
        $content.empty();
        $content.append($(description));
        $this.$info.show();
    });
};


Flickr.prototype.removeInteraction = function (map) {
    map.map.removeInteraction(this.select);
};



