/*
 * Menu state
 *
 * Main menu of the game
 */


export default class Menu extends Phaser.State {
  init () {
    // TODO: Stub
  }

  preload () {
    // TODO: Stub
  }

  create () {
    const { centerX: x, centerY: y } = this.world;
    this.logo = this.add.image(x, y, 'phaser');
    this.logo.anchor.set(0.5);

    this.startBtt = this.add.button(x, y, 'phaser', this.click, this);
    this.startBtt.anchor.set(0.5);
    this.startBtt.anchor.set(0.5);
  }

  update () {
    // TODO: Stub
  }

  render () {
    // TODO: Stub
  }

  click () {
    this.state.start('Game');
  }

}
