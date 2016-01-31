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

        this.map = this.game.add.tilemap('islandMap');
        this.map.addTilesetImage('island', 'islandMap');
        this.backgroundlayer = this.map.createLayer('background');
        this.backgroundlayer.resizeWorld();

        this.layerobjects_tiles = this.physics.p2.convertCollisionObjects(this.map,'collisions');   // this converts the polylines of the tiled - object layer into physics bodies.. make sure to use the "polyline" tool and not the "polygon" tool - 

        // this.islandWalk.scale.setTo(0.3);
        // this.islandWalk.alpha = 0.5;

        this.ham = this.add.sprite(this.worldSizeX/2, this.worldSizeY/2, 'ham', 'front_idle_01');
        this.ham.anchor.set(0.5);
        this.ham.scale.setTo(0.08);

        this.llama = this.add.sprite(300, this.worldSizeY - 310, 'llama', 'llama_idle_01');
        this.llama.scale.setTo(0.06);

        this.physics.p2.enable(this.ham,true);
        this.ham.body.setZeroDamping();
        this.ham.body.setZeroVelocity();
        this.ham.body.fixedRotation = true;
        this.ham.body.setRectangle(25,50,5,10);


        // this.physics.p2.enable(this.llama,true);
        // this.llama.body.static = true;

        this.cursors = this.input.keyboard.createCursorKeys();


        this.ham.animations.add('front_idle', Phaser.Animation.generateFrameNames('front_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('front_run', Phaser.Animation.generateFrameNames('front_run_', 1, 2, '', 2), 5, true);

        this.ham.animations.add('back_idle', Phaser.Animation.generateFrameNames('back_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('back_run', Phaser.Animation.generateFrameNames('back_run_', 1, 2, '', 2), 5, true);

        this.ham.animations.add('side_idle', Phaser.Animation.generateFrameNames('side_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('side_run', this.runFrames, 10, true);

        this.ham.animations.play('front_idle');

        this.llama.animations.add('idle', Phaser.Animation.generateFrameNames('llama_idle_', 1,2,'',2), 1, true);
        this.llama.animations.add('talk', Phaser.Animation.generateFrameNames('llama_talk_', 1,2,'',2), 1, true);
        this.llama.animations.play('talk');

        this.velocity = 200;
        this.direction = 'front';

        this.camera.follow(this.ham);

        console.log(this.ham.body.debug);

    }

    update() {
        this.movement();
    }

    render() {
        this.game.debug.spriteInfo(this.ham,32,32);
    }

    createPreviewBounds(x, y, w, h) {

        var sim = this.physics.p2;

        //  If you want to use your own collision group then set it here and un-comment the lines below
        // var mask = sim.boundsCollisionGroup.mask;

        this.customBounds.left = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: 1.5707963267948966 });
        this.customBounds.left.addShape(new p2.Plane());
        // customBounds.left.shapes[0].collisionGroup = mask;

        this.customBounds.right = new p2.Body({ mass: 0, position: [ sim.pxmi(x + w), sim.pxmi(y) ], angle: -1.5707963267948966 });
        this.customBounds.right.addShape(new p2.Plane());
        // customBounds.right.shapes[0].collisionGroup = mask;

        this.customBounds.top = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y) ], angle: -3.141592653589793 });
        this.customBounds.top.addShape(new p2.Plane());
        // customBounds.top.shapes[0].collisionGroup = mask;

        this.customBounds.bottom = new p2.Body({ mass: 0, position: [ sim.pxmi(x), sim.pxmi(y + h) ] });
        this.customBounds.bottom.addShape(new p2.Plane());
        // customBounds.bottom.shapes[0].collisionGroup = mask;

        sim.world.addBody(this.customBounds.left);
        sim.world.addBody(this.customBounds.right);
        sim.world.addBody(this.customBounds.top);
        sim.world.addBody(this.customBounds.bottom);

    }

    movement(){
        this.ham.body.setZeroVelocity();
        this.ham.scale.setTo(0.08);

        if (this.cursors.left.isDown) {
            this.ham.body.moveLeft(this.velocity);
            this.ham.scale.setTo(-0.08, 0.08);
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
                    this.ham.scale.setTo(-0.08, 0.08);
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

}
