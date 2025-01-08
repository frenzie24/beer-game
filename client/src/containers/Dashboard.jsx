import React, { useState, useEffect } from 'react';

const Dashboard = ({ round, name, role, roundsRemaining, gameOver, expenses }) => {
    return (
        <section>
             <h1 className="text-6xl font-extrabold mb-4"> Beer Game</h1>
            {!gameOver ? <div className='flex flex-row flex-wrap justify-between p-4 font-bold'>

                <h1 className="text-4xl mb-4">Round: {round + 1}</h1>
                <h1 className="text-4xl mb-4">Rounds Remaining: {roundsRemaining}</h1>
                <h1 className='text-4xl mb-4'>Expenses: ${expenses == 0 ? '0.0' : expenses}</h1>
            </div> : <div className='flex flex-row flex-wrap justify-center p-4'>
                <h1 className="text-6xl font-bold mb-4">GAME OVER</h1>
            </div>}


        </section>
    )
}

export default Dashboard;