/*
 * About state
 *
 * Info about the game
 */


export
default class About extends Phaser.State {
    create() {
        var text = 'code: @arlefreak \n art: @blackwrg';
        this.dialogtex = this.add.text(this.world.centerX - 200, this.world.centerY, text, {
            font: '50px Arial',
            fill: '#333333'
        });

        var startBtt = this.add.button(25, 25, 'ui', this.click, this, 'back_idle', 'back_hover', 'back_press');
        startBtt.anchor.set(0, 0);
        startBtt.scale.setTo(0.2);
    }

    update() {
        // TODO: Stub
    }

    render() {
        // TODO: Stub
    }

    click() {
        this.state.start('Menu');
    }
}
