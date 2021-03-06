/*
 * The `assets` module
 * ============================================================================
 *
 * Use this module to declare static Phaser Asset Packs, that would be loaded
 * using the `Loader#pack` API.
 *
 * Regarding how the game assets should be declared using this file, refer to
 * the sample `assetPack.json` included in the Phaser package, under
 * `node_modules/phaser/resources/` directory, for a more complete
 * reference.
 *
 */


export
default {

    // - Boot Assets ------------------------------------------------------------
    boot: [{
        key: 'splash-screen',
        type: 'image'
    },

    {
        key: 'progress-bar',
        type: 'image'
    }
    ],

    // - Game assets ------------------------------------------------------------
    game: [{
        key: 'phaser',
        type: 'image'
    },{
        key: 'ui',
        type: 'atlasJSONHash'
    },{
        key: 'ham',
        type: 'atlasJSONHash',
        textureURL: 'sprites/ham.png',
        atlasURL: 'sprites/ham.json'
    },{
        key: 'llama',
        type: 'atlasJSONHash'
    },{
        key: 'misc',
        type: 'atlasJSONHash'
    },{
        key: 'icon',
        type: 'atlasJSONHash'
    },{
        key: 'box',
        type: 'atlasJSONHash'
    },{
        key: 'dialog',
        type: 'atlasJSONHash'
    },{
        key: 'island',
        type: 'image'
    },{
        key: 'islandMap',
        type: 'tilemap',
        format: 'TILED_JSON'
    },{
        key: 'islandMap',
        type: 'image'
    },{
        key: 'initial_ham',
        type: 'image'
    },{
        key: 'initial_rayo',
        type: 'image'
    }

    // Example: adding a background music.
    // {
    //   key: 'tune',
    //   type: 'audio',
    //   urls: [ 'tune.oga', 'tune.m4a' ]
    // }

    // Example: adding a audio sprite containing sound effects.
    // {
    //   key: 'sfx',
    //   type: 'audiosprite',
    //   urls: [ 'sfx.m4a' ],
    //   jsonURL: 'sfx.json'
    // }
    ]

};
