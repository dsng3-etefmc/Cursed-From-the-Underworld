import { Vector } from './types/Vector.js';

export class Camera {
    constructor(contextCanvas, dimensions) {
        this.boundedObject = null;
        this.position = new Vector(0, 0);
        this.shouldCameraFollowObject = true;
        this.contextCanvas = contextCanvas;

        this.canvasDimensions = dimensions;
        this.world = {
            minX: 0,
            minY: 0,
            width: 2000,
            height: 2000
        }
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

    clamp (value, min, max) {
        if(value < min) return min;
        else if(value > max) return max;
        return value;
    }

    draw () {
        const newPos = (
            typeof this.boundedObject == 'function' 
            ? this.boundedObject() 
            : this.position
        );

        this.contextCanvas.setTransform(1,0,0,1,0,0);//reset the transform matrix as it is cumulative
        this.contextCanvas.clearRect(0, 0, this.canvasDimensions.width, this.canvasDimensions.height);//clear the viewport AFTER the matrix is reset

        //Clamp the camera position to the this.world bounds while centering the camera around the player                                             
        var camX = this.clamp(
            newPos.x + this.canvasDimensions.width/2, 
            this.world.minX, 
            this.world.maxX - this.canvasDimensions.width
        );
        var camY = this.clamp(
            newPos.y + this.canvasDimensions.height/2, 
            this.world.minY, 
            this.world.maxY - this.canvasDimensions.height
        );

        this.contextCanvas.translate( camX, camY );    

        //Draw everything
    }
}