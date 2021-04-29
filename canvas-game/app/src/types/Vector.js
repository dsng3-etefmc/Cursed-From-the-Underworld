/**
 * @class
 */
export class Vector {
    /**
     * @constructor
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x, y) {
        /**
         * @type {number}
         */
        this.x = x;

        /**
         * @type {number}
         */
        this.y = y;
    }

    setPos(x, y) {
        this.x = x;
        this.y = y;
    }

    setPosWithVector(vector) {
        this.x = vector.x;
        this.y = vector.y;
    }
}