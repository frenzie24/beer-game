const defaultRounds = 10;

/*
    REFRACTOR PHASES TO AN ARRAY WTF IS PHASE1
*/

// order 4 units for 4 rounds, then order 8 units per round till the end of the game
const defaultBehavior = (rounds = 10, delay = 1) => {
    return new Behavior();
}

// class struct for behavior obj
class Behavior {
    constructor( name, phases, delay, cost ) {
        // index of current phase
        this.currentPhase = 0;
        // use passed name param if possible
        this.name = name || 'default'
        // if params has a phases that is an array use it, otherwise create a phases array with default behaviors
        this.phases = Array.isArray(phases) ? params.phases : [{ rounds: 4, orders: 4 }, { rounds: 10, orders: 8 }]
        //rounds are tracked starting from 0. inits to first phase rounds - 1 for expectyed behavior
        this.currentRoundToPhaseChange = this.phases[0].rounds - 1;
        //delay in weeks, use passed delay if possible
        this.delay = delay || 1;
        //cost pet item in dollars, use pased cost obj if possible
        this.cost = cost || { inventory: 0.25, backlog: 0.50 }
        // array to store orders shipped to the role's customer that has not yet arrived
        this.shipments = [];

    }

    // returns the appropriate order value based on the current phase determined by round param
    getRoundOrder = (round) => {
        if (round >= this.currentRoundToPhaseChange) {
            // ensure we dont iterate into undefined
            if (this.currentPhase < this.phases.length - 1) {
                //add the next phase's rounds value to currentRoundToPhaseChange. Increments currentphase to next index before array access
                //++variable vs variable++
                this.currentRoundToPhaseChange += this.phases[++this.currentPhase].rounds;
                debugger;
            }
        }
        // after checking if currentPhase needs to increment, return orders field of the current phase
        return this.phases[this.currentPhase].orders;
    }

    // returns a shipment obj
    createShipment = (ammount, round) => {
        return {
            ammount: ammount,
            delay: this.delay,
            arrives: round + this.delay
        }
    }
}

// most variables will be set to random
const randomBehavior = (rounds) => {
    const _rounds = rounds ? rounds : defaultBehavior;
    const getRandomInt = (max, mod = 1) => {
        const rand = Math.floor(Math.random() * max * mod) + 1;
        return rand;
    }

    const behavior = {
        name: 'Random',

        phase1: {
            rounds: getRandomInt(_rounds),
            orders: getRandomInt(20)
        },
        phase2: {
            rounds: getRandomInt(_rounds),
            orders: getRandomInt(20)
        },
        phase3: {
            rounds: getRandomInt(_rounds),
            orders: getRandomInt(20)
        },
        delay: getRandomInt(3),

        cost: {
            inventory: 0.25,
            backlog: 0.50
        }
    };
    //this needs to be moved into behavior
    behavior.phases = [behavior.phase1, behavior.phase2, behavior.phase3];
    return behavior;
}


export { defaultBehavior, randomBehavior, Behavior };