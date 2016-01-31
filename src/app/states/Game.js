/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser ham.
 */


export
default class Game extends Phaser.State {

    create() {
        // const {
        //     centerX: x,
        //     centerY: y
        // } = this.world;

        this.runFrames = [
            'side_idle_01',
            'side_run_01',
            'side_run_03',
            'side_run_01'
        ];

        this.worldSizeX = 1400;
        this.worldSizeY = 1000;

        this.physics.startSystem(Phaser.Physics.P2JS);
        this.physics.p2.defaultRestitution = 0.8;
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.velocity = 200;
        this.direction = 'front';
        this.debug = false;


        this.createMap();
        this.createTrees();
        this.characters = this.add.group();
        this.createLlama();
        this.createHam();
        this.createDialog();


        this.actionButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.actionButton.onDown.add(this.manageDialog, this);

        var startBtt = this.add.button(25, 25, 'ui', this.click, this, 'back_idle', 'back_hover', 'back_press');
        startBtt.anchor.set(0, 0);
        startBtt.scale.setTo(0.2);
        startBtt.fixedToCamera = true;

    }

    click() {
        this.state.start('Menu');
    }

    createDialog(){
        this.dialog = this.add.group();
        this.dialog.fixedToCamera = true;
        this.dialog.alpha = 0;
        this.dialogBox = this.dialog.create(0,480,'dialog');
        this.dialogBox.frame = 2;
        this.dialogBox.anchor.set(0,1);
        this.dialogtex = this.add.text(250,300, 'NAKED', {font: '50px Arial', fill: '#333333'});
        this.dialog.add(this.dialogtex);
    }

    createMap () {
        this.map = this.game.add.tilemap('islandMap');
        this.map.addTilesetImage('island', 'islandMap');

        this.backgroundlayer = this.map.createLayer('background');
        this.backgroundlayer.resizeWorld();

        this.layerobjects_tiles = this.physics.p2.convertCollisionObjects(this.map,'objs');   // this converts the polylines of the tiled - object layer into physics bodies.. make sure to use the "polyline" tool and not the "polygon" tool - 
    }

    createTrees () {
        this.trees = this.add.group();
        var objData = [
            { x: 580, y: 250, scale:0.8 , key:'bush'},
            { x: 1050, y: 200, scale:1 , key:'bush'},
            { x: 1000, y: 220, scale:1 , key:'bush'},
            { x: 500, y: 150, scale:0.8 , key:'tree'},
            { x: 600, y: 160, scale:0.8, key:'tree'},
            { x: 800, y: 140, scale:0.7, key:'tree'},
            { x: 680, y: 150, scale:1, key:'tree'},
            { x: 350, y: 300, scale:0.6, key:'tree'},
            { x: 320, y: 530, scale:1, key:'tree'},
            { x: 900, y: 620, scale:0.8, key:'tree'},
            { x: 1330, y: 530, scale:1 , key:'bush'},
            { x: 1300, y: 350, scale:0.9, key:'tree'},
            { x: 625, y: 285, scale:1, key:'laguna'},
            { x: 1220, y: 390, scale:1, key:'tree'}
        ];
        
        for (var i=0; i < objData.length; ++i) {
            var t = this.trees.create(objData[i].x,objData[i].y,'misc', objData[i].key);
            t.scale.setTo(objData[i].scale);
        }
        this.trees.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    createHam () {
        this.ham = this.characters.create(this.worldSizeX/2, this.worldSizeY/2, 'ham', 'front_idle_01');
        this.ham.anchor.set(0.5);

        this.physics.p2.enable(this.ham,this.debug);
        this.ham.body.setZeroDamping();
        this.ham.body.setZeroVelocity();
        this.ham.body.fixedRotation = true;
        this.ham.body.setRectangle(25,50,5,10);

        this.ham.animations.add('front_idle', Phaser.Animation.generateFrameNames('front_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('front_run', Phaser.Animation.generateFrameNames('front_run_', 1, 2, '', 2), 5, true);

        this.ham.animations.add('back_idle', Phaser.Animation.generateFrameNames('back_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('back_run', Phaser.Animation.generateFrameNames('back_run_', 1, 2, '', 2), 5, true);

        this.ham.animations.add('side_idle', Phaser.Animation.generateFrameNames('side_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('side_run', this.runFrames, 10, true);

        this.ham.animations.play('front_idle');
        this.camera.follow(this.ham);
        // this.trees.add(this.ham);

        this.icon = this.add.sprite(this.ham.x, this.ham.y, 'icon');
        this.icon.anchor.set(0.5);
        this.icon.alpha = 0;
        console.log(this.ham.body.debug);
    }

    createLlama () {
        this.llama = this.characters.create(450, this.worldSizeY - 280, 'llama', 'llama_idle_01');

        this.llama.animations.add('idle', Phaser.Animation.generateFrameNames('llama_idle_', 1,2,'',2), 1, true);
        this.llama.animations.add('talk', Phaser.Animation.generateFrameNames('llama_talk_', 1,2,'',2), 1, true);
        this.llama.animations.play('idle');
        this.physics.p2.enable(this.llama,this.debug);
        this.llama.body.static = true;
        this.llama.body.setRectangle(50,20,-5,40);
    }

    update() {
        this.movement();
        this.checkOverlapManually();
        this.characters.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    render() {
        // this.game.debug.spriteInfo(this.ham,32,32);
        if(this.debug){
            this.game.debug.text('Sprite z-depth: ' + this.ham.z, 10, 20);
        }
    }

    checkOverlapManually() {
        this.overlap = false;
        var dx = this.ham.body.x - this.llama.body.x; //distance ship X to enemy X       
        var dy = this.ham.body.y - this.llama.body.y; //distance ship Y to enemy Y        
        var dist = Math.sqrt(dx * dx + dy * dy); //pythagoras ^^  (get the distance to each other)       
        if (dist < this.llama.width + this.ham.width) { // if distance to each other is smaller than both radii together a collision/overlap is happening           
            this.overlap = true;
            this.showAction();
        }else{
            this.dialog.alpha = 0;
            this.talk = 0;
            this.icon.alpha = 0;
        }
    }


    manageDialog(){
        this.dialog.alpha = 1;
        var dialogs = [
            'AHHHHHHH',
            'HEY YOU \n ARE NAKED!!'
        ];


        if(this.talk === dialogs.length){
            this.fade();
            this.dialog.alpha = 0;
            this.llama.animations.play('idle');
            this.dialogBox.frame = 2;
            this.talk ++;
        }else if (this.talk > dialogs.length){
            this.click();
        }else {
            this.llama.animations.play('talk');
            this.dialogtex.text = dialogs[this.talk];
            if(this.talk > 0){
                this.dialogBox.frame = 1;
            }
            this.talk ++;
        }

    }

    showAction (){
        this.icon.alpha = 1;
        this.icon.x = this.ham.x + 50;
        this.icon.scale.setTo(1,1);
        if(this.direction === 'left'){
            this.icon.x = this.ham.x - 50;
            this.icon.scale.setTo(-1,1);
        }
        this.icon.y = this.ham.y - 35;
    }

    movement(){
        this.ham.body.setZeroVelocity();

        this.ham.scale.setTo(1,1);
        if (this.cursors.left.isDown) {
            this.ham.body.moveLeft(this.velocity);
            this.ham.scale.setTo(-1,1);
            this.direction = 'left';
            if (this.ham.animations.currentAnim !== 'side_run') {
                this.ham.animations.play('side_run');
            }
        } else if (this.cursors.right.isDown) {
            this.ham.body.moveRight(this.velocity);
            this.direction = 'right';
            if (this.ham.animations.currentAnim !== 'side_run') {
                this.ham.animations.play('side_run');
            }
        } else if (this.cursors.up.isDown) {
            this.ham.body.moveUp(this.velocity);
            this.direction = 'back';
            if (this.ham.animations.currentAnim !== 'back_run') {
                this.ham.animations.play('back_run');
            }
        } else if (this.cursors.down.isDown) {
            this.ham.body.moveDown(this.velocity);
            this.direction = 'front';
            if (this.ham.animations.currentAnim !== 'front_run') {
                this.ham.animations.play('front_run');
            }
        } else {
            switch (this.direction) {
                case 'front':
                    this.ham.animations.play('front_idle');
                    break;
                case 'back':
                    this.ham.animations.play('back_idle');
                    break;
                case 'left':
                    this.ham.scale.setTo(-1,1);
                    this.ham.animations.play('side_idle');
                    break;
                case 'right':
                    this.ham.animations.play('side_idle');
                    break;
                default:
                    this.ham.animations.play('front_idle');
                    break;
            }

        }
    }

    fade() {
        var spr_bg = this.game.add.graphics(0, 0);
        spr_bg.fixedToCamera = true;
        spr_bg.beginFill(0xFFFFFF, 1);
        spr_bg.drawRect(0, 0, this.game.width, this.game.height);
        spr_bg.alpha = 0;
        spr_bg.endFill();
        var txtContinue = this.add.text(25,150, 'The adventure of \n Ham & Eggs just begun ... ', {font: '40px Arial', fill: '#333333'});
        txtContinue.fixedToCamera = true;
        txtContinue.alpha= 0;
        var ta = this.add.tween(spr_bg).to({ alpha: 1}, 500, 'Linear', true);
        var tb = this.add.tween(txtContinue).to({ alpha: 1}, 1000, 'Linear', true);

        ta.chain(tb);
        

    }

}
