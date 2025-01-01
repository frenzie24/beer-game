import React, { useState, useEffect } from 'react';

import Behavior from './Behavior';
//increase element legiblity by condensing className
const liStyle = 'w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 capitalize';

const BehaviorsList = ({ id = 0, name = '', handleSelection, rounds = 10 }) => {
    //handles bad arguments passed
      if (!handleSelection) throw new Error('BehaviorList component MUST be passed a handleSubmit callback');

    // controls custom behavior input visibilty, defaults to false
    const [customVisible, setCustomVisible] = useState(false);

    const handleBehaviorClick = (e) => {
        e.preventDefault();

        const id = parseInt(e.target.getAttribute('id'));
        if (id === 4) {
            // declare this always.
            // bools like to misbave when updating their state to the negation of their current state
            // especially when done using the react useState
            const visible = customVisible;
            setCustomVisible(!visible)
        }
        debugger;
    }
    return (
        <label className='text-slate-900 text-lg font-bold'>{name} Behavior
            <ol id={'list' + id}>
                <li key='0' id="0" className={liStyle + " p-2"} onClick={handleBehaviorClick}>Default Behavior</li>
                <li key='1' id="1" className={liStyle + " p-2 mt-1"} onClick={handleBehaviorClick}>Random Behavior</li>
                <li key="4" id="4" className={liStyle + " p-2 mt-1"} onClick={handleBehaviorClick}>Custom Behavior
                    {customVisible ?
                        <Behavior rounds={rounds} onSubmit={handleSelection} /> :
                        <></>}

                </li>
            </ol>
        </label>
    )
}

export default BehaviorsList;