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
This supply acts as a simply wrapper for matrix operations implemented in [Math.js](http://mathjs.org/). Currently, the following operations are supported:
- add(matrixA, matrixB): adds corresponding elements of two matrices
- subtract(matrixA, matrixB): subtracts corresponding elements of matrixB from matrixA
- multiply(matrixA, matrixB): multiplies two matrixA with matrixB together
- transpose(matrixA): computes the transpose of matrixA
- determinant(matrixA): computes the determinant for matrixA
- inverse(matrixA): computes the inverse of matrixA
***dms_text_END***/

/***dms_snippet_START_1***/
var matrix = supply('matrix');
/***dms_snippet_END***/

/***dms_text_START_2***
Examples for add, subtract, and multiplying two supplies
***dms_text_END***/

/***dms_snippet_START_3***/
var data = {
    matrixA: [[2, 0], [-1, 3]],
    matrixB: [[7, 1], [-2, 3]]
};

dms.json(matrix.$on('add', data));
dms.json(matrix.$on('subtract', data));
dms.json(matrix.$on('multiply', data));
/***dms_snippet_END***/

/***dms_snippet_OUTPUT_JSON_3_{"line":41,"adjusted_line":6,"id":"CCYhuzbVkegCECY","type":"json","body":{"output":[[9,1],[-3,6]]}}***/

/***dms_snippet_OUTPUT_JSON_3_{"line":42,"adjusted_line":7,"id":"sQotgbwxLlHAxQx","type":"json","body":{"output":[[-5,-1],[1,0]]}}***/

/***dms_snippet_OUTPUT_JSON_3_{"line":43,"adjusted_line":8,"id":"sERypKUHKzWSacO","type":"json","body":{"output":[[14,2],[-13,8]]}}***/

/***dms_text_START_4***
Examples of transpose, inverse, and determinant
***dms_text_END***/

/***dms_snippet_START_5***/
data = {
    matrixA: [[2, 0], [-1, 3]]
};

dms.json(matrix.$on('transpose', data));
dms.json(matrix.$on('inverse', data));
dms.json(matrix.$on('determinant', data));
/***dms_snippet_END***/

/***dms_snippet_OUTPUT_JSON_5_{"line":61,"adjusted_line":5,"id":"aJchVytKCxIwBHp","type":"json","body":{"output":[[2,-1],[0,3]]}}***/

/***dms_snippet_OUTPUT_JSON_5_{"line":62,"adjusted_line":6,"id":"kDmwYxycfWmgLtc","type":"json","body":{"output":[[0.5,0],[0.16666666666666666,0.3333333333333333]]}}***/

/***dms_snippet_OUTPUT_JSON_5_{"line":63,"adjusted_line":7,"id":"OSuiWrvVdBJzHYS","type":"json","body":{"output":6}}***/

/***dms_text_START_6***
Examples of element-wise matrix equality
***dms_text_END***/

/***dms_snippet_START_7***/
data = {
    matrixA: [[2, 0], [-1, 3]],
    matrixB: [[2, 0], [-1, 3]]
};

dms.json(matrix.$on('equal', data));

data = {
    matrixA: [[2, 0], [-1, 3]],
    matrixB: [[7, 1], [-2, 3]]
};

dms.json(matrix.$on('equal', data));
/***dms_snippet_END***/

/***dms_snippet_OUTPUT_JSON_7_{"line":82,"adjusted_line":6,"id":"kFiWAsZOVgwnuNd","type":"json","body":{"output":true}}***/

/***dms_snippet_OUTPUT_JSON_7_{"line":89,"adjusted_line":13,"id":"PAtuMemNvMNkPnV","type":"json","body":{"output":false}}***/

/***dms_text_START_8***
Examples of errors if correct conditions for functions are met
***dms_text_END***/

/***dms_snippet_START_9***/
function matrixCallback(err, res) {
    if (err) {
        dms.log(err);
    } else {
        dms.log(res.output);
    }
}

data = {
    matrixA: [[]],
    matrixB: [[7, 1], [-2, 3]]
};

matrix.$on('add', data, matrixCallback);
matrix.$on('subtract', data, matrixCallback);
matrix.$on('multiply', data, matrixCallback);

data = {
    matrixA: [[2, 0]]
};

matrix.$on('inverse', data, matrixCallback);
matrix.$on('determinant', data, matrixCallback);
/***dms_snippet_END***/

/***dms_snippet_OUTPUT_JSON_9_{"line":103,"adjusted_line":3,"id":"knakBMqbRybMJTv","type":"log","body":"RangeError: Dimension mismatch. Matrix A (1,0) must match Matrix B (2,2)"}***/

/***dms_snippet_OUTPUT_JSON_9_{"line":103,"adjusted_line":3,"id":"rMRPtoBGTAAnFJr","type":"log","body":"RangeError: Dimension mismatch. Matrix A (1,0) must match Matrix B (2,2)"}***/

/***dms_snippet_OUTPUT_JSON_9_{"line":103,"adjusted_line":3,"id":"dsdOuEHdOYbBNUQ","type":"log","body":"RangeError: Dimension mismatch in multiplication. Matrix A columns (0) must match Matrix B rows (2)"}***/

/***dms_snippet_OUTPUT_JSON_9_{"line":103,"adjusted_line":3,"id":"ZAMfMlNqlljWRnQ","type":"log","body":"RangeError: Matrix must be square (size: [1, 2])"}***/

/***dms_snippet_OUTPUT_JSON_9_{"line":103,"adjusted_line":3,"id":"ImnlpADkjXFFuGC","type":"log","body":"RangeError: Matrix must be square (size: [1, 2])"}***/
