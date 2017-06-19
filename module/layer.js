


var Layer = function (layer) {

    //console.log(layer + " from layer");
    this.layer = layer;
};

Layer.prototype = {
    getLayer: function () {
        return this.layer;
    }
};