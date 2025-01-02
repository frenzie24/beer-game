const defaultRounds = 10;

const defaultBehavior = ({ rounds = defaultRounds }) => {
    return {
        name: 'default',
        phase1: {
            rounds: 4,
            orders: 4
        },
        phase2: {
            rounds: rounds,
            orders: 8
        },
        delay: 2
    };
}

const randomBehavior = ({ rounds = defaultRounds }) => {
    const getRandomInt = (max, mod = 1) => {
        const rand = Math.floor(Math.random() * max * mod) + 1;
        return rand;
    }

    const behavior = {
        name: 'Random',
        phase1: {
            rounds: getRandomInt(rounds),
            orders: getRandomInt(20)
        },
        phase2: {
            rounds: getRandomInt(rounds),
            orders: getRandomInt(20)
        },
        phase3: {
            rounds: getRandomInt(rounds),
            orders: getRandomInt(20)
        },
        delay: getRandomInt(3)
    };
    return behavior;
}

const lowToHighBehavior = ({ rounds = defaultRounds }) => {
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