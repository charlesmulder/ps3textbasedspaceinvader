
import * as _ from "lodash"

const crypto = require("crypto");

const enemyship = {
    create: (x, y) => {
        return {
            id: crypto.randomBytes(16).toString("hex"),
            x: x,
            y: y
        };
    }
};

const enemyships = {
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
        return availCoordinates.splice(randomIndex, 1);
    },

    /**
     * @return array of enemies
     */
    create: (numberOfEnemies, availCoordinates, enemyship) => {
        _.range(0, numberOfEnemies).forEach(() => {
        });
    }
};

export { enemyships, enemyship };
