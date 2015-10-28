$(document).ready(function(){
    $("html,body").animate({scrollTop:0},200);
    $('.circle').click(function(){
        $(this).toggleClass('is-active');
        $('.nav').toggleClass('show-nav');
    });

//loading finnished
    var startElements = []
        .concat($(".roadiconsDark, .roadiconsDark svg, .roadicons, .roadicons svg, topTitle").get());
    var onLoadTL = new TimelineMax({delay:0.3})
        .set($("#roadContainer,#roadContainer2"), {opacity:1})
        .add([
            TweenMax.fromTo($("#header").get(), 1.5, {opacity:0, "margin-top":"-=50px", "margin-bottom":"+=50px"},{opacity:1, "margin-top":"+=50px", "margin-bottom":"-=50px"}),
            TweenMax.fromTo(startElements, 1.5, {opacity:0, top:"-=50px"},{opacity:1, top:"+=50px"})
        ]);
//start scrolling controllers
    var controller = new ScrollMagic.Controller();
    var endPositions, tweensInsideFunnel;
    var w = 620;
    var h = 620/375*541;

    if (window.innerWidth<620){//iPhone
        $("#MazeWrapper svg")
            .attr("width","375px")
            .attr("height","541px")
            .css("margin-top","-4px");
        $("#topAnimationsWrapper").css("height","1600px");
    } else{
        $("#MazeWrapper svg")
            .attr("width",""+w+"px")
            .attr("height",""+h+"px")
            .css("margin-left","-122px")
            .css("margin-top","-40px");
    }
    if (window.innerWidth<620){//iPhone
        endPositions={
            left : {x:"25%", y:966},
            right: {x:"28%", y:966},
        };
    } else if(window.innerWidth<1207){
        endPositions={
            left : {x:"38%", y:966},
            right: {x:"42%", y:966},
        };
    } else if (window.innerWidth>1900){
        endPositions={
            left : {x:"45%", y:1066},
            right: {x:"48%", y:1066},
        };
    } else {
        endPositions={
            left : {x:"38%", y:1066},
            right: {x:"42%", y:1066},
        };
    }

    if (window.innerWidth<1207){
        TweenMax.set($("#slideHeader"),{height:"611px","background-position-y":"50px"});
        TweenMax.set($("#roadContainer,#roadContainer2"), {"height":"561px", top:"+=50px"})
        TweenMax.set($(".funnel"), {"margin-top":"0px"})
        TweenMax.set($("h1#funnelTitle"), {"top":"-=100px"})
    } else {
        TweenMax.set($("#slideHeader"), {"background-position-y":"0px"})
    }

    tweensInsideFunnel = [
        {icon:".iconShoe.imgHolder",        pos:"right", duration:1.0},//goes out 1st
        {icon:".iconSpeedometer.imgHolder", pos:"left" , duration:1.1},//2nd
        {icon:".iconSun.imgHolder",         pos:"right", duration:1.2},
        {icon:".iconBiker.imgHolder",       pos:"left" , duration:1.35},
        {icon:".iconRun.imgHolder",         pos:"right", duration:1.45},
        {icon:".iconHeartbeat.imgHolder",   pos:"left" , duration:1.55},
        {icon:".iconWaves.imgHolder",       pos:"right", duration:1.75},
        {icon:".iconPeaks.imgHolder",       pos:"left" , duration:1.85},
    ].map(function(settings, index){
        var element = $(settings.icon),
        pos = endPositions[settings.pos]
        iconTweens = [
            TweenMax.to(element, settings.duration, { force3D:true, left: pos.x, ease: Sine.easeOut}),
            TweenMax.to(element, settings.duration, { force3D:true, top : pos.y, ease: Sine.easeIn}),
        ];
        return iconTweens;
    }).reduce(function(last, next){
        return last.concat(next);
    },[]);
    if (window.innerWidth<1207){
        tweensInsideFunnel.push(TweenMax.to($("#slideHeader"),1.3, {"background-position-y":"-=50px"}));//paralax of banner
    }
    var scene = new ScrollMagic.Scene({
        triggerElement: "#roadContainer",
        duration:900,// scroll some pixels to complete the animation
        triggerHook:"onLeave"
    })
    .setTween(new TimelineMax().add(tweensInsideFunnel))
    .addTo(controller);

    // FEATUREs paralax
    [
    {id: "#features .data", startY:"80px", endY:"-78px"},
    {id: "#features .analyze", startY:"125px", endY:"34px"},
    {id: "#features .achieve", startY:"50px", endY:"-78px"},
    ].forEach(function(element, index){
        var tweens = [TweenMax.fromTo($(element.id), 1.0, {
                    'background-position-y': element.startY,
                }, {
                    'background-position-y': element.endY,
                    immediateRender:false
                })];
        if (index===2){//add biker and runner animations
            tweens = tweens.concat([
                TweenMax.to($("#slope-biker"),  1.0,{"margin-top":"-=250", "margin-left":"+=100",immediateRender:false}),
                TweenMax.to($("#slope-runner"), 1.0,{"margin-top":"-=250", "margin-left":"-=100",immediateRender:false}),
            ]);
        }
        var paralaxScene = new ScrollMagic.Scene({
            triggerElement: element.id,
            duration: 1000,
            triggerHook: "onEnter"})
        .setTween(new TimelineMax().add(tweens))
        .addTo(controller);
    });
    [
        // {id:"#MazeWrapper",                     trigger:"#MazeWrapper"   , delay:0.25, tweenTime:0.5, staggerTime:0.3, duration:700},
    // signUp button
        {id:"#signup-button",                   trigger:"#signup-button" , delay:0   , tweenTime:0.5, staggerTime:0, duration:700},
    // FUTURE RELEASE FEATUREs paralax
        {id:"#future-release>div.left>ul>li",   trigger:"#future-release>div.left>ul>li:first-child", delay:0.15, tweenTime:0.4, staggerTime:0.1, duration:500},
        {id:"#future-release>div.right>ul>li",  trigger:"#future-release>div.right>ul>li:first-child", delay:0.15, tweenTime:0.4, staggerTime:0.1, duration:500},
    //REQUEST EARLY ACCESS
        {id:"#request-access>div",              trigger:"#request-access", delay:1 , tweenTime:1, staggerTime:0.25, duration:350},
    ].forEach(function(settings, index){
        var paralaxScene = new ScrollMagic.Scene({
            triggerElement: settings.trigger,
            duration: settings.duration,
            triggerHook: "onEnter"})
        .setTween(new TimelineMax().staggerFromTo(
            $(settings.id).get(),
            settings.tweenTime,//tween time
            {'opacity': 0.0},//from data
            {'opacity': 1.0, delay:settings.delay},// to data
            settings.staggerTime)//distance between starts,
        )

        .addTo(controller);
    });



    var MAZEscene = new ScrollMagic.Scene({
        triggerElement: "#MazeWrapper",
        duration: (window.innerWidth<620)?300:630, // sliding those number of pixels to complete the MAZE animation
        triggerHook: "onEnter",
        offset:150 // wait to pass offset pixel before starting with the SVGdraw
    });

    var timeLine = new TimelineMax()
        .set($("g>path"), {drawSVG:"0% 0%"});

    var sequence = [// if you change the svg config the elements below:
        {elem:$("g#_x37_>path"),  back:false, debugColor:"pink"},
        {elem:$("g#_x38_>path"),  back:false, debugColor:"black"},
        {elem:$("g#_x35_>path"),  back:true , debugColor:"brown"},
        {elem:$("g#_x34_>path"),  back:true , debugColor:"gray"},
        {elem:$("g#_x33_>path"),  back:true , debugColor:"purple", delay:30, time:120},
        {elem:$("g#_x32_>path"),  back:true , debugColor:"magenta", delay:0, time:40},
        {elem:$("g#_x31_>path"),  back:false, debugColor:"cyan"},
        {elem:$("g#_x31_0>path"), back:false, debugColor:"yellow", delay:0, time:45},
        {elem:$("g#_x31_2>path"), back:false, debugColor:"red",delay:55, time:26},
        {elem:$("g#_x31_1>path"), back:false, debugColor:"blue",delay:65, time:50},
        {elem:$("g#_x39_>path"),  back:false, debugColor:"green",delay:48, time:50},
    ].map(function(cfg){
      var self = cfg.elem;
      
      if (cfg.back){//some lines might be have drawn the reversed direction
        return TweenMax.fromTo(self, cfg.time||150, {drawSVG:"0% 0%"}, {
            drawSVG:"0% 100%",
            delay:cfg.delay||0,
            immediateRender:false,//prevents from starting the animation until added to TimeLine 
            }); //back:true
      } else {
        return TweenMax.fromTo(self, cfg.time||150, {drawSVG:"100% 100%"}, {
            drawSVG:"0% 100%",
            delay:cfg.delay||0,
            immediateRender:false,//prevents from starting the animation until added to TimeLine 
            }); //back:false
      }
    });

    timeLine.add(sequence);//.restart();

    MAZEscene.setTween(timeLine).addTo(controller);


    // CIRCLE bars EVENT FORECAST

    [
     {parent:"div.red-circle"  , percent:78, image:"circularBarRed.png"},
     {parent:"div.blue-circle" , percent:100, image:"circularBarBlue.png"},
     {parent:"div.green-circle", percent:90, image:"circularBarGreen.png"},

    ].forEach(function(settings){
        var scene = new ScrollMagic.Scene({
            triggerElement: settings.parent,
            duration:150,
            triggerHook:"onCenter",
        })
        .setTween(new CircleAnimation(settings).timeLine)
        .addTo(controller);
    });
})