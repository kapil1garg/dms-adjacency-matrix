var supply = require('@dms/io');

// test directed graph
console.log('Testing directed graph');
var adjacencyMatrix = supply('adjacency-matrix', {
    parameters: {
        nodeNames: ['A', 'B', 'C', 'D']
    }
});

adjacencyMatrix.$on('initialize');

// add some edges
adjacencyMatrix({
    from: 'A',
    to: 'B',
    value: 1
});
adjacencyMatrix({
    from: 'B',
    to: 'C',
    value: 2
});
adjacencyMatrix({
    from: 'C',
    to: 'B',
    value: 3
});
console.log(adjacencyMatrix.$on('getMatrix'));

adjacencyMatrix.$on('incrementEdge', {
    from: 'A',
    to: 'B',
    value: 1
});
adjacencyMatrix.$on('incrementEdge', {
    from: 'B',
    to: 'C'
});
console.log(adjacencyMatrix.$on('getMatrix'));

adjacencyMatrix.$on('decrementEdge', {
    from: 'A',
    to: 'B',
    value: 1
});
adjacencyMatrix.$on('decrementEdge', {
    from: 'B',
    to: 'C'
});
console.log(adjacencyMatrix.$on('getMatrix'));

console.log(adjacencyMatrix.$on('getWeightFor', {'from': 'A', 'to': 'B'}));

// test undirected graph
console.log('\nTesting undirected graph');
var undirectedAdjacencyMatrix = supply('adjacency-matrix', {
    parameters: {
        nodeNames: ['A', 'B', 'C', 'D'],
        undirected: true
    }
});

undirectedAdjacencyMatrix.$on('initialize');

// add some edges
undirectedAdjacencyMatrix({
    from: 'A',
    to: 'B',
    value: 1
});
undirectedAdjacencyMatrix({
    from: 'B',
    to: 'C',
    value: 2
});
undirectedAdjacencyMatrix({
    from: 'C',
    to: 'B',
    value: 3
});
console.log(undirectedAdjacencyMatrix.$on('getMatrix'));

undirectedAdjacencyMatrix.$on('incrementEdge', {
    from: 'A',
    to: 'B',
    value: 1
});
undirectedAdjacencyMatrix.$on('incrementEdge', {
    from: 'B',
    to: 'C'
});
console.log(undirectedAdjacencyMatrix.$on('getMatrix'));

undirectedAdjacencyMatrix.$on('decrementEdge', {
    from: 'A',
    to: 'B',
    value: 1
});
undirectedAdjacencyMatrix.$on('decrementEdge', {
    from: 'B',
    to: 'C'
});
console.log(undirectedAdjacencyMatrix.$on('getMatrix'));

console.log(undirectedAdjacencyMatrix.$on('getWeightFor', {'from': 'A', 'to': 'B'}));

// test pre-initialized matrix
console.log('\nTesting pre-initialized matrix');
var preInitMatrix = supply('adjacency-matrix', {
    parameters: {
        nodeNames: ['A', 'B', 'C', 'D'],
        initializedMatrix: [[ 0, 2, 0, 0 ], [ 0, 0, 3, 0 ], [ 0, 3, 0, 0 ], [ 0, 0, 0, 0 ]]
    }
});
preInitMatrix.$on('initialize');
console.log(preInitMatrix.$on('getMatrix'));

var preInitMatrixUndirected = supply('adjacency-matrix', {
    parameters: {
        nodeNames: ['A', 'B', 'C', 'D'],
        initializedMatrix: [[ 0, 1, 0, 0 ], [ 1, 0, 3, 0 ], [ 0, 3, 0, 0 ], [ 0, 0, 0, 0 ]],
        undirected: true
    }
});
preInitMatrixUndirected.$on('initialize');
console.log(preInitMatrixUndirected.$on('getMatrix'));

// test errors
console.log('\nTesting errors');
var nonUniqueEdgesGraph = supply('adjacency-matrix', {
    parameters: {
        nodeNames: ['A', 'B', 'B', 'D']
    }
});

nonUniqueEdgesGraph.$on('initialize', function (err, res) {
    if (err) {
        console.log('Error!', err);
    }
});

var invalidMatrixSize = supply('adjacency-matrix', {
    parameters: {
        nodeNames: ['A', 'B'],
        initializedMatrix: [[ 0, 2, 0, 0 ], [ 0, 0, 3, 0 ], [ 0, 3, 0, 0 ], [ 0, 0, 0, 0 ]]
    }
});
invalidMatrixSize.$on('initialize', function (err, res) {
    if (err) {
        console.log('Error!', err);
    }
});

var nonSymmetric = supply('adjacency-matrix', {
    parameters: {
        nodeNames: ['A', 'B', 'C', 'D'],
        initializedMatrix: [[ 0, 2, 0, 0 ], [ 0, 0, 3, 0 ], [ 0, 3, 0, 0 ], [ 0, 0, 0, 0 ]],
        undirected: true
    }
});

nonSymmetric.$on('initialize', function (err, res) {
    if (err) {
        console.log('Error!', err);
    }
});
