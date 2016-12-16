var math = require('./math.js');

module.exports = {
  $main: function($, data, config, callback){
    return callback(null, data);
  },

  $on: {
    size: function($, data, config, callback) {
      try {
        var output = {
          'output': math.size(data.matrixA)
       };
        return callback(null, output);
      } catch (err) {
        return callback(err.toString(), null);
      }

    },
    add: function($, data, config, callback) {
      try {
        var output = {
          'output': math.add(data.matrixA, data.matrixB)
        };
        return callback(null, output);
      } catch (err) {
        return callback(err.toString(), null);
      }
    },
    subtract: function($, data, config, callback) {
      try {
        var output = {
          'output': math.subtract(data.matrixA, data.matrixB)
        };
        return callback(null, output);
      } catch (err) {
        return callback(err.toString(), null);
      }
    },
    multiply: function($, data, config, callback) {
      try {
        var output = {
          'output': math.multiply(data.matrixA, data.matrixB)
        };
        return callback(null, output);
      } catch (err) {
        return callback(err.toString(), null);
      }
    },
    transpose: function($, data, config, callback) {
      try {
        var output = {
          'output': math.transpose(data.matrixA)
        };
        return callback(null, output);
      } catch (err) {
        return callback(err.toString(), null);
      }
    },
    determinant: function($, data, config, callback) {
      try {
        var output = {
          'output': math.det(data.matrixA)
        };
        return callback(null, output);
      } catch (err) {
        return callback(err.toString(), null);
      }
    },
    inverse: function($, data, config, callback) {
      try {
        var output = {
          'output': math.inv(data.matrixA)
        };
        return callback(null, output);
      } catch (err) {
        return callback(err.toString(), null);
      }
    },
    equal: function($, data, config, callback) {
      try {
        var output = {
          'output': math.deepEqual(data.matrixA, data.matrixB)
        };
        return callback(null, output);
      } catch (err) {
        return callback(err.toString(), null);
      }
    }
  }
};