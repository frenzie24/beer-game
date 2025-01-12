import React, { useState, useEffect } from 'react';
import { defaultBehavior, randomBehavior } from '../../controllers/Behaviors'
import Behavior from '../Behavior';
import DelayInput from './DelayInput';
import CostsInput from './CostsInput';
import { roleBgColors } from '../../controllers/GameController';
//increase element legiblity by condensing className
const liStyle = 'w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 capitalize';


const BehaviorsList = ({ id = 0, name = '', handleSelection, rounds = 10 }) => {
    //handles bad arguments passed
    if (!handleSelection) throw new Error('BehaviorList component MUST be passed a handleSubmit callback');

    //selected behavior obj
    const [selected, setSelected] = useState(defaultBehavior(rounds))
    // controls custom behavior input visibilty, defaults to false
    const [customVisible, setCustomVisible] = useState(false);
    // enables selecting custom behavior by clicking the custom behavior element
    const [customCreated, setCustomCreated] = useState(false);
    const [delay, setDelay] = useState(1);
    const [costs, setCosts] = useState({ inventory: 0.50, backLog: 1.00 })
    //need to add logic to bubble up behavior selection
    const handleSelect = (behavior) => {
        const newBehavior = { ...behavior, delay, costs };
        setSelected(newBehavior)
        handleSelection(newBehavior);
        setCustomCreated(true);
    }

    const handleCostsChange = (val) => {
        const newCosts = { ...val };
        setCosts(newCosts);
    }

    const handleDelayChange = (val) => {
        setDelay(val);
    }

    const handleBehaviorClick = (e) => {
        e.preventDefault();

        const id = parseInt(e.target.getAttribute('id'));
        //  const visible = customVisible;

        switch (id) {
            case 0:
                const dBehavior = defaultBehavior(rounds);
                handleSelect(defaultBehavior(rounds));
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
                //bubble a new behavior object to game view
                if (customCreated) handleSelect({ name: 'custom', phases: [selected.phase1, selected.phase2, selected.phase3], phase1: selected.phase1, phase2: selected.phase2, phase3: selected.phase3 })
                setCustomVisible(true)
                break;

        }

    }
    return (
        <article className={`${roleBgColors[id]} p-1 my-2 rounded-lg`}>

            <label className='text-slate-900 text-lg font-bold capitalize'><span>{name} Behavior {(selected) ? 'current behavior: ' + selected.name : ''}</span>
                {id != 4 ? <><DelayInput name={name} onChange={handleDelayChange} />
                    <CostsInput name={name} onChange={handleCostsChange} /> </> :
                    <></>}
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