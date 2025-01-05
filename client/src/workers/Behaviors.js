const defaultRounds = 10;

const defaultBehavior = ( rounds ) => {

    const _rounds = rounds ? rounds : defaultBehavior;
    return {
        name: 'default',
        phase1: {
            rounds: 4,
            orders: 4
        },
        phase2: {
            rounds: _rounds,
            orders: 8
        },
        delay: 2,
        cost: {
            inventory: 0.25,
            backlog: 0.50
        }
    };
}

const randomBehavior = ( rounds ) => {
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
    return behavior;
}

const lowToHighBehavior = ({ rounds }) => {
    return {
        name: 'Increase Orders Over Time ',
        phase1: {
            rounds: 3,
            orders: 4
        },
        phase2: {
            rounds: 3,
            orders: 8
        },
        phase3: {
            rounds: rounds,
            orders: 12
        },
        delay: 4
    };
}


export { defaultBehavior, randomBehavior };