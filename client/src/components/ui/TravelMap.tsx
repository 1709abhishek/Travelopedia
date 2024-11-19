'use client'

import axios from 'axios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

delete L.Icon.Default.prototype._getIconUrl

const traveledIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const wishlistIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

type Place = {
  name: string
  latitude: number
  longitude: number
  isWishlist: boolean
}

type TravelMapProps = {
  placesTraveled: string[]
  wishlist: string[]
}

export default function TravelMap({ placesTraveled, wishlist }: TravelMapProps) {
  const [places, setPlaces] = useState<Place[]>([])
  const [mapCenter, setMapCenter] = useState<[number, number]>([0, 0])
  const [mapZoom, setMapZoom] = useState(2)

  useEffect(() => {
    const fetchPlaces = async () => {
      const mockPlaces: Place[] = []

      const getLongAndLat = async (place: string, isWishlist: boolean): Promise<Place | null> => {
        const cachedData = localStorage.getItem(place)
        if (cachedData) {
          const parsedData = JSON.parse(cachedData)
          return { ...parsedData, isWishlist }
        }

        try {
          const response = await axios.get(`https://api.api-ninjas.com/v1/geocoding?city=${place}`, {
            headers: {
              'X-Api-Key': '+AFz6CaPsJpEgRjWkB/Scw==hx6V5LKP6FP54dq5'
            }
          })
          
          if (response.data && response.data.length > 0) {
            const placeData: Place = {
              name: response.data[0].name,
              latitude: response.data[0].latitude,
              longitude: response.data[0].longitude,
              isWishlist
            }
            
            localStorage.setItem(place, JSON.stringify(placeData))
            
            return placeData
          }
        } catch (error) {
          console.error('Error fetching place data:', error)
        }
        
        return null
      }

      for (const place of placesTraveled) {
        const placeData = await getLongAndLat(place, false)
        if (placeData) {
          mockPlaces.push(placeData)
        }
      }

      for (const place of wishlist) {
        const placeData = await getLongAndLat(place, true)
        if (placeData) {
          mockPlaces.push(placeData)
        }
      }

      setPlaces(mockPlaces)

      if (mockPlaces.length > 0) {
        setMapCenter([mockPlaces[0].latitude, mockPlaces[0].longitude])
        setMapZoom(4)
      }
    }

    fetchPlaces()
  }, [placesTraveled, wishlist])

  return (
    <div className="h-[600px] w-full">
      <MapContainer center={mapCenter} zoom={mapZoom} className="h-full w-full rounded-lg">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {places.map((place, index) => (
          <Marker 
            key={`${place.name}-${index}`} 
            position={[place.latitude, place.longitude]}
            icon={place.isWishlist ? wishlistIcon : traveledIcon}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{place.name}</h3>
                <p>{place.isWishlist ? 'Wishlist' : 'Traveled'}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}