import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

export function UnderMaintainance() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8 text-center">
        
        <h1 className="mt-6 text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          Under Maintenance
        </h1>
        <p className="mt-2 text-xl text-gray-600">
          We're updating our travel blog to bring you even more amazing content!
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default UnderMaintainance;