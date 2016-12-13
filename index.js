/*
 *  All supplies must modules.export an object
 */
module.exports = {

  /*
   *  $inject is an optional function for initializing persistent variables
   *  and using other supplies within this supply.
   */
  $inject: function(supply, config){
    /*
     * supply:    an instance of the @dms/supply package, used for loading nested supplies.
     *            If a supply is loaded here, return it as an attribute to make 
     *            it available in $main and any routes.
     *
     * config:    object containing parameter settings
     *
     */

    return;
  },

  /*
   *  $main is the required function that will be called via a supply's default route.
   *  The core of your supply logic should go here.
   */
  $main: function($, data, config, callback){
    /*
     *  $:        an internal stateless storage object and holds any miners and
     *            injected attributes from the $inject() function
     *
     *  data:     the incoming data as a JSON object
     *
     *  config:   an object containing parameter settings
     *
     *  callback: a function for completing the processing of this data point.
     *            Use the first parameter for errors and the second as an object
     *            for output data - callback(err, outputs)
     */

    return callback(null, data);
  },

  /*
   *  $on is an optional object that creates alternate routes for this supply.
   *  This is often useful for data coming from different sources or for different purposes.
   */
  $on: {
    route_name: function($, data, config, callback){
      // TODO: write endpoint logic

      return callback(null, data);
    }
  }
};