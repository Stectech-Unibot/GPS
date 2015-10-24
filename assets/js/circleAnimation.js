var CircleAnimation = (function(){
    var BASE_PATH = "archive/img/pump/";
    var GRAY_IMAGE = BASE_PATH + "circularBarGray.png";
    var CircleAnimation = function(settings){
        this.settings = settings;
        this.renderer = PIXI.autoDetectRenderer(217, 217, { antialias: true,'transparent':true });
        $(this.settings.parent).get(0).appendChild(this.renderer.view);
        this.percentID = $(this.settings.parent+">span");
        PIXI.Container.call(this);
        this.MASK = this.addChild(new PIXI.Graphics());
        this.MASK.position.set(this.renderer.width/2,this.renderer.height/2)
        this.progress = 0;
        this.initGraphics();
        this.R = this.renderer.width/2+1;

        this.updateProgress();
        this.timeLine = new TimelineMax().fromTo(this, 1, {progress:0}, {
                progress:this.settings.percent/100,
                immediateRender:false,
                onUpdate:this.updateProgress.bind(this),
            } )
        this.updateStage();
        this.main.mask = this.MASK;
    }
    CircleAnimation.prototype = Object.create(PIXI.Container.prototype);
    CircleAnimation.prototype.updateStage = function(){
        this.renderer.render(this);
        requestAnimationFrame(this.updateStage.bind(this));
    };

    CircleAnimation.prototype.updateProgress = function(){
        var currentDegrees = 2*Math.PI * this.progress;
        var value = this.progress * 100;
        this.percentID.html(value.toFixed(0)+"%");
        this.MASK
            .clear()
            .beginFill(0x00FF00, 1)
            .moveTo(0,-this.renderer.width/2)
            // .drawRect(0,0,this.renderer.width/2*this.progress,this.renderer.height*this.progress)
            .arc(0,0, this.R, -Math.PI/2, currentDegrees-Math.PI/2, false)
            .lineTo(0,0)
            .lineTo(0,-this.renderer.width/2)
            .endFill();
    };

    CircleAnimation.prototype.initGraphics = function(first_argument) {
        this.bg = this.addChild(PIXI.Sprite.fromImage( GRAY_IMAGE ));
        this.bg.anchor.set(0.5,0.5);
        this.bg.position.set(this.renderer.width/2, this.renderer.height/2);

        this.main = this.addChild(PIXI.Sprite.fromImage( BASE_PATH+this.settings.image ));
        this.main.anchor.set(0.5,0.5);
        this.main.position.set(this.renderer.width/2, this.renderer.height/2);
    };

    return CircleAnimation;
})();
