define(["player", "renderer", "shots", "buckets"], function(player, renderer, shots, buckets) {

    // Sorry, project is running late.....
    window.messenger = _.extend({}, Backbone.Events);

    (function (_) {
        'use strict';

        _.compile = function (templ) {
            var compiled = this.template(templ);
            compiled.render = function (ctx) {
                return this(ctx);
            }
            return compiled;
        }
    })(window._);


    var player_engine = new Bloodhound({
        prefetch: {
            url: '/players/allplayers'
        },
        datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.val);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 10
    });
    player_engine.initialize()

    var team_engine = new Bloodhound({
        prefetch: {
            url: '/players/allteams'
        },
        datumTokenizer: function(d) {
            return Bloodhound.tokenizers.whitespace(d.val);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        limit: 10
    });
    team_engine.initialize()

    var width = 900;
    var height = 728;
    var bucketsize = buckets.getDimension();
    var processing = renderer.getProcessing()

    var Keys = {
        "enter": 13
    }

    var $searchbox = $("#js-search-player");
    $searchbox.typeahead(
        {
            hint: true,
            minLength: 1,
            highlight: true
        }, 
        {   
            source: player_engine.ttAdapter(),
            displayKey: "val",
            templates: {
                empty: "<div class='tt-empty-results'>No results found.</div>",
                suggestion: _.compile($("#suggestion-player-template").html()),
                header: "<h2>By Player</h2>"
            }
        },
        {
            displayKey: "val",
            source: team_engine.ttAdapter(),
            templates: {
                empty: "<div class='tt-empty-results'>No results found.</div>",
                suggestion: _.compile($("#suggestion-team-template").html()),
                header: "<h2>By Team</h2>"
        },
    }).on("typeahead:selected", function(e, suggestion) {
        var query = suggestion.tokens[0];
        loadQuery(query);
    });

    function loadQuery(query) {
        var p = new player.Player({defender_name: query});
        var promise = p.fetch()
        promise.success(function() {
            if (p.get("shots") && p.get("shots").length !== 0) {
                renderer.renderActiveShots(p.get("shots"))
                p.getFGPercentage();
                renderPlayer(query, function(url) {
                    var v = new player.SinglePlayerView({model: p});
                    $(".player-list-view").empty()
                    v.url = url;
                    v.render()
                });
            }
            else searchForTeam(query);
        });
    }

    messenger.on("load:player", function(p) {
        loadQuery(p);
        $searchbox.typeahead('val', p)
    })

    function searchForTeam(team) {
        var s = new shots.Shots()
        s.team_name = team;
        var promise = s.fetch()
        renderPlayer(team, function(url) {
            if ($("#player-view img").length == 0) {
                $("#player-view").append("<img/>");
            }
            $("#player-view img").attr("src", url);
            $(".player-stats").remove();
            $.getJSON("players/onteam/" + team, {}, function(response) {
                var v = new player.PlayerListView({collection: response})
                v.render()
            })
        })
        promise.success(function() {
            renderer.renderActiveShots(s);
        });
    }


    var imageUrl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDzPy8ZXY8EDF78LK6C--tdlnAyZaIaTUo&cx=015661274860674749666:khdhtohkc94&alt=json&searchType=image'
    function renderPlayer(query, done) {
        var url = "";
        $.get(imageUrl, {q: query}, function(response) {
            url = response.items[0].link
        }).always(function() {
            done(url)
        })
    }

});