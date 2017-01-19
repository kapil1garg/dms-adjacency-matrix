var supply = require('@dms/io');
var matrix = supply('matrix');

function matrixCallback(err, res) {
    if (err) {
        console.log(err);
    } else {
        console.log(res.output);
    }
}

// test add, subtract, and multiply
var data = {
    matrixA: [[2, 0], [-1, 3]],
    matrixB: [[7, 1], [-2, 3]]
};

matrix.$on('add', data, matrixCallback);
matrix.$on('subtract', data, matrixCallback);
matrix.$on('multiply', data, matrixCallback);

// test transpose, inverse, and determinant
data = {
    matrixA: [[2, 0], [-1, 3]]
};

matrix.$on('transpose', data, matrixCallback);
matrix.$on('inverse', data, matrixCallback);
matrix.$on('determinant', data, matrixCallback);

// test for element-wise matrix equality
data = {
    matrixA: [[2, 0], [-1, 3]],
    matrixB: [[2, 0], [-1, 3]]
};

matrix.$on('equal', data, matrixCallback);

data = {
    matrixA: [[2, 0], [-1, 3]],
    matrixB: [[7, 1], [-2, 3]]
};

matrix.$on('equal', data, matrixCallback);

// test for errors
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