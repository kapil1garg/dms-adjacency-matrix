module.exports = {
  $inject: function(supply, config){
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
          return null;
        } else {
          graphNodes[currEdgeName] = numKeys;
          numKeys++;
        }
      }

      // create matrix
      initializedMatrix = new Array(numKeys);
      for (var i in graphNodes) {
        var currRow = new Array(numKeys);
        for (var j in graphNodes) {
          currRow[graphNodes[j]] = 0;
        }
        initializedMatrix[graphNodes[i]] = currRow;
      }

      // return graphNodes, initialized matrix
      return [graphNodes, initializedMatrix]
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
      var initOutput = $.initialize();
      if (initOutput) {
        $.nodes = initOutput[0];
        $.matrix = initOutput[1];
        $.initialized = true;
      } else {
        return callback('Initialization failed: all node names must be unique.')
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
      var initOutput = $.initialize();
      if (initOutput) {
        $.nodes = initOutput[0];
        $.matrix = initOutput[1];
        $.initialized = true;
        return callback(null);
      } else {
        return callback('Initialization failed: all node names must be unique.')
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