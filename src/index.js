import * as _ from "lodash"

import { enemyships } from './enemy';
import { torpedo }  from './torpedo';

import { SHIP } from './ship';

const GRID_WIDTH = 17;
const GRID_HEIGHT = 17;
const BOTTOM_ROW = GRID_HEIGHT-1;
const TOP_ROW = 0;
const RIGHT_ROW = GRID_WIDTH-1;
const LEFT_ROW = 0;
PS.KEY_SPACEBAR = 32;

PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!

	PS.gridSize( GRID_WIDTH, GRID_HEIGHT );

    PS.gridColor( 255, 256, 666 );
    PS.border(PS.ALL, PS.ALL, 0);

    PS.glyph(Math.floor(GRID_WIDTH/2), GRID_HEIGHT-1, SHIP);

    const availCoordinates = enemyships.availCoordinates( [LEFT_ROW+2, RIGHT_ROW-2], [TOP_ROW+2, BOTTOM_ROW-7] );
    //enemyships.army = enemyships.create(availCoordinates.length, availCoordinates);
    enemyships.army = enemyships.create(1, availCoordinates);
    enemyships.draw(enemyships.army);
    enemyships.go();

    torpedo.go();

};


/*
PS.keyDown ( key, shift, ctrl, options )
Called when a key on the keyboard is pressed.
This function doesn't have to do anything. Any value returned is ignored.
[key : Number] = ASCII code of the released key, or one of the PS.KEY_* constants documented in the API.
[shift : Boolean] = true if shift key is held down, else false.
[ctrl : Boolean] = true if control key is held down, else false.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/
PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict"; // Do not remove this directive!

	// Uncomment the following code line to inspect first three parameters:

    switch(key) {

        case PS.KEY_ARROW_LEFT:
            for(let x of _.range(0, GRID_WIDTH)) {
                if(PS.glyph(x, BOTTOM_ROW) === SHIP && x > 0) {
                    PS.glyph(x, BOTTOM_ROW, "");
                    PS.glyph(--x, BOTTOM_ROW, SHIP);
                    break;
                }
            }
            break;

        case PS.KEY_ARROW_RIGHT:
            for(let x of _.range(0, GRID_WIDTH)) {
                if(PS.glyph(x, BOTTOM_ROW) === SHIP && x < (GRID_WIDTH-1)) {
                    PS.glyph(x, BOTTOM_ROW, "");
                    PS.glyph(++x, BOTTOM_ROW, SHIP);
                    break;
                }
            }
            break;

        case PS.KEY_SPACEBAR:
            // fire weapon
            if(torpedo.allowed()) {
                for(let x of _.range(0, GRID_WIDTH)) {
                    if(PS.glyph(x, BOTTOM_ROW) === SHIP) {
                        torpedo.fire(x, BOTTOM_ROW-1);
                    }
                }
            }
            break;
                    
    }

};


