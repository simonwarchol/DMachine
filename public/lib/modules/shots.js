define([], function() {
    var xScale = 1.4;
    var yScale = 2.39;

    var Shot = Backbone.Model.extend({
        parse: function(response) {
            response.game_date = new Date(response.game_date);
            response.minutes_remaining = parseInt(response.minutes_remaining);
            response.shot_distance = parseFloat(response.shot_distance)
            response.defender_distance = parseFloat(response.defender_distance)
            response.shot_made_flag = parseInt(response.shot_made_flag)
            response.x = parseFloat(response.x) * xScale
            response.y = parseFloat(response.y) * yScale
            return response;
        }
    })

    var Shots = Backbone.Collection.extend({
        model: Shot,
        url: function() {
            return "/players/teams/" + this.team_name
        }
    })


    return {
        Shot: Shot,
        Shots: Shots
    }  
})