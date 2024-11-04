import Header from "../components/Header.jsx";

function ExplorePage() {
  return (
    <div>
      <div className="content-other">
        <Header></Header>
      </div>
      <ul>
        <li>
          Personalized Suggestions: A list/grid of destination cards recommended
          based on the user's past travels or preferences (ML/AI-driven).
        </li>
        <li>
          Wishlist Integration: Each card can have a "Wishlist" button to save
          destinations.
        </li>
        <li>
          Itinerary Planner: Users can start building an itinerary from here
          with an easy drag-and-drop interface to organize days and activities.
        </li>
      </ul>
    </div>
  );
}

export default ExplorePage;
