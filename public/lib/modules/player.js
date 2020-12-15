define(["shots"], function(ShotManager) {


    var Player = Backbone.Model.extend({
        defaults: {
            FGPercent: 0
        },
        url: function() {
            return '/players/' + this.get("defender_name")
        },
        parse: function(response) {
            if (response && response.shots) {
                response.shots = new ShotManager.Shots(response.shots, {parse: true})
            }
            return response;
        },
        getFGPercentage: function() {
            // Get avg fg percent
            var totalShots = this.get("shots").length;
            var dist = 0;
            if (totalShots == 0) { 
                return;
            }
            var madeAgainst = _.filter(this.get("shots").models, function(shot) {
                dist += shot.get("defender_distance");
                return shot.get("shot_made_flag") == true
            }).length;
            this.set("totalShots", totalShots)
            this.set("FGPercent", Math.round(madeAgainst/totalShots*10000)/100)
            this.set("averageDistance", Math.round(dist/totalShots*10)/10);
        }
    });

    var Players = Backbone.Collection.extend({
        model: Player,
        url: function() {
            return "/players/onteam/" + this.team_name
        }
    });

    var SinglePlayerView = Backbone.View.extend({
        el: '#player-view',
        template: $("#player-template").html(),
        render: function() {
            var template = _.template(this.template);
            this.$el.html(template(_.extend(this.model.toJSON(), {url: this.url})));
            return this;
        }
    });

    var SimplePlayer = Backbone.View.extend({
        tagName: 'li',
        render: function() {
            this.$el.html(this.model);
            return this;
        },
        events: {
            click: function() {
                window.messenger.trigger("load:player", this.model)
            }
        }
    })

    var PlayerListView = Backbone.View.extend({
        el: '.player-list-view',

        render: function() {
            var that = this; 
            _.each(this.collection, function(player) {
                that.$el.append(new SimplePlayer({model: player}).render().el)
            });
        }
    });

    return {
        Player: Player,
        Players: Players,
        SinglePlayerView: SinglePlayerView,
        PlayerListView: PlayerListView
    }
})

