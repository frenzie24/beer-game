import React, { useState, useEffect } from 'react';
import BehaviorInput from './components/BehaviorInput';

const Behavior = ({ rounds }) => {
    const [maxRounds, setMaxRounds] = useState(rounds ? typeof rounds === 'number' ? rounds : 10 : 10)

    const [phase1, setPhase1] = useState({ rounds: 0, orders: 0 });
    const [phase2, setPhase2] = useState({ rounds: 0, orders: 0 });
    const [phase3, setPhase3] = useState({ rounds: 0, orders: 0 });

    const [isPhase2Disabled, setIsPhase2Disabled] = useState(true);

    const [isPhase3Disabled, setIsPhase3Disabled] = useState(true);

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

    const phase2MaxRounds = () => {
        const max = (maxRounds - phase1.rounds) ? phase1.rounds : 0;

        return max;
    }
    const phase3MaxRounds = () => {
        const max = (maxRounds - phase1.rounds - phase2.rounds) ? phase1.rounds : 0;

        return max;
    }

    useEffect(() => {
        if (phase1.rounds > 0 && phase1.rounds < maxRounds) {
            setIsPhase2Disabled(false);
        }

        if (phase2.rounds > 0 && phase2.rounds < maxRounds) {
            setIsPhase3Disabled(false);
        }

        console.log('phase update');

    }, [phase1, phase2, phase3])

    return (
        <div className="flex flex-row flex-wrap justify-center items-center p-4 w-screen">


            <form className='[&_*]:text-right w-54' >

                <label>Phase 1
                    <BehaviorInput
                        phase={phase1}
                        orders={{ label: 'Orders per Turn', min: "0", max: "25" }}
                        rounds={{ label: "Turns of Ordering Behavior", min: "0", max: { maxRounds } }}
                        phaseUpdate={setPhase1}

                    />
                </label>
                <label> Phase 2
                    <BehaviorInput
                        phase={phase2}
                        orders={{ label: 'Orders per Turn', min: "0", max: "25" }}
                        rounds={{ label: "Turns of Ordering Behavior", min: "0", max: { phase2MaxRounds } }}
                        phaseUpdate={setPhase2}
                        disabled={isPhase2Disabled}
                    />
                </label>
                <label> Phase 3
                    <BehaviorInput
                        phase={phase3}
                        orders={{ label: 'Orders per Turn', min: "0", max: "25" }}
                        rounds={{ label: "Turns of Ordering Behavior", min: "0", max: { phase3MaxRounds } }}
                        phaseUpdate={setPhase3}
                        disabled={isPhase3Disabled}
                    />
                </label>
            </form>

        </div>
    );
};

export default Behavior;
