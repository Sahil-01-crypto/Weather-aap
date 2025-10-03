const apikey = "a72848f7c5acf7e06eaf291896d3b8aa"
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="


const srchbox = document.querySelector(".searchcont input")
const srchbtn = document.querySelector(".searchcont button ")

async function chekWeather(city) {


    const response = await fetch(apiurl + city + `&appid=${apikey}`)

    if (response.status == 404) {


        document.querySelector(".priorpage").style.display = "none";
        document.querySelector(".weathercont").style.display = "none";
        document.querySelector(".errorpage").style.display = "block";
        alert("Enter a valid city name")
        return

    }
    else {
        var data = await response.json();
        console.log(data)

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + " °C";
        document.querySelector(".climate").innerHTML = data.weather[0].main
        document.querySelector(".cityname").innerHTML = `<i class='bx bx-map'></i>` + data.name;
        document.querySelector(".windmeasure").innerHTML = data.wind.speed + "  km/hr"
        document.querySelector(".humiditymeasure").innerHTML = data.main.humidity + " %";

        let sunrise = data.sys.sunrise; // in seconds
        let sunset = data.sys.sunset;   // in seconds
        let timezoneOffset = data.timezone; // offset in seconds from UTC

        // Convert to milliseconds and adjust timezone
        let sunriseTime = new Date((sunrise + timezoneOffset) * 1000);
        let sunsetTime = new Date((sunset + timezoneOffset) * 1000);

        // Format time (HH:MM)
        function getLocalTime(utcSeconds, timezoneOffset) {
    // Convert to milliseconds
    let localMillis = (utcSeconds + timezoneOffset) * 1000;
    let date = new Date(localMillis);

    return date.toUTCString().slice(17, 22); // HH:MM
}

// usage:
document.querySelector(".sunrise").textContent =   getLocalTime(data.sys.sunrise, data.timezone);
document.querySelector(".sunset").textContent  = getLocalTime(data.sys.sunset, data.timezone);

        if (data.weather[0].main === "Clouds") {
            document.querySelector(".weatherimg img").src = "overcast.png";
        }
        else if (data.weather[0].main === "Thunderstorm") {
            document.querySelector(".weatherimg img").src = "thunder.png";
        }
        else if (data.weather[0].main === "Drizzle") {
            document.querySelector(".weatherimg img").src = "drizzle (1).png";
        }
        else if (data.weather[0].main === "Rain") {
            document.querySelector(".weatherimg img").src = "rainy-day.png";
        }
        else if (data.weather[0].main === "Clear") {
            document.querySelector(".weatherimg img").src = "sun (1).png";
        }
        else if (data.weather[0].main === "Snow") {
            document.querySelector(".weatherimg img").src = "snowing.png";
        }




        document.querySelector(".priorpage").style.display = "none"
        document.querySelector(".errorpage").style.display = "none";
        document.querySelector(".weathercont").style.display = "block"



    }
}

srchbtn.addEventListener("click", function () {
    chekWeather(srchbox.value.trim())
})

srchbox.addEventListener("keydown" , function(e){
    if(e.key==="Enter"){
        chekWeather(srchbox.value .trim())
    }
})

