import React, { useState, useEffect } from 'react';
import BehaviorInputContainer from './components/BehaviorInputContainer';

// empty phase data for reset ease
const emptyPhase = {
    rounds: 0, // represents numbers of rounds to place the number of orders
    orders: 0 // repreents number of orders to place per round
};

//Behavior view component
const Behavior = ({ name = 'custom', rounds, onSubmit, onCancel }) => {
    //is this needed?
    const [maxRounds, setMaxRounds] = useState(rounds ? typeof rounds === 'number' ? rounds : 10 : 10)
    //phase objs, max 3 phases of behavior, all default to 0 values
    const [phase1, setPhase1] = useState({ rounds: 0, orders: 0 });
    const [phase2, setPhase2] = useState({ rounds: 0, orders: 0 });
    const [phase3, setPhase3] = useState({ rounds: 0, orders: 0 });

    //controls phase2/3 visibility, defaults to true
    const [isPhase2Disabled, setIsPhase2Disabled] = useState(true);
    const [isPhase3Disabled, setIsPhase3Disabled] = useState(true);


    //NOT SURE WE CARE IF WE KNOW ABOUT MAX # OF ROUNDS
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
    /*
        const handleChange = (e) => {
            e.preventDefault();
            onChange({
                phase1, phase2, phase3
            })
        }
    */
    // handles submit and bubbles up phase1-3 data
    const handleSubmit = (e) => {
        debugger;
        e.preventDefault();
        try {
            onSubmit({ name, phase1, phase2, phase3 });
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

        // check phase 3 1st
        if (phase2.rounds > 0 && phase2.rounds < maxRounds) {
            setIsPhase3Disabled(false);
        } else {
            setIsPhase3Disabled(true)
        }
        //check phase 2
        if (phase1.rounds > 0 && phase1.rounds < maxRounds) {
            setIsPhase2Disabled(false);
        } else {
            // disable both phase 2 and 3
            setIsPhase2Disabled(true);
            setIsPhase3Disabled(true);
        }

        console.log('phase update');
        // onChange({phase1, phase2, phase3});

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
            {/* need to add visibility bool to behavior container*/}
            <form className='text-left flex flex-col flex-wrap justify-center w-full' >

                <BehaviorInputContainer phase={phase1} name='phase1' setPhase={setPhase1} label="Phase 1" rounds={maxRounds} />
                {/* controls if the phase is visible */}
                {!isPhase2Disabled ?
                    <BehaviorInputContainer phase={phase2} name='phase2' setPhase={setPhase2} label="Phase 2" rounds={phase2MaxRounds} />
                    : <></>
                }
                {/* controls if the phase is visible */}
                {!isPhase3Disabled ?
                    <BehaviorInputContainer phase={phase3} name='phase3' setPhase={setPhase3} label="Phase 3" rounds={phase3MaxRounds} />
                    : <></>
                }

                <div className="flex flex-row flex-wrap justify-center [&_*]:border-2 [&_*]:border-slate-300 mt-2 [&_*]:p-2 [&_*]:mx-4 [&_*]:rounded-md [&_*]:bg-slate-700">

                    <input type="reset" className="w-24 text-center" value="Clear" onClick={handleReset}></input>
                    <input type="submit" onClick={handleSubmit} value="Create New Behavior"></input>
                    {onCancel ? <input type="reset" value="Cancel" onClick={handleCancel}></input> : <></>}
                </div>
            </form>

            {/*}*/}
        </div>
    );
};

export default Behavior;
