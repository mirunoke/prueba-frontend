import React from 'react';
import { LineSpinner } from 'ldrs/react'
import 'ldrs/react/LineSpinner.css'

const Loader = () => {
  return (
    <div className="flex h-auto items-center justify-center flex-col mt-6">
      <LineSpinner
  size="40"
  stroke="3"
  speed="1"
  color="black" 
/>
    </div>
  );
};

export default Loader;
