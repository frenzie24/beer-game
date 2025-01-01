import React, { useState, useEffect } from 'react';
import BehaviorInput from './components/BehaviorInput';

const Behavior = ({ rounds }) => {
    const [maxRounds, setMaxRounds] = useState(rounds ? typeof rounds === 'number' ? rounds : 10 : 10)

    const [phase1, setPhase1] = useState({ rounds: maxRounds ? maxRounds : 0, orders: 0 });
    const [phase2, setPhase2] = useState({ rounds: 0, orders: 0 });
    const [phase3, setPhase3] = useState({ rounds: 0, orders: 0 });

    const handlePhase1Change = (e) => {
        setPhase1({ ...phase1, rounds: parseInt(e.target.value) });

    };

    const handlePhase2Change = (e) => {
        setPhase2({ ...phase2, rounds: parseInt(e.target.value) });
    };

    const handlePhase3Change = (e) => {
        setPhase3({ ...phase3, rounds: parseInt(e.target.value) });
    };

    const handleOrderChange = (newVal) => {
        setPhase1({ ...phase1, orders: newVal })
    }

    const isPhase2Disabled = phase1.rounds >= rounds;
    const isPhase3Disabled = phase1.rounds === phase2.rounds && phase2.rounds >= rounds;

    return (
        <div className="flex flex-row flex-wrap justify-center items-center p-4 w-screen">
            <h2 className='w-full text-center'>MAX ROUNDS: {maxRounds}</h2>

            <form className='[&_*]:text-right w-54' >
                <div className="w-full">
                    <label>
                        Phase 1 Rounds:
                        <input
                            type="number"
                            value={phase1.rounds}
                            onChange={handlePhase1Change}
                            min="0"
                            max={maxRounds}
                        />
                    </label></div>
                <div className="w-full">
                    <label>
                        Phase 2 Rounds:
                        <input
                            type="number"
                            value={phase2.rounds}
                            onChange={handlePhase2Change}
                            min={phase1.rounds}
                            max={maxRounds - phase1.rounds}
                            disabled={isPhase2Disabled}
                        />
                    </label></div>

                <BehaviorInput
                    phase={phase1}
                    orders={{ label: 'Orders per Turn', min: "0", max: "25" }}
                    rounds={{ label: "Number of Rounds to Order", min: "0", max: { maxRounds } }}
                    phaseUpdate={setPhase1}
                />
                {/*
                <NumberRange labelText="Phase 1 Rounds: " min="0" max={maxRounds}/>
                <NumberSelection labelText={"phase 1 orders"} min='0' max="50" val={phase1.orders} setVal={handleOrderChange}/>

                */}
                <div>
                    phase 1 orders  <input
                        type="number"
                        value={phase1.orders}
                        onChange={handleOrderChange}
                        min="0"
                        max="100"
                    />
                </div>

                <div className="w-full">
                    <label>
                        Phase 3 Rounds:
                        <input
                            type="number"
                            value={phase3.rounds}
                            onChange={handlePhase3Change}
                            min={phase2.rounds}
                            max={maxRounds - phase1.rounds - phase2.rounds}
                            disabled={isPhase3Disabled}
                        />
                    </label></div>
            </form>

        </div>
    );
};

export default Behavior;
