/* global AFRAME */

if (typeof AFRAME === 'undefined') {
    throw new Error('Component attempted to register before AFRAME was available.');
}

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

        this.metadata = {};

        this.get_metadata().then( () => {
            console.log(this.get_tile_url('123123123123123'));
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
    },

    /**
     * Request the metadata from Bing Maps that we will use to set the map tile image URLs.
     */
    get_metadata: function () {
        let type = this.data.type;
        let key = this.data.key;

        var metadata_url = `//dev.virtualearth.net/REST/V1/Imagery/Metadata/${type}?output=json&include=ImageryProviders&key=${key}`;

        return new Promise( (resolve, reject) => {
            fetch(metadata_url).then( (response) => {
                return response.json();
            }).then( (data) => {
                let imageUrl = data.resourceSets[0].resources[0].imageUrl;

                if (location.protocol === 'https:') {
                    imageUrl = imageUrl.replace(/^http:/gi, 'https:');
                }

                this.metadata = {
                    imageUrl : imageUrl,
                    imageUrlSubdomains : data.resourceSets[0].resources[0].imageUrlSubdomains
                };

                resolve();
            }).catch( (error) => {
                throw new Error('Failed to get Bing Maps metadata from dev.virtualearth.net.', error);
                reject();
            });
        });
    },

    get_tile_url: function(quadkey) {

        let index = parseInt(quadkey) & this.metadata.imageUrlSubdomains.length;
        let subdomain = this.metadata.imageUrlSubdomains[index];
        return this.metadata.imageUrl.replace('{subdomain}', subdomain).replace('{quadkey}', quadkey);

    },


});
