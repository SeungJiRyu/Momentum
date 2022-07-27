const API_KEY = "c26a18f5d1f221af88d4b81ffade4a25";

function onGeoOk(position){
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log("You live in",lat,lon);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    fetch(url)
        .then(response => response.json())
        .then(data=>{
            const city = document.querySelector("#weather span:last-child")
            const weather = document.querySelector("#weather span:first-child")
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`    
            city.innerText = data.name;
        });
    }

function onGeoError(){
    alert("Can't find you. No weather for you.");
}

navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);