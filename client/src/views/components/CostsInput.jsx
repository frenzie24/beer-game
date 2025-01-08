import React, { useState, useEffect } from 'react';
import NumberSelection from './NumberSelection';

const CostsInput = ({ name, onChange }) => {
    const [inventory, setInventory] = useState(0.50)
    const [backLog, setBacklog] = useState(1.00)


    useEffect(() => {
        onChange({ inventory, backLog });
    }, [inventory, backLog])

    return (
        <div className='py-1 bg-slate-100 flex flex-col flex-wrap items-apart  text-base'>
            <NumberSelection
                label={name + ' Dollar cost per item of inventory'}
                val={inventory}
                setVal={setInventory}
                step="0.25"
            />
            <NumberSelection
                label={name + ' Dollar cost per item of Backlog'}
                val={backLog}
                setVal={setBacklog}
                step="0.25"
            />
        </div>
    );
}

export default CostsInput;