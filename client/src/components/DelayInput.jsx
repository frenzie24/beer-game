import React, { useState, useEffect } from 'react';
import NumberSelection from './NumberSelection';

const DelayInput = ({ name, onChange }) => {
    const [delay, setDelay] = useState(1);

    useEffect(()=>{
        onChange(delay);
    }, [delay]);

    return (
        <div className='py-1 bg-slate-100 flex flex-col flex-wrap items-apart text-base'>
            <NumberSelection
                label={name + ' Delay in weeks'}
                val={delay}
                setVal={setDelay}
                step="1"
            />
        </div>
    );
}

export default DelayInput;