
var Radial = function (seekbarId) {
    var $this = this;
    this.features = new ol.Collection();
    var layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: $this.features
        }),
        style: new ol.style.Style({
            fill: new ol.style.Fill({
                color: 'rgba(255, 255, 255, 0.2)'
            }),
            stroke: new ol.style.Stroke({
                color: '#ffcc33',
                width: 2
            }),
            image: new ol.style.Circle({
                radius: 7,
                fill: new ol.style.Fill({
                    color: '#ffcc33'
                })
            })
        })
    });


    $this.$seekbar = $("#" + seekbarId);

    $this.seekbar = new Seekbar.Seekbar({
        renderTo: "#" + seekbarId,

        valueListener: function (value) {
            //this.setValue(Math.round(value));
            if ($this.circle) {
                $this.circle.setRadius(((value * 0.1 * 9) + 1) * 1000);
            }
        }
    });
    $this.$seekbar.hide();
    Layer.call(this, layer);
};

Radial.prototype = Object.create(Layer.prototype);
Radial.constructor = Radial;

Radial.prototype.interaction = function (map) {
    var $this = this;


    $this.draw = new ol.interaction.Draw({
        features: $this.features,
        layers: [$this.layer],
        type: "Circle",
        condition: ol.events.condition.platformModifierKeyOnly
    });


    $this.select = new ol.interaction.Select({
        layers: [$this.layer]
    });

    $this.draw.on("drawend", function (event) {
        var circle = event.feature.getGeometry();
        circle.setRadius(2000);
    });

    map.map.addInteraction($this.select);
    map.map.addInteraction($this.draw);

    $this.select.getFeatures().on("add", function (event) {
        $this.circle = event.element.getGeometry();
        var radius = $this.circle.getRadius();

        var seekBarValue = ((radius - 1000) / 1000) * ((10) / 9);
        $this.seekbar.setValue(seekBarValue);

        $this.$seekbar.show();
    });

    $this.select.getFeatures().on("remove", function (event) {
        $this.circle = undefined;
        $this.$seekbar.hide();
    });
};


Radial.prototype.removeInteraction = function (map) {
    map.map.removeInteraction(this.select);
    map.map.removeInteraction(this.draw);
};