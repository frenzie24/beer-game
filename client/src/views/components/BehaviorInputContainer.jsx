import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BehaviorInput from './BehaviorInput';

//behavior input container component
const BehaviorInputContainer = ({ phase, setPhase, label, rounds }) => {


    //TODO: LOGIC TO HANDLE VISIBILITY HERE?
    return (<>
        <label className='px-1 bg-slate-700'>{label} </label>
        <BehaviorInput
            phase={phase}
            name={phase}
            orders={{ label: 'Orders per Week', min: "0", max: "25" }}
            rounds={{ label: "Number of Weeks to Repeat Order", min: "0", max: { rounds } }}
            phaseUpdate={setPhase}

        />
    </>
    );
}

export default BehaviorInputContainer;