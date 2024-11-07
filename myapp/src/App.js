import { useEffect, useState } from "react";

function App() {
  const [city, setCity] = useState("Dehradun");
  const [weatherData, setWeatherData] = useState(null);
  const currentDate = new Date();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const formattedDate = `${month} ${day} ,${year}`;

  const API_key = "67972c559c9f1e0f4a224884a804ecff";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
      );
      const data = await response.json();

      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    console.log(event.target.value);
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  return (
    <div>
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="whether_data">
              <h2 className="container_city">{weatherData.name}</h2>
              <img
                className="container_img"
                src="./thunder.png"
                width="100px"
                style={{ marginTop: "50px" }}
                alt="thunder"
              />
              <h2 className="container_degree">{weatherData.main.temp}</h2>
              <h2 className="country_per">{weatherData.weather[0].main}</h2>

              <form className="form" onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter City Name"
                  onChange={handleInputChange}
                />
                <button type="submit">Get City</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
