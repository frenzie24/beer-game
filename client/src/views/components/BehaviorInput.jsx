import React, { useState, useEffect } from 'react';
import NumberSelection from './NumberSelection';

//component to organize inputs for a behavior component
const BehaviorInput = ({ phase, name, orders, rounds, phaseUpdate, disabled }) => {
    const [newPhase, setNewPhase] = useState(phase);
    if(phaseUpdate === undefined) debugger;

    // When rounds value changes, update newPhase with new rounds value
    const handleRoundsChange = (e) => {
        const newVal = parseInt(e);
        setNewPhase({ ...newPhase, rounds: typeof newVal === 'number' ? newVal : parseInt(e.target?.value) });
    }

    // When orders value changes, update newPhase with new orders value
    const handleOrdersChange = (e) => {
        const newVal = parseInt(e);
        setNewPhase({ ...newPhase, orders: typeof newVal === 'number' ? newVal : parseInt(e.target?.value) });
    }

    //bubble up with newPhase data when newPhase updates
    useEffect(() => {
        if (newPhase != phase) {
            phaseUpdate(newPhase)
        }
    }, [newPhase]);

    // numberselection components to handle order and round selections
    return (
        <div className='py-1 bg-slate-100 flex flex-col flex-wrap items-apart text-base'>

            <NumberSelection
                name={name}
                label={rounds.label}
                min={rounds.min ? rounds.min : 0}
                max={rounds.max ? rounds.max : 0}
                val={phase.rounds}
                setVal={handleRoundsChange}
                disabled={disabled}
            />
            <NumberSelection
                name={name}
                label={orders.label}
                min={orders.min ? orders.min : 0}
                max={orders.max ? orders.max : 0}
                val={phase.orders}
                setVal={handleOrdersChange}
                disabled={disabled} />
        </div>
    )

}

export default BehaviorInput;