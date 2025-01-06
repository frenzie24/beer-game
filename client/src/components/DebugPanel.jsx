import React, { useState, useEffect } from 'react';

const DebugPanel = ({ isLoading, gameOver, onAutoPlayClick, onRestartClick, onRevealDetailsClick }) => {

    const handleAutoPlayClick = (e) => {
        e.preventDefault();
        console.log("toggling autoplay")
        //bubble up onAutoPlayClick to a function to toggle auto play on and off in game.jsx
        onAutoPlayClick();
    }

    const handleRestartClick = (e) => {
        e.preventDefault();
        console.log("restarting game");
        onRestartClick();
    }

    const handleRevealDetailsClick = (e) => {
        e.preventDefault();
        console.log('revealing details')
        onRevealDetailsClick();
    }

    return (
        <>
            <button onClick={handleAutoPlayClick}>AUTOPLAY</button>
            <button onClick={handleRestartClick}>RESTART</button>
            <button onClick={handleRevealDetailsClick}>REVEAL DETAILS</button>
        </>
    )
}

export default DebugPanel;