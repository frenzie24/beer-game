import React, { useState, useEffect } from 'react';
import NumberRange from './numberRange';
import NumberSelection from '../NumberSelection';


const BehaviorInput = ({ phase, orders, rounds, phaseUpdate }) => {
    const [newPhase, setNewPhase] = useState(phase);

    const handleRoundsChange = (e) => {
        const newVal = parseInt(e);
        setNewPhase({ ...newPhase, rounds: typeof newVal === 'number' ? newVal : parseInt(e.target?.value) });
    }

    const handleOrdersChange = (e) => {
        const newVal = parseInt(e);
        setNewPhase({ ...newPhase, orders: typeof newVal === 'number' ? newVal : parseInt(e.target?.value) });
    }

    useEffect(() => {
        if (newPhase != phase) {
            phaseUpdate(newPhase)
        }
    }, [newPhase]);

    return (
        <>
            <NumberRange labelText={rounds.label} min={rounds.min ? rounds.min : 0} max={rounds.max ? rounds.max : 0} val={phase.rounds} setVal={handleRoundsChange} />
            <NumberSelection labelText={orders.label} min={orders.min ? orders.min : 0} max={orders.max ? orders.max : 0} val={phase.orders} setVal={handleOrdersChange} />
        </>
    )

}

export default BehaviorInput;