import 'babel-polyfill';
import map from 'unist-util-map';

const taskListPlugin = function(options) {
    options = options || {};
    var idPrefix = options.idPrefix || 'task-list-item-';

    function transformCheck(node) {
        var toggle = options.toggle || [];
        if (node.data && toggle.includes(node.data.id)) {
            node.checked = !node.checked;
        }
    }

    function addId(node, idx, id) {
        var data = { 
            idx: idx,
            id: idPrefix + idx,
            hProperties: {
                id: idPrefix + idx
            }
        };

        node.data = Object.assign({}, node.data, data);
    }

    function transformer(ast) {
        var idx = -1;

        return map(ast, (node) => {
            if (node.type == "listItem" && node.checked != null) {
                idx++;
                var newNode = Object.assign({}, node);
                addId(newNode, idx, idPrefix + idx);
                transformCheck(newNode);
                return newNode;
            } else {
                return node;
            }
        });
    }

    return transformer;
}

module.exports = taskListPlugin;
