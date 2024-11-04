import Header from "../components/Header.jsx";

function JourneyPage() {
  return (
    <div>
      <div className="content-other">
        <Header></Header>
      </div>
      <ul>
        <li>
          Timeline View: Display a scrollable timeline of the user's trips, with
          each trip clickable to show more details (days, locations, photos).
        </li>
        <li>
          Trip Overview: A card layout or list of each trip the user has taken.
          Each card could contain a trip summary, a small photo preview, and
          stats (like number of days, miles traveled).
        </li>
        <li>Add New Trip Button: Floating button to log new trips.</li>
      </ul>
    </div>
  );
}

export default JourneyPage;
