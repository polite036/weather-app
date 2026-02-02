const apiKey = "37faba27ba0873452a5b0c577cdd7cdf";
function getWeather() {
    const city = document.getElementById("city").value;
    if (!city) return;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        if (data.cod !== 200) {
            alert("City not found");
            return;
        }
        document.getElementById("location").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°";
        document.getElementById("desc").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("feels-like").innerText = Math.round(data.main.feels_like) + "°";
        document.getElementById("wind").innerText = data.wind.speed + " km/h";
        document.getElementById("date").innerText = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
        document.getElementById("icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
        document.getElementById("weather-card").style.display = "grid";
        setTheme(data.main.temp);
    })
    .catch(err => console.error(err));
}

function setTheme(temp) {
    const body = document.body;
    if (temp > 30) {
        body.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #450a0a 0%, #09090b 100%)');
    } else if (temp > 20) {
        body.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #422006 0%, #09090b 100%)');
    } else if (temp > 10) {
        body.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1e293b 0%, #09090b 100%)');
    } else {
        body.style.setProperty('--bg-gradient', 'linear-gradient(135deg, #1e1b4b 0%, #0891b2 100%)');
    }
}
document.getElementById("city").addEventListener("keypress", (e) => {
    if (e.key === "Enter") getWeather();
});