import Vector from './types/Vector';

/**
 * @class
 */
class Camera {
    constructor(a) {
        /** @type {PositionCallback} */
        this.boundedObject;

        /** @type {typeof Vector} */
        this.position = new Vector(0, 0);

        /** @type {boolean} */
        this.shouldCameraFollowObject = true;
    }

    /**
     * Set camera to follow object by receiving its position
     * @param {function(): any} callbackPosition returns a vector
     */
    boundCameraToObject(callbackPosition) {
        this.shouldCameraFollowObject = true;
        this.boundCameraToObject = callbackPosition
    }

    unboundCamera() {
        this.shouldCameraFollowObject = false;
    }

    /**
     * Move camera to positon
     * @param {*} vector A vector
     */
    setCameraToPosition(vector) {

    }

    moveCamera() {
        const newPos = this.boundedObject();
    }
}