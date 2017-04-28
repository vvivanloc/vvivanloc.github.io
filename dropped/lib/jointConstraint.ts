
class JointConstraint {

    private mConstrainedBody: CANNON.Body;
    private mPointConstraint: CANNON.Constraint;
    private mWorld: CANNON.World;
    private mJointBody: CANNON.Body;


    constructor(pWorld: CANNON.World) {
        this.mWorld = pWorld;

        // Joint body
        let shape = new CANNON.Sphere(0.1);
        this.mJointBody = new CANNON.Body({ mass: 0 });
        this.mJointBody.addShape(shape);
        this.mJointBody.collisionFilterGroup = 0;
        this.mJointBody.collisionFilterMask = 0;
        this.mWorld.addBody(this.mJointBody);
    }

    hasMouseConstraint(): boolean {
        return this.mPointConstraint !== undefined;
    }

    add(pPoint3D: THREE.Vector3, body: CANNON.Body) {
        // The cannon body constrained by the mouse joint
        this.mConstrainedBody = body;

        // Vector to the clicked point, relative to the body
        let v1 = new CANNON.Vec3(pPoint3D.x, pPoint3D.y, pPoint3D.z).vsub(this.mConstrainedBody.position);

        // Apply anti-quaternion to vector to transform it into the local body coordinate system
        let antiRot = this.mConstrainedBody.quaternion.inverse();
        let pivot = antiRot.vmult(v1); // pivot is not in local body coordinates

        // Move the cannon click marker particle to the click position
        this.mJointBody.position.set(pPoint3D.x, pPoint3D.y, pPoint3D.z);

        // Create a new constraint
        // The pivot for the jointBody is zero
        this.mPointConstraint = new CANNON.PointToPointConstraint(this.mConstrainedBody, pivot, this.mJointBody, new CANNON.Vec3(0, 0, 0));

        // Add the constriant to world
        this.mWorld.addConstraint(this.mPointConstraint);
    }

    // This functions moves the transparent joint body to a new postion in space
    move(pPoint3D: THREE.Vector3) {
        if (this.mPointConstraint) {
            // Move the joint body to a new position
            this.mJointBody.position.set(pPoint3D.x, pPoint3D.y, pPoint3D.z);
            this.mPointConstraint.update();
        }
    }

    remove() {
        // Remove constriant from world
        this.mWorld.removeConstraint(this.mPointConstraint);
        this.mPointConstraint = undefined;
    }

}

export = JointConstraint;