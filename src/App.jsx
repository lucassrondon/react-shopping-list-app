import './App.css';
import groceryCartImg from './assets/cart.png';
import { useState, useEffect } from 'react';

function App() {
  // Setting state variables
  const [inputValue, setInputValue] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);
  const [isDone, setIsDone] = useState(false);

  // Watching groceryItems for change
  useEffect(() => {
    checkIfIsDone();
  }, [groceryItems]);

  // Handling input change of value
  const changeInput = (event) => {
    let character = event.target.value;
    setInputValue(character);
  }

  // Checking if all items are completed
  const checkIfIsDone = () => {
    console.log('called');
    if (!groceryItems.length) {
      setIsDone(false);
      return;
    }

    for (let index in groceryItems) {
      if (groceryItems[index].completed == false) {
        setIsDone(false);
        return;
      }
    }
    setIsDone(true);
  }

  // Handling addition of new items
  const handleAddGroceryItem = (event) => {
    if (event.key != 'Enter' || inputValue === '') {
      return;
    }

    let updatedGroceryItems = [...groceryItems];

    const itemIndex = updatedGroceryItems.findIndex(
      item => item.name === inputValue
    );

    if (itemIndex === -1) {
      updatedGroceryItems.push({
        'name': inputValue,
        'amount': 1,
        'completed': false,
      });
    } else {
      updatedGroceryItems[itemIndex].amount++;
    }

    setGroceryItems(updatedGroceryItems);
    setInputValue('');
  }

  // Handling removal of an item
  const handleRemoveGroceryItem = (itemToRemoveName) => {
    const updatedGroceryItems = [...groceryItems].filter(
      item => item.name !== itemToRemoveName
    );

    setGroceryItems(updatedGroceryItems);
  }

  // Handling change of completion status
  const handleCompletedStatus = (status, index) => {
    let updatedGroceryItems = [...groceryItems];
    updatedGroceryItems[index].completed = status;
    setGroceryItems(updatedGroceryItems);
  }
  
  // Rendering items of the shopping list
  const renderGroceryItems = () => {
    return groceryItems.map((item, index) => (
      <li className='flex justify-between' key={item.name}>
        <div className='flex gap-2'>
          <input type="checkbox" onChange={(event) => {handleCompletedStatus(event.target.checked, index)}} value={item.completed}/>
          <p>
            {item.name}
          </p>
        </div>

        <div className='flex gap-2 items-center'>
          {item.amount > 1 ? <span className='font-bold text-sm'>x{item.amount}</span> : false}
          <button className='remove-button text-red-600' onClick={() => handleRemoveGroceryItem(item.name)}>X</button>
        </div>
      </li>
    ));
  }

  return (
    <main className='flex flex-col h-screen items-center gap-6 font-mono'>
      {isDone ? <h1 className='text-green-500 mt-6'>You're done!</h1> : false}
      <h1 className='mt-6 font-bold'>Shopping List</h1>
      <div className='flex flex-col gap-6'>
        <img src={groceryCartImg} alt="" />
        <input type="text"
          placeholder='Add an Item'
          onChange={changeInput}
          onKeyDown={handleAddGroceryItem}
          value={inputValue}
        />
      </div>

      <ul className='flex flex-col md:w-1/6 w-1/2'>
        {renderGroceryItems()}
      </ul>
    </main>
  );
}

export default App
