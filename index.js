/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

import './lib/clamp.js';
import Quadkey from './lib/quadkey.js';
import BingMaps from './lib/bingmaps.js';

/**
 * Bing Maps component for A-Frame.
 */
AFRAME.registerComponent('bingmaps', {
    schema: {
        center: {
            default: [0,0],
            type: 'array'
        },
        type: {
            default: 'aerial',
            type: 'string'
        },
        key: {
            default: '',
            type: 'string'
        },
        zoom: {
            default: 0,
            type: 'int'
        }
    },

    /**
    * Set if component needs multiple instancing.
    */
    multiple: false,

    /**
    * Called once when component is attached. Generally for initial setup.
    */
    init: function () {

        let quadkeytools = new Quadkey();
        let bingmaps = new BingMaps(this.data.type, this.data.key);

        this.metadata = {};

        bingmaps.getMetadata().then( (response) => {
            this.metadata = response;
            console.log(bingmaps.quadkeyToUrl('01230123'));
        });

    },

    /**
    * Called when component is attached and when component data changes.
    * Generally modifies the entity based on the data.
    */
    update: function (oldData) { },

    /**
    * Called when a component is removed (e.g., via removeAttribute).
    * Generally undoes all modifications to the entity.
    */
    remove: function () { },

    /**
    * Called on each scene tick.
    */
    // tick: function (t) { },

    /**
    * Called when entity pauses.
    * Use to stop or remove any dynamic or background behavior such as events.
    */
    pause: function () { },

    /**
    * Called when entity resumes.
    * Use to continue or add any dynamic or background behavior such as events.
    */
    play: function () { },

    /**
    * Event handlers that automatically get attached or detached based on scene state.
    */
    events: {
        // click: function (evt) { }
    }
});
