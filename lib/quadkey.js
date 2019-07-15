'use strict';

class Quadkey {

    constructor ( parameters ) {

        if (parameters === undefined) parameters = {};

        this.EarthRadius = (parameters.EarthRadius !== undefined) ? parameters.EarthRadius : 6378137;
        this.MinLatitude = (parameters.MinLatitude !== undefined) ? parameters.MinLatitude : -85.05112878;
        this.MaxLatitude = (parameters.MaxLatitude !== undefined) ? parameters.MaxLatitude : 85.05112878;
        this.MinLongitude = (parameters.MinLongitude !== undefined) ? parameters.MinLongitude : -180.0;
        this.MaxLongitude = (parameters.MaxLongitude !== undefined) ? parameters.MaxLongitude : 180.0;

    }

    locationToPixel (location, detail) {
        // convert a lat,lng into a pixel position

        let lat = Math.clamp(location.lat, this.MinLatitude, this.MaxLatitude);
        let lng = Math.clamp(location.lng, this.MinLongitude, this.MaxLongitude);

        let x = (lng + 180) / 360;
        let sin = Math.sin(lat * Math.PI / 180);
        let y = 0.5 - Math.log((1 + sin) / (1 - sin)) / (4 * Math.PI);

        let pixels = (256 << detail) >>> 0;  // How many pixels wide/tall the map is. The `>>> 0` part makes it unsigned.

        return {
            x : Math.floor(Math.clamp( x * pixels + 0.5, 0, pixels - 1)),
            y : Math.floor(Math.clamp( y * pixels + 0.5, 0, pixels - 1))
        }
    }

    pixelToTile (pixel) {
        // convert a pixel position to a tile position.
        // the one that came with QuadKeyTools gave the wrong result.

        return {
            x : pixel.x / 256,
            y : pixel.y / 256
        };

    }

    quadkeyParent (quadkey) {
        return quadkey.slice(0, -1);
    }

    quadkeyChildren (quadkey) {
        return [0,1,2,3].map( i => { return quadkey.concat(i) } );
    }

    quadkeySiblings (quadkey) {
        return this.quadkeyChildren( this.quadkeyParent(quadkey) ).filter( i => { return i !== quadkey } );
    }

    quadkeyNeighbors (quadkey) {
        return []; // TODO: Implement quadkeyNeighbors
    }


}

window.Quadkey = Quadkey;
export default Quadkey;
