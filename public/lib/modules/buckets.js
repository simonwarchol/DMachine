define(["shots"], function(shots) {
    var bucketDimension = 45;

    var madePercentages = [0,0,0,0,0,0,0,0,0,0.5833333333333334,0.375,0.42592592592592593,0.36,0.4009009009009009,0.43380281690140843,0.3685950413223141,0.3939169139465875,0.39057591623036647,0.3820116054158607,0.41237113402061853,0,0,0,0,0,0.2,0.18181818181818182,0.3958333333333333,0.3173913043478261,0.3929712460063898,0.37735849056603776,0.41807044410413474,0.35185185185185186,0.391304347826087,0.41509433962264153,0.3861003861003861,0.3403880070546737,0.4194341943419434,0.3583061889250814,0.47619047619047616,0,0,0.1,0.36363636363636365,0.23809523809523808,0.27941176470588236,0.358695652173913,0.3143507972665148,0.3772870662460568,0.3712121212121212,0.421875,0.3763440860215054,0.3962962962962963,0.40828402366863903,0.4128113879003559,0.39210526315789473,0.4040590405904059,0.38563829787234044,0.41254125412541254,0.2903225806451613,0.16666666666666666,0.2,0.1111111111111111,0.2857142857142857,0.33707865168539325,0.3,0.35509660226515655,0.36961451247165533,0.42570281124497994,0.3787878787878788,0.3937908496732026,0.4105754276827372,0.4173354735152488,0.38830584707646176,0.42287694974003465,0.3891213389121339,0.3855140186915888,0.4026258205689278,0.4109195402298851,0.4074074074074074,0.25,0.14285714285714285,0.14285714285714285,0.20454545454545456,0.27851458885941643,0.3529040404040404,0.3659244917715392,0.32038834951456313,0.3385416666666667,0.3705357142857143,0.391742195367573,0.4013986013986014,0.42245989304812837,0.3883720930232558,0.3987730061349693,0.3987441130298273,0.38303693570451436,0.3793103448275862,0.30666666666666664,0.38461538461538464,0,0,0.1111111111111111,0.38636363636363635,0.33991537376586745,0.35539437896645515,0.3953488372093023,0.3982808022922636,0.4180327868852459,0.39898348157560354,0.42232277526395173,0.4289544235924933,0.36140350877192984,0.38596491228070173,0.38799076212471134,0.3726346433770015,0.3989189189189189,0.3512064343163539,0.37777777777777777,0.16666666666666666,0.16666666666666666,0.14285714285714285,0.5,0.323943661971831,0.33847637415621984,0.3962962962962963,0.324468085106383,0.36899563318777295,0.4334319526627219,0.4346076458752515,0.4415204678362573,0.40512820512820513,0.3925438596491228,0.3684210526315789,0.4117647058823529,0.36006825938566556,0.36586901763224183,0.3674418604651163,0.27848101265822783,0,0,0.375,0.3137254901960784,0.4168564920273349,0.358974358974359,0.3851851851851852,0.39892183288409705,0.3993808049535604,0.3948170731707317,0.39547038327526135,0.4224343675417661,0.39882697947214074,0.41594827586206895,0.37271619975639464,0.3986537023186238,0.40948081264108355,0.447753209700428,0.606115542663766,0.6119293078055965,0.3333333333333333,0.16666666666666666,0.16666666666666666,0.2698412698412698,0.34870848708487084,0.39252873563218393,0.38,0.3790035587188612,0.3893360160965795,0.4009163802978236,0.3908754623921085,0.43009118541033436,0.4288194444444444,0.38306451612903225,0.4074074074074074,0.4033457249070632,0.41303729006547113,0.5174841053587648,0.6790033865505564,0.6760070052539404,0.125,0,0.5,0.25925925925925924,0.2463768115942029,0.33184257602862255,0.4344262295081967,0.34306569343065696,0.40555555555555556,0.41603630862329805,0.38865546218487396,0.3859060402684564,0.4563380281690141,0.40397350993377484,0.39571150097465885,0.3523573200992556,0.35647143890093996,0.3549337260677467,0.3623435722411832,0.35365853658536583,0,0,0.14285714285714285,0.3,0.24561403508771928,0.34146341463414637,0.359828141783029,0.2849162011173184,0.3652173913043478,0.39378238341968913,0.4275,0.4319620253164557,0.4054726368159204,0.3936781609195402,0.40934065934065933,0.40725806451612906,0.42942583732057416,0.40184331797235023,0.3840104849279161,0.359375,0.3333333333333333,0.25,0.25,0.35294117647058826,0.3230769230769231,0.33737864077669905,0.35487345180398494,0.3649754500818331,0.3402061855670103,0.34210526315789475,0.39268978444236174,0.4252136752136752,0.3908918406072106,0.3744186046511628,0.3411764705882353,0.4125,0.3935361216730038,0.3395061728395062,0.3595706618962433,0.4774774774774775,0.45454545454545453,0.125,0,0.125,0.1,0.3203125,0.3435754189944134,0.3759709994821336,0.3673708920187793,0.37339055793991416,0.3764705882352941,0.3888213851761847,0.38430851063829785,0.37993421052631576,0.3978494623655914,0.38876889848812096,0.4120982986767486,0.36906584992343033,0.36731843575418993,0.41353383458646614,0.38636363636363635,0,0,0.1111111111111111,0.1111111111111111,0.23076923076923078,0.2336448598130841,0.2971887550200803,0.3288888888888889,0.37057010785824346,0.39057239057239057,0.3697478991596639,0.43103448275862066,0.34492753623188405,0.39705882352941174,0.4225352112676056,0.4295942720763723,0.41352201257861637,0.3911483253588517,0.39144736842105265,0.35,0,0,0,0,0.2,0.16666666666666666,0.2727272727272727,0.2857142857142857,0.3161290322580645,0.34107806691449816,0.3668571428571429,0.3629441624365482,0.39552238805970147,0.25833333333333336,0.37606837606837606,0.43636363636363634,0.35019455252918286,0.3812316715542522,0.41134751773049644,0.25,0,0,0,0,0,0,0,0,0,0.3333333333333333,0.3924050632911392,0.35658914728682173,0.39935064935064934,0.3818770226537217,0.4163346613545817,0.42458808618504434,0.3764861294583884,0.38518863530507685,0.3993677555321391,0.3235294117647059]
    var Bucket = Backbone.Model.extend({
        defaults: function() {
            return {
                shots: new shots.Shots()
            }
        },
        computeFieldGoalPercentage: function() {
            var len = this.get("shots").length;
            var madeLen = _.filter(this.get("shots").models, function(shot) {
                return shot.get("shot_made_flag") == true
            }).length;
            var percent = Math.round(madeLen/len * 1000)/10;
            this.set("FGPercent", percent);
            return percent;
        },
        computeAverageDefenderDistance: function() {
            var len = this.get("shots").length;
            var sum = 0;
            this.get("shots").each(function(shot) {
                sum += shot.get("defender_distance");
            })
            var dist = Math.round(sum/len * 100)/100;
            this.set("defenderDistance", dist)
            return dist;
        }
    });

    var Buckets = Backbone.Collection.extend({
        model: Bucket,
        addEmptyBuckets: function() {
            for (var i = 0; i < this.width * this.height; i++) {
                var b;
                this.add(b = new Bucket());
                b.madeCount = madePercentages[i];
            }
        },
        computeBucketIndex: function (x, y) {
            var row = Math.floor(y / bucketDimension);
            var col = Math.floor(x / bucketDimension);
            return {
                row: row,
                col: col
            }
        },
        getBucket: function(row, col) {
            return this.at(this.width * row + col);
        }
    });

    var BucketInfoView = Backbone.View.extend({
        el: '#bucket-bubble',
        template: $("#bubble-template").html(),
        render: function() {
            var template = _.template(this.template);
            this.$el.html(template(_.extend(this.model.toJSON(),{
                numShots: this.model.get("shots").length
            })));
            return this;
        }
    })

    return {
        Buckets: Buckets,
        BucketInfoView: BucketInfoView,
        getDimension: function() { return bucketDimension; }
    }
})