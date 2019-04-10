var assert = require('assert');

import { enemyship, enemyships } from "./enemy";
 
describe('enemyships', function() {
    describe('#availCoordinates([0,1], [0,1])', function() {
        it("returns 4 unique combinations", () => {
            assert.deepEqual(enemyships.availCoordinates([0,1], [0,1]), [[0,0], [0,1], [1,0], [1,1]]);
        });
    });
    describe('#availCoordinates([0,2], [0,2])', function() {
        it("returns 9 unique combinations", () => {
            assert.deepEqual(enemyships.availCoordinates([0,2], [0,2]), [[0,0], [0,1], [0,2], [1,0], [1,1], [1,2], [2,0], [2,1], [2,2]]);
        });
    });
    describe("#randomCoordinate()", () => {
        it("return and slice random item from array", () => {
            let coordinates = [[0,0], [0,1], [1,0], [1,1]];
            // TODO: finding way to fix false positive
            console.log(coordinates.find(coordinate => coordinate == [0,1]));
            let coordinateCountBefore = coordinates.length;
            let randomCoordinate = enemyships.randomCoordinate(coordinates);
            let coordinateCountAfter = coordinates.length;
            assert.equal(coordinateCountBefore, coordinateCountAfter+1);
            // TODO: fix false positive test
            assert.equal(coordinates.includes(randomCoordinate), false);
        });
    });
});

describe("enemy", function() {
    describe("#create(2, 3)", () => {
        it("returns enemy with unique id and coordinates", () => {
            let e1 = enemyship.create(2, 3);
            let e2 = enemyship.create(4, 5);
            assert.equal(e1.id == e2.id, false);
            assert.equal(e1.x, 2);
            assert.equal(e1.y, 3);
            assert.equal(e2.x, 4);
            assert.equal(e2.y, 5);
        });
    });
});
