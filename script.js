async function getWeatherData() {

    const city = document.getElementById("city").value;
    const API_KEY = '4f6b721622c26d880b695cf0449d8d01';

    if(city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    
    try {
        const response = await fetch(url);
        
        const data = await response.json();
        
        if(data.cod !== 200) {
            alert("city not found. Please enter a valid city name.");
            return;
        }

        if(data.weather[0].main === "Clear") {
            document.body.style.background = "linear-gradient(to right,#fbc2eb, #a6c1ee)";
        } else if(data.weather[0].main === "Clouds") {
            document.body.style.background = "linear-gradient(to right,#bdc3c7, #2c3e50)";
        } else if(data.weather[0].main === "Rain") {
            document.body.style.background = "linear-gradient(to right,#4e54c8, #8f94fb)";
        } else if(data.weather[0].main === "Snow") {
            document.body.style.background = "linear-gradient(to right,#e0eafc, #cfdef3)";
        } else if (data.weather[0].main === "Thunderstorm") {
            document.body.style.background = "linear-gradient(to right,#232526, #414345)";
        }

    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temperature").innerText = data.main.temp + " °C";
    document.getElementById("description").innerText = data.weather[0].description.toUpperCase();
    document.getElementById("sunrise").innerText = "Sunrise: " + new Date(data.sys.sunrise * 1000).toLocaleTimeString();
    document.getElementById("sunset").innerText = "Sunset: " + new Date(data.sys.sunset * 1000).toLocaleTimeString();
    document.getElementById("date").innerText = "Date: " + new Date().toLocaleDateString();

    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert("Failed to fetch weather data. Please try again.");
    }
}
