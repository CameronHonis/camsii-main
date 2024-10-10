import { OVERNIGHT_DELIVERY_PRICE, OVERNIGHT_RANGE, PRICE_PER_EXT_CORD_FT, PRICE_PER_MILE_OVER_50 } from "@/constants";
import { z } from "zod";

export default class Delivery {
    recvAddress: string;
    distMiles: number;
    dropoffDatetime: Date;
    pickupDatetime: Date;
    isIndoor: boolean;
    extCordFt: number;
    needGenerator: boolean;

    constructor(
        recvAddress: string,
        distMiles: number,
        dropoffDatetime: Date,
        pickupDatetime: Date,
        isIndoor: boolean,
        extCordFt: number,
        needGenerator: boolean
    ) {
        this.recvAddress = recvAddress;
        this.distMiles = distMiles;
        this.dropoffDatetime = dropoffDatetime;
        this.pickupDatetime = pickupDatetime;
        this.isIndoor = isIndoor;
        this.extCordFt = extCordFt;
        this.needGenerator = needGenerator;
    }

    public clone(): Delivery {
        return new Delivery(
            this.recvAddress,
            this.distMiles,
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

    public getBaseDeliveryCost(): number {
        const milesOver50 = Math.max(0, this.distMiles - 50);
        return Math.round(60 + milesOver50 * PRICE_PER_MILE_OVER_50);
    }

    public getIsOvernightDropoff(): boolean {
        return Delivery._isDateOvernight(this.dropoffDatetime);
    }

    public getIsOvernightPickup(): boolean {
        return Delivery._isDateOvernight(this.pickupDatetime);
    }

    public getExtCordCost(): number {
        return this.extCordFt * PRICE_PER_EXT_CORD_FT;
    }

    public getTotalCost(): number {
        let cost = this.getBaseDeliveryCost();
        if (this.getIsOvernightDropoff()) {
            cost += OVERNIGHT_DELIVERY_PRICE;
        }
        if (this.getIsOvernightPickup()) {
            cost += OVERNIGHT_DELIVERY_PRICE;
        }
        cost += this.getExtCordCost();
        return cost;
    }

    public static null(): Delivery {
        return new Delivery("", 0, new Date(0), new Date(0), false, 0, false);
    }

    public static fromJson(json: Object): Delivery {
        const validJson = DeliverySchema.parse(json);
        return new Delivery(
            validJson.recvAddress,
            validJson.distMiles,
            new Date(validJson.dropoffDatetime),
            new Date(validJson.pickupDatetime),
            validJson.isIndoor,
            validJson.extCordFt,
            validJson.needGenerator
        );
    }

    private static _isDateOvernight(date: Date): boolean {
        const hours = date.getHours();
        if (OVERNIGHT_RANGE[0] < OVERNIGHT_RANGE[1]) {
            return hours >= OVERNIGHT_RANGE[0] && hours <= OVERNIGHT_RANGE[1];
        } else {
            return !(hours > OVERNIGHT_RANGE[1] && hours < OVERNIGHT_RANGE[0]);
        }
    }
}

export const DeliverySchema = z.object({
    recvAddress: z.string(),
    distMiles: z.number(),
    dropoffDatetime: z.string(),
    pickupDatetime: z.string(),
    isIndoor: z.boolean(),
    extCordFt: z.number(),
    needGenerator: z.boolean(),
});