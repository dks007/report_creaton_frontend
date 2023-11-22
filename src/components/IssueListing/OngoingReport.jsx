import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/reducer/exampleReducer';

const OngoingReport = () => {
    const counter = useSelector((state) => state.example.counter);
    const dispatch = useDispatch();
  
    const handleIncrement = () => {
      dispatch(increment());
    };
  
    const handleDecrement = () => {
      dispatch(decrement());
    };
  return (
    <div className="p-3">
        <span>OngoingReport</span>
        <p>Counter: {counter}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={handleDecrement}>Decrement</button>
    
    </div>
  )
}

export default OngoingReport