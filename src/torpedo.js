
var torpedosInFlight = 0;
//const TORPEDO = 581; // 

/**
 * TODO: will use less resources to keep track of torpedos in a data structure as they are created vs looping through all beads
 */
const moveTorpedos = (torpedoLocations) => {
    for(let index=0; index<torpedoLocations.length; index++) {
        PS.glyph(torpedoLocations[index].x, torpedoLocations[index].y, "");
        if(torpedoLocations[index].y >= TOP_ROW+1) {
            PS.glyph(torpedoLocations[index].x, torpedoLocations[index].y-1, TORPEDO);
        } else {
            torpedosInFlight--;
        }
    }
    ticking = false;
}

const torpedo = {
    sprite: 94,

    // max allowed torpedos
    max: 5,

    /**
     * array of torpedos with coordinates
     * [{x: 1, y: 2}]
     */
    map: [],

    allowed: function() {
      return (this.map.length < this.max);
    },

    fire: function(x, y) {
        PS.audioPlay( "fx_shoot3" );
        PS.glyph(x, y, this.sprite);
        this.map.push({x: x, y: y});
    },

    travel: function(callback, ceiling) {
        this.map.forEach((torpedo, index) => {
            PS.glyph(torpedo.x, torpedo.y, ""); // clear current position
            if(torpedo.y >= ceiling) {
                PS.glyph(torpedo.x, torpedo.y-1, this.sprite);
                this.map.splice(index, 1, {
                    x: torpedo.x, 
                    y: torpedo.y-1 
                });
            } else {
                this.map.splice(index, 1);
            }
        });
        callback();
    }
};


export { torpedo };

