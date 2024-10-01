import React from 'react';
import Search from './Search';

const Card = () => {
  return (
    <div className="h-[100%] w-[60%] mt-8 mx-auto bg-white rounded-lg shadow-md">
      <img
        src="https://as2.ftcdn.net/v2/jpg/05/43/05/13/1000_F_543051386_f8QRUxRlAlChXQxoG8lNOGqcvZEV7Xio.jpg"
        alt="Card Image"
        className="w-full h-36 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">All Payments are Secured</h2>
        <p className="text-gray-700 mb-4">Easy Pay in one Go</p>
        <Search />
      </div>
    </div>
  );
};

export default Card;
