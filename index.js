module.exports = {
  $inject: function(supply, config){
    var edges = {};
    var matrix = [];
    var initialized = false;

    return {
      edges: edges,
      matrix: matrix,
      initialized: initialized
    };
  },

  $main: function($, data, config, callback){
    // check if variables are initialized
    if (!$.initialized) {
      var numKeys = 0;
      for (var currEdgeIndex in config.parameters.edgeNames) {
        var currEdgeName = config.parameters.edgeNames[currEdgeIndex];
        if ($.edges.hasOwnProperty(currEdgeName)) {
          return callback('Edge names must be unique');
        } else {
          $.edges[currEdgeName] = numKeys;
          numKeys++;
        }
      }

      // create matrix
      $.matrix = new Array(numKeys);
      for (var i in $.edges) {
        var currRow = new Array(numKeys);
        for (var j in $.edges) {
          currRow[$.edges[j]] = 0;
        }
        $.matrix[$.edges[i]] = currRow;
      }

      // graph is now initialized
      $.initialized = true;
    }

    // push new value to matrix
    $.matrix[$.edges[data.from]][$.edges[data.to]] = data.value;
    if (config.parameters.undirected) {
      $.matrix[$.edges[data.to]][$.edges[data.from]] = data.value;
    }

    // return the newly modified matrix
    var output = {
      adjMatrix: $.matrix
    };

    return callback(null, output);
  },

  $on: {
    getMatrix: function($, data, config, callback){
      return callback(null, {
        adjMatrix: $.matrix
      });
    },
    getWeightFor: function($, data, config, callback) {
      return callback(null, $.matrix[$.edges[data.from]][$.edges[data.to]]);
    },
    incrementEdge: function($, data, config, callback) {
      if (data.value) {
        $.matrix[$.edges[data.from]][$.edges[data.to]] += data.value;
      } else {
        $.matrix[$.edges[data.from]][$.edges[data.to]]++;
      }

      // set value for symmetric graphs on opposite of diagonal
      if (config.parameters.undirected) {
        $.matrix[$.edges[data.to]][$.edges[data.from]] = $.matrix[$.edges[data.from]][$.edges[data.to]];
      }

      return callback(null, {
        adjMatrix: $.matrix
      });
    },
    decrementEdge: function($, data, config, callback) {
      if (data.value) {
        $.matrix[$.edges[data.from]][$.edges[data.to]] -= data.value;
      } else {
        $.matrix[$.edges[data.from]][$.edges[data.to]]--;
      }

      // set value for symmetric graphs on opposite of diagonal
      if (config.parameters.undirected) {
        $.matrix[$.edges[data.to]][$.edges[data.from]] = $.matrix[$.edges[data.from]][$.edges[data.to]];
      }

      return callback(null, {
        adjMatrix: $.matrix
      });
    }
  }
};