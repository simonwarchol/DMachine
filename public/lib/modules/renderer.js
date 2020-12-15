define(["buckets"], function(buckets) {
    var canvas = document.getElementById("d-machine");
    var width = 900;
    var height = 728;
    var events = _.extend({}, Backbone.Events);
    var bucketsize = buckets.getDimension();
    var currentBuckets;
    // From coolest to hottest
    var colors = [[38,76,255],[63,160,255],[114,216,255],[170,247,255],[224,255,255],[255,255,191],[255,224,153],[255,173,114],[247,109,94],[216,38,50],[165,0,33]];
    var bubbleView = new buckets.BucketInfoView();
    // _.each(colors, function(c, v) {
    //     colors[v].push(.4);
    // })
    // console.log(colors)
    var exposedProcessing;

    function sketchLoop(processing) {

        exposedProcessing = processing;

        function render(buckets) {
            var w = buckets.width;
            var h = buckets.height;
            var x,y, numshots, numMadeShots, instancePercent, color, diff;
            var maxShots = 0;
            // Compute the bucket with the most shots made against the player
            buckets.each(function(b, i) {
                if (b.get("shots").length > maxShots) {
                    maxShots = b.get("shots").length;
                }

            });
            buckets.each(function(b, i) {
                x = (i % w) * bucketsize;
                y = Math.floor(i / w) * bucketsize;
                processing.noStroke();
                numshots = b.get("shots").length
                if (numshots < 3) {
                    return;
                }
                else {
                    numMadeShots = _.filter(b.get("shots").models, function(shot) {
                        return shot.get("shot_made_flag")
                    }).length;
                    instancePercent = numMadeShots / numshots;
                }
                diff = (instancePercent - b.madeCount) * 100;
                var index = 0;
                if (diff >= -80 && diff < -58) {
                    index = 1;
                }
                else if (diff  >= -58 && diff < -35) {
                    index = 2
                }
                else if (diff  >= -35 && diff < -17) {
                    index = 3
                }
                else if (diff  >= -17 && diff < -2) {
                    index = 4
                }
                else if (diff  >= -2 && diff < 5) {
                    index = 5
                }
                else if (diff  >= 5 && diff < 17) {
                    index = 6
                }
                else if (diff  >= 17 && diff < 35) {
                    index = 7
                }
                else if (diff  >= 35 && diff < 58) {
                    index = 8
                }
                else if (diff  >= 58 && diff < 80) {
                    index = 9
                }
                else if (diff  >= 80 && diff < 100) {
                    index = 10
                }
                color = colors[index]
                processing.fill.apply(processing,color);
                var size = bucketsize;
                if (numshots < maxShots) {
                    size = numshots / maxShots * bucketsize;
                }
                size *= 6;
                if (size > bucketsize) {
                    size = bucketsize;
                }
                processing.ellipse(x + bucketsize / 2, y + bucketsize / 2, size, size);
                b.computeFieldGoalPercentage();
                b.computeAverageDefenderDistance();
            });
        }

        processing.mouseMoved = function() {
            if (currentBuckets){
                var coords = currentBuckets.computeBucketIndex(processing.mouseX,processing.mouseY);
                var bucket = currentBuckets.getBucket(coords.row, coords.col);
                if (bucket.get("shots").length < 3) {
                    bubbleView.$el.hide()
                    return;
                }
                console.log(height)
                bubbleView.model = bucket;
                bubbleView.render();
                var height = bubbleView.$el.show().height()
                bubbleView.$el.css({"left": 300 + coords.col * bucketsize, "top": coords.row * bucketsize - height})
            }
        }

        processing.setup = function() {
            processing.background(0,0,0,0)
            processing.size(width, height)
            events.on("render:active", function(shots) {
                processing.background(0,0,0,0)
                var x, y, pt, bucket;
                currentBuckets = new buckets.Buckets();
                currentBuckets.width = Math.floor(width/bucketsize);
                currentBuckets.height = Math.floor(height/bucketsize);
                currentBuckets.addEmptyBuckets();
                shots.each(function(shot) {
                    x = width - 100 - shot.get("y");
                    y = height/2 + shot.get("x");
                    var coords = currentBuckets.computeBucketIndex(x,y);
                    bucket = currentBuckets.getBucket(coords.row, coords.col);
                    if (!_.isUndefined(bucket)) {
                        bucket.get("shots").add(shot)
                    }
                });
                render(currentBuckets);
            })
        }
    }

    var processingInstance = new Processing(canvas, sketchLoop)

    return {
        renderActiveShots: function(shots) {
            events.trigger("render:active", shots);
        },
        getProcessing: function() {
            return exposedProcessing;
        }
    }
});