# remark-task-list
[![npm version](https://badge.fury.io/js/remark-task-list.svg)](https://badge.fury.io/js/remark-task-list) [![Build Status](https://travis-ci.org/landakram/remark-task-list.svg?branch=master)](https://travis-ci.org/landakram/remark-task-list)

This [remark](https://github.com/wooorm/remark) plugin does a few things: 

* It lets you add IDs to task list items so you can reference them later
* It lets you toggle task list items by passing in a list of IDs to toggle. The plugin will transform the AST and flip the `node.checked` properties for each ID.

## Usage

```javascript
const unified = require('unified')
const markdown = require('remark-parse')
const taskListPlugin = require('remark-task-list');

let processor = unified()
    .use(markdown, { gfm: true })
    .use(taskListPlugin, { 
        toggle: ['task-list-item-1'], // Default is []
        idPrefix: 'task-list-item-'   // Default is 'task-list-item-'
    })
```

When the processor is run, each checkbox `listItem` node will have a few properties
attached to its `data` key: 

```javascript
data: {
    idx: 0,                    // Incremented for each task list item
    id: 'task-list-item-0',    // Controlled by `idPrefix`
    hProperties: {
        id: 'task-list-item-0' // Causes the node to be rendered to HTML with an `id` attribute
    }
}
```

We used the `toggle` option above to indicate that we'd like the task list item
with the ID `task-list-item-1` to be toggled. If it is checked, it will be
toggled unchecked, and vice versa.

Say that we have this markdown string:

``` markdown
- [ ] task 1
- [x] task 2
```

Since we specified `toggle: ["task-list-item-1"]`, the second `listItem` node
will have its `checked` property flipped. Thus, the markdown would be re-rendered like so:

``` markdown
-   [ ] task 1
-   [ ] task 2
```
