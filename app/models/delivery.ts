export default class Delivery {
    recvAddress: string;
    dropoffDatetime: Date;
    pickupDatetime: Date;
    isIndoor: boolean;
    extCordFt: number;
    needGenerator: boolean;

    constructor(
        recvAddress: string,
        dropoffDatetime: Date,
        pickupDatetime: Date,
        isIndoor: boolean,
        extCordFt: number,
        needGenerator: boolean
    ) {
        this.recvAddress = recvAddress;
        this.dropoffDatetime = dropoffDatetime;
        this.pickupDatetime = pickupDatetime;
        this.isIndoor = isIndoor;
        this.extCordFt = extCordFt;
        this.needGenerator = needGenerator;
    }

    public clone(): Delivery {
        return new Delivery(
            this.recvAddress,
            new Date(this.dropoffDatetime),
            new Date(this.pickupDatetime),
            this.isIndoor,
            this.extCordFt,
            this.needGenerator
        );
    }

    public isNull(): boolean {
        return this.recvAddress === "" && this.dropoffDatetime.getTime() === 0 &&
            this.pickupDatetime.getTime() === 0 && !this.isIndoor &&
            this.extCordFt === 0 && !this.needGenerator;
    }

    public static null(): Delivery {
        return new Delivery("", new Date(0), new Date(0), false, 0, false);
    }
}