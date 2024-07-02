import videoHomepage from "../../assets/video-homepage.mp4";
const HomePage = () => {
  return (
    <div className="homepage-container">
      <div className="container">
        <div className="home-title">
          <h1>Make forms worth filling out</h1>
          <p>
            Get more data—like signups, feedback, and anything else—with forms
            designed to be refreshingly different.
          </p>
          <button className="btn btn-dark">Get started—it's free</button>
        </div>
      </div>
      <video autoPlay muted loop>
        <source src={videoHomepage} type="video/mp4" />
      </video>
    </div>
  );
};

export default HomePage;
