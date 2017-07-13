const assert = require('assert');
const unified = require('unified')
const markdown = require('remark-parse')
const visit = require('unist-util-visit');

const taskListPlugin = require('../lib/index.js');

let processor = unified()
    .use(markdown, { gfm: true, footnotes: true, yaml: true })
    .use(taskListPlugin, { toggle: ["task-list-item-1"] })

var input = `
- [ ] not checked
- [x] checked
`;

describe("remark-task-list", () => {
    var ast = processor.parse(input);
    ast = processor.runSync(ast);

    it("adds IDs to checkboxes in the AST", () => {
        var idx = 0;
        visit(ast, 'listItem', (node) => {
            assert.equal(node.data.idx, idx)
            assert.equal(node.data.id, 'task-list-item-' + idx)
            assert.equal(node.data.hProperties.id, 'task-list-item-' + idx)

            idx++;
        })
    })

    it("toggles checked status", () => {
        visit(ast, 'listItem', (node) => {
            if (node.data.idx == 1) {
                assert.equal(node.checked, false)
            }
        })
    })
})

var ast = processor.parse(input);
ast = processor.runSync(ast);
