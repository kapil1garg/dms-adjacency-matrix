var supply = require('@dms/io');
supply().setRelativeMode(true);
var dms = supply().notebook;

/*
 * Hi there!
 *
 * You can ignore everything above this comment. We set some stuff up
 * automatically so that it's always easy to get started using Data Markdown.
 * More info and resources can be found on our site: https://dm.supply
 *
 * - The DMS Team
 *
 * Data Markdown v0.6.1
 */

/***dms_text_START_0***
This supply can be used to represent a graph as an [adjacency matrix](https://en.wikipedia.org/wiki/Adjacency_matrix), and manipulate the weights of each edge. 

Edges are referenced by a string name provided by the user. **They must be unique (code will error if they are not).**
***dms_text_END***/

/***dms_snippet_START_1***/
var matrixPrinter = function (matrix) {
  for (var i in matrix) {
    var outputString = '';
    
    for (var j in matrix[i]) {
      outputString += matrix[i][j];
      outputString += ' '; 
    }
    dms.log(outputString) 
  }
}
/***dms_snippet_END***/

/***dms_snippet_MINIMIZED_1***/

/***dms_snippet_START_2***/
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

dms.log('Adding elements to matrix')
matrixPrinter(adjacencyMatrix.$on('getMatrix').adjMatrix);

// increment some edges 
adjacencyMatrix.$on('incrementEdge', {
    from: 'A',
    to: 'B',
    value: 1
});
adjacencyMatrix.$on('incrementEdge', {
    from: 'B',
    to: 'C'
});

dms.log('Increment values of some edges')
matrixPrinter(adjacencyMatrix.$on('getMatrix').adjMatrix);

// decrement some edges
adjacencyMatrix.$on('decrementEdge', {
    from: 'A',
    to: 'B',
    value: 1
});
adjacencyMatrix.$on('decrementEdge', {
    from: 'B',
    to: 'C'
});

dms.log('Decrement values of some edges')
matrixPrinter(adjacencyMatrix.$on('getMatrix').adjMatrix);
/***dms_snippet_END***/

/***dms_snippet_OUTPUT_JSON_2_{"line":65,"adjusted_line":26,"id":"NyGQEjXfsAiJWii","type":"log","body":"Adding elements to matrix","i":{"chapter":"0","element":"2","output":"0"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":66,"adjusted_line":27,"id":"MTCQlzbNRBLRIIW","type":"log","body":"0 1 0 0 ","i":{"chapter":"0","element":"2","output":"1"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":66,"adjusted_line":27,"id":"MFHvFUuhbHlamEo","type":"log","body":"0 0 2 0 ","i":{"chapter":"0","element":"2","output":"2"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":66,"adjusted_line":27,"id":"QhqvSiHsajmCodc","type":"log","body":"0 3 0 0 ","i":{"chapter":"0","element":"2","output":"3"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":66,"adjusted_line":27,"id":"LJclPcEjmlzJDhs","type":"log","body":"0 0 0 0 ","i":{"chapter":"0","element":"2","output":"4"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":79,"adjusted_line":40,"id":"NkAavZTUsqglZQm","type":"log","body":"Increment values of some edges","i":{"chapter":"0","element":"2","output":"5"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":80,"adjusted_line":41,"id":"kDFHavsRCSiNsLL","type":"log","body":"0 2 0 0 ","i":{"chapter":"0","element":"2","output":"6"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":80,"adjusted_line":41,"id":"QsTohVaYayUkOYA","type":"log","body":"0 0 3 0 ","i":{"chapter":"0","element":"2","output":"7"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":80,"adjusted_line":41,"id":"QEHBZWhXhDeAyfN","type":"log","body":"0 3 0 0 ","i":{"chapter":"0","element":"2","output":"8"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":80,"adjusted_line":41,"id":"rdbHipuZreFbsdR","type":"log","body":"0 0 0 0 ","i":{"chapter":"0","element":"2","output":"9"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":93,"adjusted_line":54,"id":"gjajqAHlkUQlJmt","type":"log","body":"Decrement values of some edges","i":{"chapter":"0","element":"2","output":"10"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":94,"adjusted_line":55,"id":"pZMnMwuDYgMhJPh","type":"log","body":"0 1 0 0 ","i":{"chapter":"0","element":"2","output":"11"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":94,"adjusted_line":55,"id":"EKJJDjrozgMZYtp","type":"log","body":"0 0 2 0 ","i":{"chapter":"0","element":"2","output":"12"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":94,"adjusted_line":55,"id":"yDnTkmJkxQaZgQj","type":"log","body":"0 3 0 0 ","i":{"chapter":"0","element":"2","output":"13"}}***/

/***dms_snippet_OUTPUT_JSON_2_{"line":94,"adjusted_line":55,"id":"moaqFDieyuhdDxN","type":"log","body":"0 0 0 0 ","i":{"chapter":"0","element":"2","output":"14"}}***/

/***dms_text_START_3***
Undirected graphs are also supported by specifying the `undirected: true` parameter in the config object. The supply will automatically handle ensuring that the graph remains symmetrics about the diagonal.
***dms_text_END***/

/***dms_snippet_START_4***/
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

dms.log('Adding elements to matrix. Notice the matrix is symmetric.')
matrixPrinter(undirectedAdjacencyMatrix.$on('getMatrix').adjMatrix);
/***dms_snippet_END***/

/***dms_snippet_OUTPUT_JSON_4_{"line":156,"adjusted_line":25,"id":"cVajlQqZLFuqKlv","type":"log","body":"Adding elements to matrix. Notice the matrix is symmetric.","i":{"chapter":"0","element":"4","output":"0"}}***/

/***dms_snippet_OUTPUT_JSON_4_{"line":157,"adjusted_line":26,"id":"PCXelpcWfwWnLCP","type":"log","body":"0 1 0 0 ","i":{"chapter":"0","element":"4","output":"1"}}***/

/***dms_snippet_OUTPUT_JSON_4_{"line":157,"adjusted_line":26,"id":"pHdndaTDAnMkljk","type":"log","body":"1 0 3 0 ","i":{"chapter":"0","element":"4","output":"2"}}***/

/***dms_snippet_OUTPUT_JSON_4_{"line":157,"adjusted_line":26,"id":"DFWWnfUaprwAmfT","type":"log","body":"0 3 0 0 ","i":{"chapter":"0","element":"4","output":"3"}}***/

/***dms_snippet_OUTPUT_JSON_4_{"line":157,"adjusted_line":26,"id":"TCUqVIzYQJXIArD","type":"log","body":"0 0 0 0 ","i":{"chapter":"0","element":"4","output":"4"}}***/