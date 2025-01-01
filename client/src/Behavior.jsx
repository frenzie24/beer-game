import React, { useState, useEffect } from 'react';
import BehaviorInput from './components/BehaviorInput';
import BehaviorInputContainer from './components/BehaviorContainer';

// empty phase data for reset ease
const emptyPhase = {
    rounds: 0, // represents numbers of rounds to place the number of orders
    orders: 0 // repreents number of orders to place per round
};

//Behavior view component
const Behavior = ({ rounds, onSubmit, onCancel, isClicked }) => {
    //is this needed?
    const [maxRounds, setMaxRounds] = useState(rounds ? typeof rounds === 'number' ? rounds : 10 : 10)
    //phase objs, max 3 phases of behavior, all default to 0 values
    const [phase1, setPhase1] = useState({ rounds: 0, orders: 0 });
    const [phase2, setPhase2] = useState({ rounds: 0, orders: 0 });
    const [phase3, setPhase3] = useState({ rounds: 0, orders: 0 });

    //this was the beginning of exploring hiding behavior input until custom behavior element is clicked
    const [isPhase1Disabled, setIsPhase1Disabled] = useState(isClicked ? isClicked : true);

    //controls phase2/3 visibility, defaults to true
    const [isPhase2Disabled, setIsPhase2Disabled] = useState(true);
    const [isPhase3Disabled, setIsPhase3Disabled] = useState(true);

    //gets max rounds for phase2
    const phase2MaxRounds = () => {
        const max = (maxRounds - phase1.rounds) ? phase1.rounds : 0;
        return max;
    }

    //gets max rounds for phase3
    const phase3MaxRounds = () => {
        const max = (maxRounds - phase1.rounds - phase2.rounds) ? phase1.rounds : 0;
        return max;
    }

    // handles submit and bubbles up phase1-3 data
    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            onSubmit({ phase1, phase2, phase3 });
        } catch (err) {
            debugger;
        }
    }

    //clears all phase data and hides phase2 & 3
    const handleReset = (e) => {
        e.preventDefault();
        setPhase1(emptyPhase);
        setPhase2(emptyPhase);
        setPhase3(emptyPhase);
        setIsPhase2Disabled(true);
        setIsPhase3Disabled(true);
        debugger;
    }

    // handle's cancel, no logic attached yet
    const handleCancel = (e) => {
        e.preventDefault();
        console.log('cancel called on behavior view.\nCall onCancel if passed.\nNav to previous view if not passed');

    }

    // handles phase2/3 visibility
    const handlePhaseUpdates = () => {
        if (phase1.rounds > 0 && phase1.rounds < maxRounds) {
            setIsPhase2Disabled(false);
        }

        if (phase2.rounds > 0 && phase2.rounds < maxRounds) {
            setIsPhase3Disabled(false);
        }

        console.log('phase update');

    }
    // should i stop being lazy and separate these into 3 useEffects?
    useEffect(() => {
        handlePhaseUpdates();
    }, [phase1, phase2, phase3])


    //TODO
    /*
        implment update to behaviorinputcontainer logic
        refractor form children to 3 behaviorinputcontainer components + the last stuff
    */
    return (
        <div className="flex flex-row flex-wrap justify-center items-center rounded-md text-slate-100 text-left w-full">

            {/*isPhase1Disabled ? <></> :*/}
            <form className='[&_*]:text-right flex flex-col flex-wrap justify-center w-full' >
                {/* need to add visibility bool to behavior container*/}
                <BehaviorInputContainer phase={phase1} setPhase={setPhase1} label="Phase 1" rounds={maxRounds} />


                <label className='bg-slate-700'> Phase 2
                    {isPhase2Disabled ? <></> :
                        <BehaviorInputContainer
                            phase={phase2}
                            name={phase2}
                            orders={{ label: 'Orders per Turn', min: "0", max: "25" }}
                            rounds={{ label: "Turns of Ordering Behavior", min: "0", max: { phase2MaxRounds } }}
                            phaseUpdate={setPhase2}

                        />
                    }
                </label>
                <label className='bg-slate-700'> Phase 3
                    {isPhase3Disabled ? <></> :
                        <BehaviorInput
                            phase={phase3}
                            name={phase3}
                            orders={{ label: 'Orders per Turn', min: "0", max: "25" }}
                            rounds={{ label: "Turns of Ordering Behavior", min: "0", max: { phase3MaxRounds } }}
                            phaseUpdate={setPhase3}

                        />}
                </label>
                <div className="flex flex-row flex-wrap justify-center [&_*]:border-2 [&_*]:border-slate-300 mt-2 [&_*]:p-2 [&_*]:mx-1 [&_*]:rounded-md [&_*]:bg-slate-700">
                    <input type="submit" onClick={handleSubmit} value="OK"></input>
                    <input type="reset" value="Reset" onClick={handleReset}></input>
                    {onCancel ? <input type="reset" value="Cancel" onClick={handleCancel}></input> : <></>}
                </div>
            </form>

            {/*}*/}
        </div>
    );
};

export default Behavior;
