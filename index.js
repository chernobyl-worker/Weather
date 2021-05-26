const input = document.querySelector("#city");
const form = document.querySelector("#search");

window.onload = () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Delhi&appid=d5413aa165d164dbcefab4e9761990c2&units=metric`;
    fetch(url).then(r => r.json()).then(r => display(r));
}
form.onsubmit = (e) => {
    e.preventDefault();
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=d5413aa165d164dbcefab4e9761990c2&units=metric`;
    input.value = "";
    fetch(url).then(r => r.json()).then(r => display(r));
}

function display(data) {
    if(data.cod === "404" || data.cod === "400") {
        handleError(data);
        return;
    }
    document.querySelector(".temp").textContent = data.main.temp+"°";
    document.querySelector(".weather-icon").src =  "http://openweathermap.org/img/wn/"+data.weather[0].icon+"@2x.png"
    document.querySelector(".feels-like").textContent = "Feels like "+data.main.feels_like+"°";
    document.querySelector(".Location").textContent = "Location: "+data.name + ", "+data.sys.country;
    document.querySelector(".desc").textContent = data.weather[0].description;
    document.querySelector(".humidity").textContent ="Humidity: "+data.main.humidity+"%";
    document.querySelector(".temp-min").textContent = "Max: "+data.main.temp_min;
    document.querySelector(".temp-max").textContent = "Min: "+data.main.temp_max;
    document.querySelector(".wind-speed").textContent = "Wind Speed: "+data.wind.gust + " m/s";
    document.querySelector(".wind-deg").textContent = "Direction: "+ data.wind.deg + "°";
    document.querySelector(".main").textContent = data.weather[0].main+":";
}

function handleError(e) {
    document.querySelector(".temp").textContent = "";
    document.querySelector(".weather-icon").src =  ""
    document.querySelector(".feels-like").textContent = "";
    document.querySelector(".Location").textContent = e.cod;
    document.querySelector(".desc").textContent = "";
    document.querySelector(".humidity").textContent = e.message;
    document.querySelector(".wind-deg").textContent = "";
    document.querySelector(".temp-min").textContent = "";
    document.querySelector(".temp-max").textContent = "";
    document.querySelector(".wind-speed").textContent = "";
    document.querySelector(".main").textContent = "";
}
