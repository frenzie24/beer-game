import React, { useState, useEffect } from 'react';

const NumberSelection = ({ labelText, min, max, val, setVal }) => {

    const [selectedValue, setSelectedValue] = useState(val ? val : min ? min : max ? max : 0);



    const handleChange = (e) => {
        setVal(e.target.value);
       console.log('number input val update')
    };

    return (<>
        < div >
            {labelText}
            < input
                type="number"
                value={val}
                onChange={handleChange}
                min={min ? min : 0}
                max={max ? max : 100}
            />
        </div >
    </>
    )
}

export default NumberSelection;