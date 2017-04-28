export class EventTeleported implements THREE.Event {
    objectName: string;
    type: string;
    target: string;
    static readonly typeID: string = "teleported";
    constructor(pObjectName: string) {
        this.type = EventTeleported.typeID;
        this.objectName = pObjectName;
    }
}

export class EventAllHidden implements THREE.Event {
    type: string;
    target: string;
    static readonly typeID: string = "allItemsOut";
    constructor() {
        this.type = EventAllHidden.typeID;
    }
}