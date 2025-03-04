// src/components/PlayerRole.js
import React, { useState } from 'react';
import Table from '../components/Table';


const roleBgColors = ['bg-yellow-500', 'bg-sky-500', 'bg-indigo-700', 'bg-orange-500', 'bg-red-700']

// should we store role behavior in player role view and bubble up?
/*
  We don't need to track received, remove or hide?
  - keep for debugging!

  - if were just trakcing inventory state we shouldnt need it for debugging
*/
//TDO: move everything we are tracking to passed role obj

//converts passed object to
const convertJSONToArray = (data) => {
  const result = [];

  const badFields = ['history', 'isHistoryVisible', 'isHidden', 'user_id', 'game_id']

  // take each key value pair and convert to array {2D array is result}
  for (var d in data)
    result.push([d, data[d]]);

  //remove array entryies we dont care about
  const newResult = result.filter(entry => !badFields.includes(entry[0]))
  return newResult;
}
const PlayerRole = ({ role, onOrder, isActive, onNextPlayer, isDisabled, detailsHidden, godMode }) => {

  // instead of pending received we track pending orders for the user

  const [ordered, setOrdered] = useState(role.ordered)
  const roleData = convertJSONToArray(role);
  const [pendingOrders, setPendingOrders] = useState(role?.pendingOrders || 0);
  /*
  const [received, setReceived] = useState(role?.received || 0);
  const [pendingReceived, setPendingReceived] = useState(role?.pendingReceived || 0);
  const [inventory, setInventory] = useState(role?.inventory || 0);
  */


  // gets role bg color by role id: [reailer, wholesaler, distributioner, manufacturer, customer]
  const classString = `${roleBgColors[role.role_id]} p-2 flex flex-row flex-wrap justify-center`;

  const getInventoryLabel = () => {
    return role.inventory >= 0 ? 'Inventory' : 'Backlog'
  }

  const handleOrderChange = (e) => {
    e.preventDefault();

    //pending orders will always start at their currernt pending orders + ordered
    const newPending = pendingOrders + ordered;
    setPendingOrders(newPending);
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
      {detailsHidden ? <></> :
        <div className='w-full'>
          {(godMode == true) ?
            <Table
              headers={['Status', 'Value']}
              data={roleData}
            /> : <Table
              headers={['Status', 'Value']}
              data={
                [
                  [getInventoryLabel(), role.inventory],
                  ['Received Orders', role.received],
                  ['Ordered This Week ', role.ordered],

                  ['Last Ordered', role.lastOrder]

                ]
              }
            />}
        </div>}
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
