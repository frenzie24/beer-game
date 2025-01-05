// src/components/PlayerRole.js
import React, { useState } from 'react';
import Table from './Table';
import { roleBgColors } from '../workers/GameController';

// should we store role behavior in player role view and bubble up?
/*
  We don't need to track received, remove or hide?
  - keep for debugging!

  - if were just trakcing inventory state we shouldnt need it for debugging
*/
//TDO: move everything we are tracking to passed role obj
const PlayerRole = ({ role, received, onOrder, isActive, onNextPlayer, isDisabled, }) => {

  // instead of pending received we track pending orders for the user
  const [ordered, setOrdered] = useState(role.ordered)
  const [pendingOrders, setPendingOrdered] = useState(role?.pendingOrders || 0);
  const [inventory, setInventory] = useState(role?.inventory || 0);


  // gets role bg color by role id: [reailer, wholesaler, distributioner, manufacturer, customer]
  const classString = `${roleBgColors[role.role_id]} p-2 flex flex-row flex-wrap justify-center`;

  const getInventoryLabel= () => {
    return inventory >= 0 ? 'Inventory' : 'Backlog'
  }

  const handleOrderChange = (e) => {
    e.preventDefault();

    //pending orders will always start at their currernt pending orders + ordered
    const newPending = pendingOrders + ordered;
    setPendingOrdered(newPending);
    setOrdered(parseInt(e.target.value) || 0);

  };


  const handleReceived = () => {
    const newReceived = 0;
  }

  const handleShipment = () => {

  }

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    onOrder(role.role_id, ordered);
    // onOrder(role.id, ordered);
    setOrdered(0);
    onNextPlayer();
  };


  return (
    <div className={classString}>
      <h3 className="[text-shadow:_2px_2px_2px_rgb(0_0_0_/_80%)] text-3xl text-center font-bold text-shadow-90 rounded-lg w-full p-2">{role.name}</h3>
      <div className='w-full'>
        <Table
          headers={['Status', 'Value']}
          data={
            [
              [getInventoryLabel(), inventory],
              ['Pending Orders', pendingOrders],
              ['Ordered This Week ', role.ordered],

              ['Last Ordered', role.lastOrder]

            ]
          }
        />
      </div>
      <input
        type="number"
        value={role.ordered ? role.ordered : ordered}
        onChange={handleOrderChange}
        onSubmit={handleOrderSubmit}
        disabled={!isActive || isDisabled} // Disable if not the active player
        className="text-center mt-1 appearance-none rounded-md w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus,outline-none focus,ring-indigo-500 focus,border-indigo-500"

      />
      <button onClick={handleOrderSubmit} disabled={!isActive} className="next-btn mt-2">
        Place Order
      </button>
    </div>
  );
};

export default PlayerRole;
