/*
 * Menu state
 *
 * Main menu of the game
 */


export
default class Menu extends Phaser.State {
    init() {
        // TODO: Stub
    }

    preload() {
        // TODO: Stub
    }

    create() {

        this.world.width = 640;
        this.world.height = 480;
        // this.camera.x=320;
        // this.camera.y=240;
        const {
            centerX: x
            // centerY: y
        } = this.world;

        this.initial_ham = this.add.image(0,0,'initial_ham');
        this.initial_rayo = this.add.image(0,0,'initial_rayo');

        this.rayoTween = this.add.tween(this.initial_rayo).to( { alpha: 0 }, 1000, 'Linear', true, 0, -1);
        this.rayoTween.yoyo(true, 0);

        var startBtt = this.add.button(x - 225, this.world.height-25, 'ui', this.click, this, 'play_idle', 'play_hover', 'play_press');
        startBtt.anchor.set(0.5, 1);
        startBtt.scale.setTo(0.5);

        var aboutBtt = this.add.button(x + 225, this.world.height-25, 'ui', this.goToAbout, this, 'info_idle', 'info_hover', 'info_press');
        aboutBtt.anchor.set(0.5, 1);
        aboutBtt.scale.setTo(0.5);
    }

    update() {
        // TODO: Stub
    }

    render() {
        // TODO: Stub
    }

    click() {
        this.state.start('Game');
    }

    goToAbout(){
        this.state.start('About');
    }

}
