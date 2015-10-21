$(document).ready(function(){
    $('.circle').click(function(){
        $(this).toggleClass('is-active');
        $('.nav').toggleClass('show-nav');
    });
    var controller = new ScrollMagic.Controller();
    var Xease = Sine.easeOut,
        // Yease = SlowMo.ease.config(0.3, 0.4, false),
        Yease = Sine.easeIn,
        delayStep=0.1,
        endPositions={
            left : {x:450, y:1066},
            right: {x:560, y:1066},
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
        duration:1000,// keep this synched with the value used with TweenMax.to(element)
        offset:0,
        triggerHook:"onLeave"
        // triggerHook:"onCenter"
    })
    .setTween(new TimelineMax().add(tweensInsideFunnel))
    .addTo(controller);

    // FEATUREs paralax
    [
    {id: "#features .data", startY:"80px", endY:"-78px"},
    {id: "#features .analyze", startY:"50px", endY:"-78px"},
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
        {id:"#MazeWrapper",                     trigger:"#MazeWrapper"   , delay:0.25, tweenTime:0.5, staggerTime:0.3},
    // signUp button
        {id:"#signup-button",                   trigger:"#signup-button" , delay:0   , tweenTime:0.5, staggerTime:0},
    // FUTURE RELEASE FEATUREs paralax
        {id:"#future-release>div.left>ul>li",   trigger:"#future-release", delay:0.15, tweenTime:0.4, staggerTime:0.3},
        {id:"#future-release>div.right>ul>li",  trigger:"#future-release", delay:0.15, tweenTime:0.4, staggerTime:0.3},
    //REQUEST EARLY ACCESS
        {id:"#request-access>div",              trigger:"#request-access", delay:0.2 , tweenTime:0.4, staggerTime:0.4},
    ].forEach(function(settings, index){
        var paralaxScene = new ScrollMagic.Scene({
            triggerElement: settings.trigger,
            duration: 700,
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

});