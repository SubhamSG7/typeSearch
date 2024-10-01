import React from 'react';

const PaymentLoading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-300 bg-gray-100">
            <div className="loader border-t-transparent border-4 border-indigo-400 border-solid rounded-full w-12 h-12 animate-spin mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Processing your payment...</p>
        </div>
    );
};

export default PaymentLoading;
