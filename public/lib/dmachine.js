require.config({
    urlArgs: "bust=" + new Date().getTime(),
    paths: {
        "backbone": "bower_components/backbone/backbone",
        "underscore": "bower_components/underscore/underscore-min",
        "jquery": "bower_components/jquery/dist/jquery.min",
        "processing": 'processing.min',
        "player": "modules/player",
        "renderer": "modules/renderer",
        "UIControls": "modules/UIControls",
        "shots": "modules/shots",
        "buckets": 'modules/buckets'
    }
})

// This is our main function
define(["jquery", "underscore", "backbone", "processing", "typeahead"], function($, _, Backbone, nvm) {
    require(["player", "renderer", "UIControls"], function(player, renderer, UIControls) {


    })
})