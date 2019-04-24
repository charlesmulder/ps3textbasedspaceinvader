
var torpedosInFlight = 0;
//const TORPEDO = 581; // 

const torpedo = {
    explosion: 88,
    sprite: 94,

    // max allowed torpedos
    max: 5,
    ticks: 10,
    timer: null,
    ticking: false,

    /**
     * array of torpedos with coordinates
     * [{x: 1, y: 2}]
     */
    hail: [],

    go: function() {
        PS.timerStart(this.ticks, () => {
            if( ! this.ticking) {
                this.ticking = true;
                this.travel(() => {
                    this.ticking = false;
                }, 1);
            }
        });
    },

    allowed: function() {
      return (this.hail.length < this.max);
    },

    fire: function(x, y) {
        //PS.audioPlay( "fx_shoot3" );
        PS.glyph(x, y, this.sprite);
        this.hail.push({x: x, y: y});
    },

    hit: function(x, y) {
        console.log('hit!', x, y);
        PS.glyph(x, y, this.explosion);
        PS.glyphColor(x, y, PS.COLOR_RED);
        setTimeout(() => {
            PS.glyph(x, y, "");
        }, 500, x, y);
    },

    move: function(x, y, index, sprite, color) {
        PS.glyph(x, y, sprite);
        PS.glyphColor(x, y, color);
        this.hail.splice(index, 1, { // new torpedo position in hail of torpedos
            x: x, 
            y: y 
        });
    },

    travel: function(callback, ceiling) {
        this.hail.forEach((torpedo, index) => {
            PS.glyph(torpedo.x, torpedo.y, ""); // clear current position
            if(torpedo.y >= ceiling) { // torpedo on canvas
                let above = PS.glyph(torpedo.x, torpedo.y-1);
                if(above) { // bead above current torpedo is not empty
                    if(above === this.explosion) { // is explostion
                        this.move(torpedo.x, torpedo.y-1, index, this.explosion, PS.COLOR_RED);
                    } else { // is enemy
                        this.hit(torpedo.x, torpedo.y-1);
                        this.hail.splice(index, 1);
                    }
                } else { // move torpedo
                    this.move(torpedo.x, torpedo.y-1, index, this.sprite, PS.COLOR_BLACK);
                }
            } else { // torpedo off canvas, so remove from hail
                this.hail.splice(index, 1);
            }
        });
        callback();
    }
};


export { torpedo };

