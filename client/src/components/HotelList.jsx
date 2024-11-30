import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent } from "@/components/ui/card";
import hotelImg from '../assets/hotel.jpeg';

const HotelList = ({ hotels, onSelect, selectedItems }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleSelect = (hotelId) => {
    onSelect?.(hotels.find(hotel => hotel.hotelId === hotelId));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
      {hotels.map((hotel) => (
        <div 
          key={hotel.hotelId}
          onClick={() => handleSelect(hotel.hotelId)}
          className="cursor-pointer"
        >
          <Card className={`bg-gray-800 border-gray-700 transition-all duration-200 ${
            selectedItems.some(item => item.hotelId === hotel.hotelId)
              ? 'ring-2 ring-blue-500 ring-offset-2 ring-offset-gray-900' 
              : 'hover:border-gray-600'
          }`}>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={hotelImg}
                  alt={hotel.hotelName}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 left-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    selectedItems.some(item => item.hotelId === hotel.hotelId)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-white bg-transparent'
                  }`}>
                    {selectedItems.some(item => item.hotelId === hotel.hotelId) && (
                      <div className="w-2 h-2 rounded-full bg-white" />
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{hotel.hotelName}</h3>
                <div className="flex items-center justify-between mt-2 text-gray-400">
                  <div className="flex items-center">
                    <span>{hotel.cityCode}</span>
                    {hotel.available && (
                      <span className="ml-2 px-2 py-0.5 bg-green-900/30 text-green-400 rounded-full text-sm">
                        Available
                      </span>
                    )}
                  </div>
                  <span className="text-white font-semibold">
                    {formatPrice(hotel.price)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};
HotelList.propTypes = {
  hotels: PropTypes.arrayOf(
    PropTypes.shape({
      hotelId: PropTypes.number.isRequired,
      hotelName: PropTypes.string.isRequired,
      cityCode: PropTypes.string.isRequired,
      available: PropTypes.bool.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func,
  selectedItems: PropTypes.arrayOf(
    PropTypes.shape({
      hotelId: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default HotelList;