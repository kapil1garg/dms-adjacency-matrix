var supply = require('@dms/io');

// test directed graph
console.log('Testing directed graph');
var adjacencyMatrix = supply('adjacency-matrix', {
    parameters: {
        edgeNames: ['A', 'B', 'C', 'D']
    }
});

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
        edgeNames: ['A', 'B', 'C', 'D'],
        undirected: true
    }
});

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

// test errors
var nonUniqueEdgesGraph = supply('adjacency-matrix', {
    parameters: {
        edgeNames: ['A', 'B', 'B', 'D']
    }
});

nonUniqueEdgesGraph({
    from: 'A',
    to: 'B',
    value: 1
});
