function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "37faba27ba0873452a5b0c577cdd7cdf"; 
    if(!city) return alert("Enter a city!");
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        if(data.cod !== 200) return alert("City not found!");
        document.getElementById("location").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°";
        document.getElementById("desc").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("feels-like").innerText = Math.round(data.main.feels_like) + "°";
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        const options = { weekday: 'long', day: 'numeric', month: 'long' };
        document.getElementById("date").innerText = new Date().toLocaleDateString('en-US', options);
        updateTheme(data.main.temp);
        document.getElementById("weather-card").style.display = "block";
    });
}

function updateTheme(temp) {
    const body = document.getElementById("body-bg");
    if (temp > 25) {
        body.style.background = "linear-gradient(135deg, #f83600 0%, #f9d423 100%)";
    } else if (temp < 10) {
        body.style.background = "linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)";
    } else {
        body.style.background = "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)";
    }
}
document.getElementById("city").addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather();
});