import { ScrollArea } from "@/components/ui/scroll-area";
import React from 'react';

const StructuredItinerary = ({ itinerary }) => {
  const days = itinerary?.split('**Day')?.slice(1)?.filter(day => day.trim() !== '');

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6 text-gray-200">
        {days ? days.map((day, index) => {
          const [title, ...activities] = day.split('*').map(item => item.trim()).filter(Boolean);
          return (
            <div key={index} className="mb-6">
              <h2 className="text-xl font-bold mb-3">{`Day ${title}`}</h2>
              <ul className="list-disc pl-5 space-y-2">
                {activities.length!=0 ? activities.map((activity, actIndex) => {
                  const [time, ...descriptionParts] = activity.split(':');
                  const description = descriptionParts.join(':').trim();
                  const imageMatch = description.match(/\[Image: (.*?)\]/);
                  const imageDescription = imageMatch ? imageMatch[1] : null;

                  return (
                    <li key={actIndex}>
                      <span className="font-semibold">{time}:</span> {description.replace(/\[Image: .*?\]/, '')}
                      {imageDescription && (
                        <div className="mt-2 text-sm text-gray-400">
                          [Image: {imageDescription}]
                        </div>
                      )}
                    </li>
                  );
                }): null}
              </ul>
            </div>
          );
        }): null}
      </div>
    </ScrollArea>
  );
};

export default StructuredItinerary;

