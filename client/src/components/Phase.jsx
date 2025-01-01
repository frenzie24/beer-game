import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BehaviorInput from './BehaviorInput';

const Phase = ({phase, setPhase, label, rounds}) => {


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

export default Phase;