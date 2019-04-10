import * as _ from "lodash"

import { enemyships } from './enemy';

/*
game.js for Perlenspiel 3.3.x
Last revision: 2018-10-14 (BM)

Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
This version of Perlenspiel (3.3.x) is hosted at <https://ps3.perlenspiel.net>
Perlenspiel is Copyright © 2009-18 Worcester Polytechnic Institute.
This file is part of the standard Perlenspiel 3.3.x devkit distribution.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with the Perlenspiel devkit. If not, see <http://www.gnu.org/licenses/>.
*/

/*
This JavaScript file is a template for creating new Perlenspiel 3.3.x games.
By default, all event-handling function templates are COMMENTED OUT (using block-comment syntax), and are therefore INACTIVE.
Uncomment and add code to the event handlers required by your project.
Any unused event-handling function templates can be safely deleted.
Refer to the tutorials and documentation at <https://ps3.perlenspiel.net> for details.
*/

/*
The following comment lines are for JSHint <https://jshint.com>, a tool for monitoring code quality.
You may find them useful if your development environment is configured to support JSHint.
If you don't use JSHint (or are using it with a configuration file), you can safely delete these lines.
*/

/* jshint browser : true, devel : true, esversion : 5, freeze : true */
/* globals PS : true */

/*
PS.init( system, options )
Called once after engine is initialized but before event-polling begins.
This function doesn't have to do anything, although initializing the grid dimensions with PS.gridSize() is recommended.
If PS.grid() is not called, the default grid dimensions (8 x 8 beads) are applied.
Any value returned is ignored.
[system : Object] = A JavaScript object containing engine and host platform information properties; see API documentation for details.
[options : Object] = A JavaScript object with optional data properties; see API documentation for details.
*/

// UNCOMMENT the following code BLOCK to expose the PS.init() event handler:
//
const NUMBER_OF_ENEMIES = 5;
const GRID_WIDTH = 17;
const GRID_HEIGHT = 17;
const SHIP = 65; // A
//const TORPEDO = 581; // 
const TORPEDO = 94; // 
const BOTTOM_ROW = GRID_HEIGHT-1;
const TOP_ROW = 0;
const RIGHT_ROW = GRID_WIDTH-1;
const LEFT_ROW = 0;
const TICKS = 10;
var torpedosInFlight = 0;
const maxTorpedosInFlight = 5;
var timer;
var ticking = false;

PS.KEY_SPACEBAR = 32;

function moveTorpedos(torpedoLocations) {
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

function tick() {
    if( ! ticking) {
        ticking = true;
        var torpedoLocations = [];
        for(let y=BOTTOM_ROW-1; y>=TOP_ROW; y--) {
            for(let x=0; x<RIGHT_ROW; x++) {
                if(PS.glyph(x, y) === TORPEDO) {
                    torpedoLocations.push({x:x, y:y});
                    if(torpedoLocations.length === torpedosInFlight) {
                        moveTorpedos(torpedoLocations);
                        return;
                    }
                }
                // no torpedos found enable tick
                if(y == TOP_ROW && x == (RIGHT_ROW-1)) {
                    ticking = false;
                }
            }
        }
    }
}

PS.init = function( system, options ) {
	"use strict"; // Do not remove this directive!

	PS.gridSize( GRID_WIDTH, GRID_HEIGHT );

    PS.gridColor( 255, 256, 666 );

    PS.glyph(Math.floor(GRID_WIDTH/2), GRID_HEIGHT-1, SHIP);


    const availCoordinates = enemyships.availableCoordinates({
        x: [LEFT_ROW, RIGHT_ROW],
        y: [TOP_ROW, BOTTOM_ROW-5]
    });
    console.log('avail cords', availCoordinates);

    enemyships.create( NUMBER_OF_ENEMIES, availCoordinates);

    PS.timerStart(TICKS, tick);
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
            if(torpedosInFlight < maxTorpedosInFlight) {
                for(let x of _.range(0, GRID_WIDTH)) {
                    if(PS.glyph(x, BOTTOM_ROW) === SHIP) {
                        torpedosInFlight++;
                        PS.glyph(x, BOTTOM_ROW-1, TORPEDO);
                    }
                }
            }
            break;
                    
    }

};


