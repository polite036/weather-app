function getWeather() {
    let city = document.getElementById("city").value;
    if(city === ""){
        alert("Please enter city name");
        return;
    }
    let apiKey = "37faba27ba0873452a5b0c577cdd7cdf"; 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
    .then(res => res.json())
    .then(data => {
        if(data.cod !== 200){
            alert("City not found");
            return;
        }
        document.getElementById("weather-card").style.display = "block";
        document.getElementById("location").innerText = data.name;
        document.getElementById("temp").innerText = Math.round(data.main.temp) + "°C";
        document.getElementById("desc").innerText = data.weather[0].description;
        document.getElementById("humidity").innerText = data.main.humidity + "%";
        document.getElementById("icon").src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    })
    .catch(err => console.log(err));
}
