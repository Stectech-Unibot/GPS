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

    var paralax = new ScrollMagic.Scene({
        triggerElement: "#features .data",
        duration:1000,
        // offset:0,
        triggerHook:"onEnter"
        // triggerHook:"onCenter"
    })
    .setTween(new TimelineMax()
        .to($("#features .data"), 1.0,
            {css:{'background-position-y': "-58px"}}
        )
    )
    .addTo(controller);
});