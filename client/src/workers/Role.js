//  empty stats for a generic role

import { Behavior } from "./Behaviors";

const emptyStats = {

    ordered: 0,
    fulfilled: 0,
    lastFulfilled: 0,
    lastOrder: 0,
    received: 0,
    totalReceived: 0,
    isHistoryVisible: false,
    expenses: 0.0
};

class Role {
    constructor({ params }) {
        this.role_id = params?.role_id || 0;
        this.name = params?.name || "Unamed";
        this.inventory = params?.inventory;
        this.stats = emptyStats;
        this.game = params.game;
        this.behavior = params?.behavior;
    }

}

export { Role };