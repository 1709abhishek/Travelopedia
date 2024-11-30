import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardMedia, Typography, Button, Grid } from "@mui/material";
import FlightTakeoffIcon from "@mui/icons-material/FlightTakeoff";
import FlightLandIcon from "@mui/icons-material/FlightLand";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const FlightList = ({ flights, onSelect, selectedItems }) => {
  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(price);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleSelect = (flightNumber) => {
    onSelect?.(flights.find((flight) => flight.flightNumber === flightNumber));
  };

  return (
    <Grid container spacing={3} sx={{ padding: "20px" }}>
      {flights.map((flight, index) => (
        <Grid item xs={12} key={index}>
          <Card elevation={3} sx={{ display: "flex", padding: "20px", alignItems: "center" }}>
            {/* Airline Logo and Details */}
            <CardMedia
              component="img"
              image={flight.airlineLogo}
              alt={flight.airline}
              sx={{ width: 70, height: 70, borderRadius: "50%", marginRight: "20px" }}
            />
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h6" fontWeight="bold">
                {flight.airline} - {flight.flightNumber}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {flight.airplane} | {flight.travelClass}
              </Typography>
              <Grid container spacing={2} sx={{ marginTop: "10px" }}>
                {/* Departure Details */}
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <FlightTakeoffIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    {flight.departureAirportId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.departureTime}
                  </Typography>
                </Grid>
                {/* Duration */}
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <AccessTimeIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {formatDuration(flight.duration)}
                  </Typography>
                </Grid>
                {/* Arrival Details */}
                <Grid item xs={4} sx={{ textAlign: "center" }}>
                  <FlightLandIcon color="primary" />
                  <Typography variant="h6" fontWeight="bold">
                    {flight.arrivalAirportId}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {flight.arrivalTime}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            {/* Price and Book Now Button */}
            <div>
              <Typography variant="h6" fontWeight="bold" color="primary">
                {formatPrice(flight.price)}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "10px" }}
                onClick={() => handleSelect(flight.flightNumber)}
                disabled={selectedItems.some((selected) => selected.flightNumber === flight.flightNumber)}
              >
                {selectedItems.some((selected) => selected.flightNumber === flight.flightNumber) ? "Selected" : "Select"}
              </Button>
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

FlightList.propTypes = {
  flights: PropTypes.arrayOf(
    PropTypes.shape({
      departureAirportName: PropTypes.string.isRequired,
      departureAirportId: PropTypes.string.isRequired,
      departureTime: PropTypes.string.isRequired,
      arrivalAirportName: PropTypes.string.isRequired,
      arrivalAirportId: PropTypes.string.isRequired,
      arrivalTime: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      airplane: PropTypes.string.isRequired,
      airline: PropTypes.string.isRequired,
      airlineLogo: PropTypes.string.isRequired,
      travelClass: PropTypes.string.isRequired,
      flightNumber: PropTypes.string.isRequired,
      legroom: PropTypes.string,
      totalDuration: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onSelect: PropTypes.func.isRequired,
  selectedItems: PropTypes.arrayOf(PropTypes.string).isRequired, // Updated type
};

export default FlightList;
