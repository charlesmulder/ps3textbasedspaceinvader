const assert = require('assert');
const faker = require('faker');
const _ = require('lodash');

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
            let coordinateCountBefore = coordinates.length;
            let randomCoordinate = enemyships.randomCoordinate(coordinates);
            console.log('random coordinate', randomCoordinate);
            let coordinateCountAfter = coordinates.length;
            assert.equal(coordinateCountBefore, coordinateCountAfter+1);
            assert.equal(coordinates.includes(randomCoordinate), false);
        });
    });

    describe("#create()", () => {
        it("returns array of enemy ships", () => {
            let availableCoordinates = [[1,1], [2,2], [3,3]];
            let army = enemyships.create(3, availableCoordinates);
            assert.equal(army.length, 3);
        });

        describe("exceeding enemy cap", () => {
            it("throws error", () => {
                try {
                    enemyships.create(enemyships.max+1, _.range(0, enemyships.max+1).map(() => {
                        return [faker.random.number(), faker.random.number()];

                    }));
                } catch(e) {
                    assert.equal(e.message, enemyships.errors[0]);
                }
            });
        });

        describe("not enough space", () => {
            it("throws error", () => {
                try {
                    enemyships.create(1, []);
                } catch(e) {
                    assert.equal(e.message, enemyships.errors[1]);
                }
            });
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
