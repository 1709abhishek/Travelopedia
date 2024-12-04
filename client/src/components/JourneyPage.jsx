import { Calendar, Camera, ChevronRight, DollarSign, Globe, MapPin, Plane, Users } from 'lucide-react';
import React, { useContext, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AccountContext } from "@/contexts/AccountContext";
import { useNavigate } from 'react-router-dom';
import Header from "./Header.jsx";
import TravelMap from "./ui/TravelMap.tsx";

const JourneyPage = () => {
  const {
    accountState,
  } = useContext(AccountContext);
  const navigate = useNavigate();
  const [userData] = useState({
    name: accountState.firstName + " " + accountState.lastName,
    username: accountState.username,
    location: accountState.city + ", " + accountState.country,
    travelPercentile: 95,
    milesTraveled: 50000,
    countriesVisited: accountState.placeTravelled ? accountState.placeTravelled.length : 0,
    tripsPlanned: accountState.wishlist ? accountState.wishlist.length : 0,
  });


  return (
    <div className="homepage">
    <div className="min-h-screen bg-black text-white w-full">
      {/* Header with tabs */}
      <header className="flex h-16 items-center justify-between bg-zinc-900">
        <h1 className="text-xl font-bold header-navbar">Travelopedia</h1>
        
        <Header></Header>
      </header>

      {/* Main content */}
      <main className="grid grid-cols-1 md:grid-cols-[280px_1fr] w-full">
        {/* Sidebar */}
        <aside className="bg-zinc-900 p-6 flex flex-col items-center">
          <Avatar className="h-24 w-24 mb-4">
            <AvatarImage src="/api/placeholder/96/96" alt={userData.name} />
            <AvatarFallback className="bg-zinc-800 text-xl">{userData.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold">{userData.name}</h2>
          <p className="text-sm text-zinc-400 mb-6">@{userData.username}</p>
          
          <div className="w-full space-y-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              {userData.location}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4" />
              {userData.countriesVisited} countries visited
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4" />
              {userData.tripsPlanned} trips planned
            </div>
          </div>
          
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={()=>navigate('/account')}>Edit Profile</Button>
        </aside>

        {/* Main content area */}
        <div className="bg-black p-6 space-y-6">
          {/* Travel Percentile Card */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Your Travel Percentile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-zinc-400">Beginner</span>
                <span className="text-sm text-zinc-400">Expert</span>
              </div>
              <Progress value={userData.travelPercentile} className="h-2 bg-zinc-800" />
              <p className="mt-2 text-center text-sm">
                You're in the top {100 - userData.travelPercentile}% of travelers!
              </p>
            </CardContent>
          </Card>

          

          {/* Stats Grid */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Miles Traveled</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.milesTraveled.toLocaleString()}</div>
                <p className="text-xs text-zinc-400">Miles</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Countries Visited</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.countriesVisited}</div>
                <p className="text-xs text-zinc-400">Out of 195 countries</p>
              </CardContent>
            </Card>
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>Upcoming Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{userData.tripsPlanned}</div>
                <p className="text-xs text-zinc-400">Trips planned</p>
              </CardContent>
            </Card>
          </div>

          {/* Travel Map : Places Traveled or wishlist*/}
          <Card className="bg-zinc-900 border-zinc-800">
  <CardHeader className="flex flex-row items-center justify-between p-4">
    <CardTitle className="text-xl font-bold">Travel Map</CardTitle>
    <div className="flex items-center space-x-4">
      <div className="flex items-center">
        <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
        <span>Traveled</span>
      </div>
      <div className="flex items-center">
        <div className="w-4 h-4 bg-red-500 rounded-full mr-2"></div>
        <span>Wishlist</span>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <TravelMap placesTraveled={accountState.placeTravelled} wishlist={accountState.wishlist}/>
  </CardContent>
</Card>
          
          {/* Recent Travels */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Recent Travels</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { place: "Tokyo, Japan", date: "October 2023" },
                  { place: "Paris, France", date: "August 2023" },
                  { place: "New York, USA", date: "June 2023" },
                ].map((trip, index) => (
                  <div key={index} className="flex items-center justify-between hover:bg-zinc-800 p-2 rounded-lg cursor-pointer">
                    <div>
                      <div className="font-semibold">{trip.place}</div>
                      <div className="text-sm text-zinc-400">{trip.date}</div>
                    </div>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Travel Achievements */}
          <Card className="bg-zinc-900 border-zinc-800">
            <CardHeader>
              <CardTitle>Travel Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Plane, label: "First Flight" },
                  { icon: Camera, label: "100 Photos" },
                  { icon: Globe, label: "5 Continents" },
                  { icon: DollarSign, label: "Budget Master" },
                  { icon: Users, label: "Group Trip" },
                ].map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 bg-zinc-800 rounded-full px-3 py-1">
                    <achievement.icon className="h-4 w-4" />
                    <span className="text-sm">{achievement.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
        </div>
      </main>
    </div>
    </div>
  );
};

export default JourneyPage;