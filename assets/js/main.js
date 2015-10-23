$(document).ready(function(){
    $('.circle').click(function(){
        $(this).toggleClass('is-active');
        $('.nav').toggleClass('show-nav');
    });

//loading finnished
    var startElements = $("#roadContainer p").get()
        .concat($(".roadicons").get())
        .concat($(".roadiconsDark").get());
    var onLoadTL = new TimelineMax()
        .add([
            TweenMax.fromTo($("#header").get(), 0.5, {css:{opacity:0, "margin-top":"-=50px", "margin-bottom":"+=50px"}},{css:{opacity:1, "margin-top":"+=50px", "margin-bottom":"-=50px"}}),
            TweenMax.fromTo(startElements, 0.5, {css:{opacity:0, top:"-=50px"}},{css:{opacity:1, top:"+=50px"}})
        ]);
//start scrolling controllers
    var controller = new ScrollMagic.Controller();
    var Xease = Sine.easeOut,
        // Yease = SlowMo.ease.config(0.3, 0.4, false),
        Yease = Sine.easeIn,
        delayStep=0.1,
        endPositions={
            left : {x:550, y:1066},
            right: {x:660, y:1066},
        }
        yInTunnel = 1066,
        xLeft = 420,
        xRight = 580,
    tweensInsideFunnel = [
        {icon:".iconShoe",        pos:"right", duration:1.0},//goes out 1st
        {icon:".iconSpeedometer", pos:"left" , duration:1.1},//2nd
        {icon:".iconSun",         pos:"right", duration:1.2},
        {icon:".iconBiker",       pos:"left" , duration:1.35},
        {icon:".iconRun",         pos:"right", duration:1.45},
        {icon:".iconHeartbeat",   pos:"left" , duration:1.55},
        {icon:".iconWaves",       pos:"right", duration:1.75},
        {icon:".iconPeaks",       pos:"left" , duration:1.85},
    ].map(function(settings, index){
        var element = $(settings.icon),
        pos = endPositions[settings.pos]
        iconTweens = [
            TweenMax.to(element, settings.duration, { force3D:true, left: pos.x, ease: Xease}),
            TweenMax.to(element, settings.duration, { force3D:true, top : pos.y, ease: Yease}),
        ];
        return iconTweens;
    }).reduce(function(last, next){
        return last.concat(next);
    },[]);
    var scene = new ScrollMagic.Scene({
        // triggerElement: "#elevation>span",
        duration:500,// keep this synched with the value used with TweenMax.to(element)
        offset:0,
        triggerHook:"onLeave"
        // triggerHook:"onCenter"
    })
    .setTween(new TimelineMax().add(tweensInsideFunnel))
    .addTo(controller);

    // FEATUREs paralax
    [
    {id: "#features .data", startY:"80px", endY:"-78px"},
    {id: "#features .analyze", startY:"125px", endY:"34px"},
    {id: "#features .achieve", startY:"50px", endY:"-78px"},
    ].forEach(function(element, index){
        var paralaxScene = new ScrollMagic.Scene({
            triggerElement: element.id,
            duration: 1000,
            triggerHook: "onEnter"})
        .setTween(new TimelineMax().fromTo($(element.id), 1.0, {css:{'background-position-y': element.startY}}, {css:{'background-position-y': element.endY}})    )
        .addTo(controller);
    });
    [
        // {id:"#MazeWrapper",                     trigger:"#MazeWrapper"   , delay:0.25, tweenTime:0.5, staggerTime:0.3, duration:700},
    // signUp button
        {id:"#signup-button",                   trigger:"#signup-button" , delay:0   , tweenTime:0.5, staggerTime:0, duration:700},
    // FUTURE RELEASE FEATUREs paralax
        {id:"#future-release>div.left>ul>li",   trigger:"#future-release>div.left>ul>li:first-child", delay:0.15, tweenTime:0.4, staggerTime:0.1, duration:500},
        {id:"#future-release>div.right>ul>li",  trigger:"#future-release>div.left>ul>li:first-child", delay:0.15, tweenTime:0.4, staggerTime:0.1, duration:500},
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
            {css:{'opacity': 0.0}},//from data
            {css:{'opacity': 1.0}, delay:settings.delay},// to data
            settings.staggerTime)//distance between starts,
        )
        .addTo(controller);
    });



    var MAZEscene = new ScrollMagic.Scene({
        triggerElement: "#MazeWrapper",
        duration: 500, // sliding those number of pixels to complete the MAZE animation
        triggerHook: "onEnter",
        offset:300 // wait to pass offset pixel before starting with the SVGdraw
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
      
      if (1){// if you want to debug something and see different elements in colors
        timeLine.set(self,{css:{stroke:cfg.debugColor}});
      } else {
        timeLine.set(self,{css:{stroke:"#364548"}});
      }
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

})