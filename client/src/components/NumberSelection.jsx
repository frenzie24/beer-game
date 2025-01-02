import React, { useState, useEffect } from 'react';

//label and number selection component, val and setVal must be passed

const NumberSelection = ({ name = '', label, min = 0, max = 20, val, setVal, disabled = false }) => {
    if (!(val || setVal)) throw new Error('NumberSelection Component requires a passed val and setVal function');
    //Bubbles up value change
    /*
    @param {string} name - defaults to ''
    @param {string} label - Text to display in this component's label, if null label will be display - may lead to unexpected formatting
    @param {int} min - minimum value of selection range, defaults to 0
    @param {int} max - maximum value of selection range, defaults to 20
    @param {any} val - cannot be null
    @param {function} setVal - used to bubble up changes to passed val prop
    @param {bool} disabled - Controls visibility, defaults to false
*/
    //TODO: setVal and val rename?
    const handleChange = (e) => {
        setVal(e.target.value);
        console.log('number input val update')
    };

    // if a label is not pased, the label portion of the component will not render
    return (<>
        < div className="[&_*]:bg-slate-100 text-slate-700 font-semibold flex flex-row justify-between items-center flex-wrap ">
            {label ? <label className='p-1 w-1/2'>{label}</label> : <></>}
            <input
                className='text-center w-1/2 p-1 pb-2'
                type="number"
                value={val}
                onChange={handleChange}
                min={min ? min : 0}
                max={max ? max : 100}
                disabled={disabled}
            ></input>
        </div >
    </>
    )
}

export default NumberSelection;