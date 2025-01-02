import React, { useState, useEffect } from 'react';

import Behavior from './Behavior';
//increase element legiblity by condensing className
const liStyle = 'w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 capitalize';
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
        }
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
        }
    };
}
const BehaviorsList = ({ id = 0, name = '', handleSelection, rounds = 10 }) => {
    //handles bad arguments passed
    if (!handleSelection) throw new Error('BehaviorList component MUST be passed a handleSubmit callback');

    //selected behavior obj
    const [selected, setSelected] = useState(defaultBehavior(rounds))
    // controls custom behavior input visibilty, defaults to false
    const [customVisible, setCustomVisible] = useState(false);
    const [customCreated, setCustomCreated] = useState(false);

    const handleSelect = (behavior) => {
        const newBehavior = {...behavior };
        setSelected(newBehavior)
        setCustomCreated(true);
    }



    const handleBehaviorClick = (e) => {
        e.preventDefault();

        const id = parseInt(e.target.getAttribute('id'));
        //  const visible = customVisible;

        switch (id) {
            case 0:
                const dBehavior = defaultBehavior(rounds);
                handleSelect(dBehavior);
                setCustomVisible(false)
                break;
            case 1:
                const rBehavior = randomBehavior(rounds);
                handleSelect(rBehavior);
                setCustomVisible(false)
                break;

            case 2:
                const lwBehavior = lowToHighBehavior(rounds);
                handleSelect(lwBehavior);
                setCustomVisible(false)
                break;
            case 3:
                // logic here when you think of a prepared behavior to put here
                break;
            case 4:
                // declare this always.
                // bools like to misbave when updating their state to the negation of their current state
                // especially when done using the react useState
                if (customCreated) handleSelect({ name: 'custom', phase1: selected.phase1, phase2: selected.phase2, phase3: selected.phase3 })
                setCustomVisible(true)
                break;

        }

    }
    return (
        <article className='bg-slate-300 p-1 my-2 rounded-lg'>
            <label className='text-slate-900 text-lg font-bold capitalize'><span></span>{name} Behavior {(selected) ? 'current behavior: ' + selected.name : ''}
                <ol id={'list' + id}>
                    <li key='0' id="0" className={liStyle + " p-2"} onClick={handleBehaviorClick}>Default Behavior</li>
                    <li key='1' id="1" className={liStyle + " p-2 mt-1"} onClick={handleBehaviorClick}>Random Behavior</li>
                    <li key="4" id="4" className={liStyle + " p-2 mt-1"} onClick={handleBehaviorClick}>Custom Behavior
                        {customVisible ?
                            <Behavior rounds={rounds} onSubmit={handleSelect} /> :
                            <></>}

                    </li>
                </ol>
            </label>
        </article>
    )
}

export default BehaviorsList;