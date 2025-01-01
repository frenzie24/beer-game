import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BehaviorInput from './BehaviorInput';

//behavior input container component
const BehaviorInputContainer = ({phase, setPhase, label, rounds}) => {


    //TODO: LOGIC TO HANDLE VISIBILITY HERE?
    return (
        <label className=' bg-slate-700'>{label}
            <BehaviorInput
                phase={phase}
                name={phase}
                orders={{ label: 'Orders per Turn', min: "0", max: "25" }}
                rounds={{ label: "Turns of Ordering Behavior", min: "0", max: { rounds } }}
                phaseUpdate={setPhase}

            />
        </label>
    );
}

export default BehaviorInputContainer;