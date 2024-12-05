import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from 'react';

const ItineraryDisplay = ({ itinerary }) => {
  const days = itinerary.split('**Day').filter(day => day.trim() !== '');

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {days.map((day, index) => {
          const [title, ...activities] = day.split('*').map(item => item.trim()).filter(Boolean);
          return (
            <Card key={index} className="bg-gray-800 text-gray-100">
              <CardHeader>
                <CardTitle className="text-xl font-bold">{`Day ${index + 1}: ${title}`}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity, actIndex) => {
                    const [time, description] = activity.split(':');
                    return (
                      <div key={actIndex} className="flex items-start">
                        <div className="min-w-[80px] font-semibold">{time}</div>
                        <div className="flex-1">
                          <p>{description}</p>
                          {activity.includes('[Image:') && (
                            <div className="mt-2 h-40 bg-gray-700 rounded-md flex items-center justify-center">
                              <span className="text-gray-400">Image: {activity.match(/\[Image: (.*?)\]/)[1]}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </ScrollArea>
  );
};

export default ItineraryDisplay;

