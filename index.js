module.exports = {
  $inject: function(supply, config){
    var matrixSupply = supply('matrix');
    var nodes = {};
    var matrix = [];
    var initialized = false;

    var initialize = function() {
      var numKeys = 0;
      var graphNodes = [];
      var initializedMatrix = [];

      for (var currEdgeIndex in config.parameters.nodeNames) {
        var currEdgeName = config.parameters.nodeNames[currEdgeIndex];
        if (graphNodes.hasOwnProperty(currEdgeName)) {
          throw 'All node names must be unique.'
        } else {
          graphNodes[currEdgeName] = numKeys;
          numKeys++;
        }
      }

      // check if initializedMatrix is provided
      if (config.parameters.initializedMatrix) {
        if (initializedMatrixIsValid()) {
          initializedMatrix = config.parameters.initializedMatrix;
        } else {
          throw 'Given initializedMatrix is invalid. ' +
                'It must have number rows = number columns = size of nodeNames with all numeric enteries. ' +
                'Additionally, if undirected is true the initializedMatrix given must be symmetric.';
        }
      } else {
        // else create matrix
        initializedMatrix = new Array(numKeys);
        for (var i in graphNodes) {
          var currRow = new Array(numKeys);
          for (var j in graphNodes) {
            currRow[graphNodes[j]] = 0;
          }
          initializedMatrix[graphNodes[i]] = currRow;
        }
      }

      // return graphNodes, initialized matrix
      return [graphNodes, initializedMatrix]
    }

    var initializedMatrixIsValid = function () {
      // check to see if there are a >0 number of rows
      if (!Array.isArray(config.parameters.initializedMatrix) ||
          config.parameters.initializedMatrix.length == 0) {
        return false;
      }

      var rowCount = config.parameters.initializedMatrix.length;
      var columnCount = 0;

      // check if all columns are the same length
      for (var i in config.parameters.initializedMatrix) {
        var currRow = config.parameters.initializedMatrix[i];

        // check if currRow is an array of columns
        if (!Array.isArray(currRow)) {
          return false;
        }

        // check for column length equality
        if (columnCount == 0) {
          columnCount = currRow.length;
        } else if (columnCount == currRow.length) {
          // check if each element is a number
          for (var j in currRow) {
            var currElement = currRow[j];
            if (typeof(currElement) != 'number') {
              return false;
            }
          }
        } else {
          return false;
        }
      }

      // if undirected is specified, make sure matrix is symmetric
      if (config.parameters.undirected) {
        var transposeMatrix = matrixSupply.$on('transpose', {matrixA: config.parameters.initializedMatrix}).output;
        if (!matrixSupply.$on('equal', {matrixA: config.parameters.initializedMatrix, matrixB: transposeMatrix}).output) {
          return false;
        }
      }

      // finally, check to see if columnCount = rowCount = size nodeNames
      return (rowCount == columnCount && rowCount == config.parameters.nodeNames.length);
    }

    return {
      nodes: nodes,
      matrix: matrix,
      initialized: initialized,
      initialize: initialize
    };
  },

  $main: function($, data, config, callback){
    // check if variables are initialized
    if (!$.initialized) {
      try {
        var initOutput = $.initialize();
        $.nodes = initOutput[0];
        $.matrix = initOutput[1];
        $.initialized = true;
      } catch (err) {
        return callback('Initialization failed: ' + err);
      }
    }

    // push new value to matrix
    $.matrix[$.nodes[data.from]][$.nodes[data.to]] = data.value;
    if (config.parameters.undirected) {
      $.matrix[$.nodes[data.to]][$.nodes[data.from]] = data.value;
    }

    // return the newly modified matrix
    var output = {
      adjMatrix: $.matrix
    };

    return callback(null, output);
  },

  $on: {
    initialize: function($, data, config, callback) {
      try {
        var initOutput = $.initialize();
        $.nodes = initOutput[0];
        $.matrix = initOutput[1];
        $.initialized = true;

        return callback(null);
      } catch (err) {
        return callback('Initialization failed: ' + err);
      }
    },
    getMatrix: function($, data, config, callback){
      return callback(null, {
        adjMatrix: $.matrix
      });
    },
    getWeightFor: function($, data, config, callback) {
      return callback(null, $.matrix[$.nodes[data.from]][$.nodes[data.to]]);
    },
    incrementEdge: function($, data, config, callback) {
      if (data.value) {
        $.matrix[$.nodes[data.from]][$.nodes[data.to]] += data.value;
      } else {
        $.matrix[$.nodes[data.from]][$.nodes[data.to]]++;
      }

      // set value for symmetric graphs on opposite of diagonal
      if (config.parameters.undirected) {
        $.matrix[$.nodes[data.to]][$.nodes[data.from]] = $.matrix[$.nodes[data.from]][$.nodes[data.to]];
      }

      return callback(null, {
        adjMatrix: $.matrix
      });
    },
    decrementEdge: function($, data, config, callback) {
      if (data.value) {
        $.matrix[$.nodes[data.from]][$.nodes[data.to]] -= data.value;
      } else {
        $.matrix[$.nodes[data.from]][$.nodes[data.to]]--;
      }

      // set value for symmetric graphs on opposite of diagonal
      if (config.parameters.undirected) {
        $.matrix[$.nodes[data.to]][$.nodes[data.from]] = $.matrix[$.nodes[data.from]][$.nodes[data.to]];
      }

      return callback(null, {
        adjMatrix: $.matrix
      });
    }
  }
};