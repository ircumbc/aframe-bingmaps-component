class BingMaps {

    constructor( type, key ) {

        this.type = type;
        this.key = key;
        this.metadata = {};

    }

    /**
     * Request the metadata from Bing Maps that we will use to set the map tile image URLs.
     */
    getMetadata () {

        let metadata_url = `//dev.virtualearth.net/REST/V1/Imagery/Metadata/${this.type}?output=json&include=ImageryProviders&key=${this.key}`;

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

                resolve( this.metadata );
            }).catch( (error) => {
                throw new Error('Failed to get Bing Maps metadata from dev.virtualearth.net.', error);
                reject();
            });
        });
    }

    /**
     * Convert a quadkey into a Bing Maps URL.
     */
    quadkeyToUrl ( quadkey ) {
        // Must have called getMetadata ahead of time.

        // The BingMaps documentation suggests that you randomize the subdomain
        // to distrubute the load across several servers. However, from my testing
        // it hurts the in browser caching if the subdomain changes for the same
        // image. To work around this fact, we'll just hash a quadkey to a subdomain
        let index = Number.parseInt(quadkey) & this.metadata.imageUrlSubdomains.length;
        let subdomain = this.metadata.imageUrlSubdomains[index];

        return this.metadata.imageUrl.replace('{subdomain}', subdomain).replace('{quadkey}', quadkey);
    }

};

export default BingMaps;
