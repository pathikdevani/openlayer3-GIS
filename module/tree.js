
var Tree = function (treeId,map) {
    var $this = this;
    $this.$tree = $("#" + treeId);
    $this.$treeItem = $($this.$tree.html());
    $this.$tree.empty();

    $this.map = map;
    //$this.items = {};
};

Tree.prototype = {
    addLayer: function (name, layer, active) {
        var $this = this;
        var $item = $this.$treeItem.clone();
        var $input = $item.find("input");


        $item.find(".title").text(name);
        $this.$tree.append($item);
        $input.prop('checked', active);
        $input.change(function () {
            active = $(this).is(':checked');
            setLayer();
        });
        setLayer();


        function setLayer() {
            layer.getLayer().setVisible(active);
            if (active) {
                if (layer.interaction)
                    layer.interaction($this.map);
            } else {
                if (layer.removeInteraction)
                    layer.removeInteraction($this.map);
            }

        }
    }
};