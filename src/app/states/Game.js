/*
 * Game state
 * ============================================================================
 *
 * A sample Game state, displaying the Phaser ham.
 */


export
default class Game extends Phaser.State {

    create() {
        const {
            centerX: x,
            centerY: y
        } = this.world;

        this.runFrames = [
            'side_idle_01',
            'side_run_01',
            'side_run_03',
            'side_run_01',
        ];

        this.physics.startSystem(Phaser.Physics.ARCADE);

        this.ham = this.add.sprite(x, y, 'ham', 'front_idle_01');

        this.physics.arcade.enable(this.ham);
        this.ham.body.collideWorldBounds = true;
        this.cursors = this.input.keyboard.createCursorKeys();

        this.ham.anchor.set(0.5);
        this.ham.scale.setTo(0.08);

        this.ham.animations.add('front_idle', Phaser.Animation.generateFrameNames('front_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('front_run', Phaser.Animation.generateFrameNames('front_run_', 1, 2, '', 2), 5, true);

        this.ham.animations.add('back_idle', Phaser.Animation.generateFrameNames('back_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('back_run', Phaser.Animation.generateFrameNames('back_run_', 1, 2, '', 2), 5, true);

        this.ham.animations.add('side_idle', Phaser.Animation.generateFrameNames('side_idle_', 1, 2, '', 2), 1, true);
        this.ham.animations.add('side_run', this.runFrames, 10, true);

        this.ham.animations.play('front_idle');

        this.velocity = 200;
        this.direction = 'front';

    }

    update() {
        this.ham.body.velocity.x = 0;
        this.ham.body.velocity.y = 0;
        this.ham.scale.setTo(0.08);
        // var oldDirection = this.direction;

        if (this.cursors.left.isDown) {
            this.ham.body.velocity.x = -this.velocity;
            this.ham.scale.setTo(-0.08, 0.08);
            this.direction = 'left';
            if (this.ham.animations.currentAnim !== 'side_run') {
                this.ham.animations.play('side_run');
            }
        } else if (this.cursors.right.isDown) {
            this.ham.body.velocity.x = this.velocity;
            this.direction = 'right';
            if (this.ham.animations.currentAnim !== 'side_run') {
                this.ham.animations.play('side_run');
            }
        } else if (this.cursors.up.isDown) {
            this.ham.body.velocity.y = -this.velocity;
            this.direction = 'back';
            if (this.ham.animations.currentAnim !== 'back_run') {
                this.ham.animations.play('back_run');
            }
        } else if (this.cursors.down.isDown) {
            this.ham.body.velocity.y = this.velocity;
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

        // if (oldDirection !== this.direction) {
        //     this.ham.animations.stop();
        //     console.log(this.direction + ' - ' + this.ham.body.velocity.x + ' - ' + this.ham.body.velocity.y);
        //     switch (this.direction) {
        //         case 'front':
        //             if (this.ham.body.velocity.y !== 0) {
        //                 this.ham.animations.play('front_run');
        //             } else {
        //                 this.ham.animations.play('front_idle');
        //             }
        //             break;
        //         case 'back':
        //             if (this.ham.body.velocity.y < 0) {
        //                 this.ham.animations.play('back_run');
        //             } else {
        //                 this.ham.animations.play('back_idle');
        //             }
        //             break;
        //         case 'left':
        //         case 'right':
        //             if (this.ham.body.velocity.x !== 0) {
        //                 this.ham.animations.play('side_run');
        //             } else {
        //                 this.ham.animations.play('side_idle');
        //             }
        //             break;
        //         default:
        //             this.ham.animations.play('front_idle');
        //             break;
        //     }
        // }
    }

}
