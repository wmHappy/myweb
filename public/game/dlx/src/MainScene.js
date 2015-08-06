/**
 * Created by Dall on 15/7/20.
 */
var MainScene = cc.Scene.extend({

    _layers:null,
    _indexPos:0,  //当前位置

    onEnter:function () {
        this._super();
        this._layers = [];

        cc.audioEngine.playMusic("./music/bgMusic.mp3", true);

        var layerOne = new LayerOne();
        var layerTwo = new LayerTwo();
        var layerThree = new LayerThree();
        var layerFour = new LayerFour();
        var layerFive = new LayerFive();

        layerTwo.setPositionY(-layerOne._getHeight()*2);
        layerThree.setPositionY(-layerOne._getHeight()*3);
        layerFour.setPositionY(-layerOne._getHeight()*4);
        layerFive.setPositionY(-layerOne._getHeight()*5);

        this.addLayer(layerOne);
        this.addLayer(layerTwo);
        this.addLayer(layerThree);
        this.addLayer(layerFour);
        this.addLayer(layerFive);

        layerOne.initSprPos();
        layerOne.startRun();

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            //swallowTouches: true,
            onTouchBegan: this.onTouchBegan.bind(this),
            onTouchMoved: this.onTouchMoved.bind(this),
            onTouchEnded: this.onTouchEnded.bind(this),
        }, this);
    },

    addLayer:function(layer){
        this._layers.push(layer);
        this.addChild(layer);
    },

    nY:0,
    oY:0,
    startY:0,
    endY:0,
    onTouchBegan:function(touch, event){
        this.oY =  touch.getLocation().y;
        this.startY = touch.getLocation().y;
        return true;
    },

    onTouchMoved: function (touch, event) {
        this.nY = touch.getLocation().y;
        var num = this.nY - this.oY;
        if(num>0) {
            this._layers[this._indexPos].y += num;
        }else {
            this._layers[this._indexPos].y += num;
        }
        var yy = this._layers[this._indexPos].y;
        this._layers[this._indexPos].setScale(1-(yy/2000));
        this.oY = touch.getLocation().y;
    },

    onTouchEnded:function(touch, event){
        var previous = this._layers[this._indexPos-1];
        var index = this._layers[this._indexPos];
        var next = this._layers[this._indexPos+1];
        this.endY =  touch.getLocation().y;
        var num = this.startY - this.endY;
        if(num > 300) {
            if(!previous){
                index.toIndex();
                return;
            }
            index.xia();
            previous.toIndex();
            this._indexPos--;
        }else if (num < -300){
            if(!next){
                index.toIndex();
                return;
            }
            index.shang();
            next.toIndex();
            this._indexPos++;
        }else { //不变
            index.toIndex();
            return;
        }
        this._layers[this._indexPos].initSprPos();
        this._layers[this._indexPos].startRun();
    }

});