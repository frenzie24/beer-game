import React, { useState, useEffect } from 'react';

const NumberRange = ({labelText, min, max, val, setVal}) => {


    const handleChange = (e) => {
        setVal(e);
    };

    return (
        <div className="w-full bg-slate-100 text-slate-700 font-semibold flex justify-center items-center">

            <label name="vol">{labelText}:</label>
            <input type="range" id="vol" name="vol" min={min ? min : 0} max={max ? max : 10} onChange={setVal} value={val} />
        </div>
    )
}

export default NumberRange;