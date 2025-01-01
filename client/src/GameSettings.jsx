import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ErrorModal from './components/ErrorModal';
import Connection from './workers/Conncetion';
import Behavior from './Behavior';

const GameSettings = ({ }) => {
  // State for the game settings
  const [rounds, setRounds] = useState(10); // Default to 10 rounds
  const [role, setRole] = useState(0); // Default role
  const [entropy, setEntropy] = useState(2); // Default entropy level (1 to 10)
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || null)
  const navigate = useNavigate(); // Use useNavigate for React Router navigation
  const [roles, setRoles] = useState([
    { role_id: 0, name: "Retailer", user_id: user?.id ? user.id : 1, inventory: 10, ordered: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: [], isHistoryVisible: false },
    { role_id: 1, name: "Wholesaler", user_id: user?.id ? user.id : 1, inventory: 20, ordered: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: [], isHistoryVisible: false },
    { role_id: 2, name: "Distributor", user_id: user?.id ? user.id : 1, inventory: 20, ordered: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: [], isHistoryVisible: false },
    { role_id: 3, name: "Manufacturer", user_id: user?.id ? user.id : 1, inventory: 20, ordered: 0, lastOrder: 0, received: 0, totalReceived: 0, pendingReceived: 0, roundsPending: 0, history: [], isHistoryVisible: false },
  ]);

  const [errorMessage, setErrorMessage] = useState('');

  const handleBehaviorSubmit = ({ phases }) => {
    debugger;
    console.log(phases)
  }

  // Handle form submission to start the game
  const handleStartGame = async (e) => {
    const data = { game: { round: 0, rounds, selectedRole: role, entropy, history: '' }, players: roles };
    e.preventDefault();

    try {
      // const response = await Connection.newGame(data);
      const response = await fetch('http://localhost:3001/api/games/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      debugger;
      if (response.ok) {
        debugger;
        const data = await response.json();
        console.log('GAME CREATED:', data);
        localStorage.setItem('authToken', data.token); // Store the token
        return data;
        //          navigate('/game', { state: { id: data.game.id, user: user, role: Number(role), rounds: rounds, entropy: entropy, players: data.players } });
        //

        // Redirect to profile page after successful login
      }
      debugger;
      if (response) {
        debugger;

        localStorage.setItem('authToken', response.token); // Store the token
        navigate('/game', { state: { id: response.game.id, user: user, role: Number(role), rounds: rounds, entropy: entropy, players: response.players } });
        //

        // Redirect to profile page after successful login
      } else {
        const data = await response.json();
        debugger;
        setErrorMessage(data.message || 'Oops!  We\'re not sure what happened.');
        //   navigate('/login');
      }
    } catch (error) {
      debugger;
      //setIsLoading(false);
      setErrorMessage('An error occurred. Please try again.');
      //navigate('/login');
      console.error(error);
    }




  };
  const handleSelectRole = (e) => {
    const val = e.target.value;
    setRole(val);
  }

  const handleOnRoundsChange = (e) => {
    const val = e.target.value > 50 ? 50 : e.target.value;

    setRounds(val);
  }


  const handleBehaviorClick = (e) => {
    e.preventDefault();
    debugger;
  }

  return (
    <div className="game-settings-container p-6 bg-slate-200 rounded-md shadow-md">
      <ErrorModal
        errorMessage={errorMessage}
        onClose={() => setErrorMessage('')}
      />
      <h2 className="text-4xl font-extrabold mb-4 text-slate-800 text-center">Game Settings</h2>

      <form >
        {/* Rounds Input */}
        <div className="mb-4">
          <label htmlFor="rounds" className="block text-sm text-black font-semibold">Rounds:</label>
          <input
            type="number"
            id="rounds"
            value={rounds}
            onChange={handleOnRoundsChange}
            min="1"
            className="mt-1 px-3 py-2 border rounded-md w-full bg-slate-900"
          />
        </div>

        {/* Role Selection Dropdown */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm text-black font-semibold">Select Role:</label>
          <select
            id="role"
            value={role}
            onChange={handleSelectRole}
            className="mt-1 px-3 py-2 border rounded-md w-full  bg-slate-900"
            disabled={false}
          >
            <option value={0}>Retailer</option>
            <option value={1}>Wholesaler</option>
            <option value="2">Distributor</option>
            <option value="3">Manufacturer</option>
          </select>
        </div>

        {/* Random Entropy Level Dropdown
        <div className="mb-4">
          <label htmlFor="entropy" className="block text-sm text-black font-semibold">Random Entropy Level (1-10):</label>
          <select
            id="entropy"
            value={entropy}
            onChange={handleSelectEntropy}
            className="mt-1 px-3 py-2 border rounded-md w-full  bg-slate-900"
          >
            {[...Array(10).keys()].map((i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </div>
        */}

        {/* Submit Button */}


      </form>
       {/* behavior settings */}
       <label htmlFor='retailerBehavior' className='text-slate-900 text-lg font-bold'>Retailer Behavior
          <ol>
            <li key='1'  className="w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 p-2" onClick={handleBehaviorClick}>Default Behavior</li>
            <li key='2' className="w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 p-2 mt-1">Random Behavior</li>
            <li key="4"  className="w-full bg-slate-900 text-slate-200 rounded-md border-2 border-slate-900 p-2 mt-1">
              Custom Behavior

              <Behavior id='retailerBehavior' rounds={rounds} onSubmit={handleBehaviorSubmit} />

            </li>

          </ol>
        </label>
        <div className="flex justify-center">
          <button
            onClick={handleStartGame}
            className=" [&_*]:border-2 [&_*]:border-slate-300 mt-2 [&_*]:p-2 [&_*]:mx-1 [&_*]:rounded-md [&_*]:bg-slate-700"
          >
            Start Game
          </button>
        </div>
    </div>
  );
};

export default GameSettings;
