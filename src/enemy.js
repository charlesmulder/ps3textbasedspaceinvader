
import * as _ from "lodash";

const crypto = require("crypto");

const enemyship = {
    sprite: 87,
    create: (x, y) => {
        return {
            id: crypto.randomBytes(16).toString("hex"),
            x: x,
            y: y
        };
    }
};

const enemyships = {
    ticks: 20,
    timer: null,
    ticking: false,
    army: [],
    /**
     * TODO: do we need to call a callback when all enemy ships have been drawn?
     */
    draw: (army) => {
        army.forEach(ship => PS.glyph(ship.x, ship.y, enemyship.sprite));
    },
    go: function() {
        //console.log(this.army);
        PS.timerStart(this.ticks, () => {
            if( ! this.ticking) {
                this.ticking = true;
                this.travel(() => {
                    this.ticking = false;
                });
            }
        });
    },
    /**
     * @callback points
     */
    travel: function(callback) {
        this.army.forEach((enemy, index) => {
            PS.glyph(enemy.x, enemy.y, "");
            this.move(enemy.id, enemy.x-1, enemy.y, enemyship.sprite, index);
            console.log(this.army);
            // move left until left most enemy hits edge 
            // then move down one
            // then move right until right most enemy hits edge
        });
        callback();
    },
    move: function(id, x, y, sprite, index) {
        PS.glyph(x, y, sprite);
        this.army.splice(index, 1, { // new enemy position in army
            id: id,
            x: x, 
            y: y 
        });
    },
    errors: [
        "Requested number of enemies is larger than maximum.",
        "Requested number of enemies is larger than available coordinates."
    ],
    max: 150,
    /**
     * @param xRange [startNumber, endNumber]
     * @param yRange [startNumber, endNumber]
     * @return [[number, number], [number, number]]
     */
    availCoordinates: (xRange, yRange) => {
        var coordinates = [];
        _.range(xRange[0], xRange[1]+1).forEach((x) => {
            _.range(yRange[0], yRange[1]+1).forEach((y) => {
                coordinates.push([x, y]);
            });
        });
        return coordinates;
    },

    /**
     * @return random coordinate
     **/
    randomCoordinate: (availCoordinates) => {
        let randomIndex = Math.floor(Math.random()*availCoordinates.length);
        return availCoordinates.splice(randomIndex, 1)[0];
    },

    /**
     * @return array of enemies
     */
    create: (numberOfEnemies, availCoordinates) => {
        return _.range(0, numberOfEnemies).map(() => {
            if(numberOfEnemies > enemyships.max) {
                throw new Error(enemyships.errors[0]);
            }
            if(numberOfEnemies > availCoordinates.length) {
                throw new Error(enemyships.errors[1]);
            }
            let randomCoordinate = enemyships.randomCoordinate(availCoordinates);
            numberOfEnemies--;
            return enemyship.create(randomCoordinate[0], randomCoordinate[1]);
        });
    }
};

export { enemyships, enemyship };
