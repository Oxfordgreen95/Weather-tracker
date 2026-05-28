document.getElementById("submit-button").addEventListener("click", function() {

    let temperature =
        document.getElementById("Temperature").value;

    let humidity =
        document.getElementById("Humidity").value;

    console.log("Temperature:", temperature);
    console.log("Humidity:", humidity);

    document.getElementById("data-recorded")
        .style.display = "block";

    let weatherLog =
        document.getElementById("weather-log");

        if (temperature == "" || humidity == "") {

        document.getElementById("data-recorded")
        .style.display = "none";  
    

    weatherLog.innerHTML = `
        <p>Please enter both temperature and humidity.</p>
    </p>
    `;

    return;
}

     let currentDate = new Date();
        let formattedDate = currentDate.toLocaleString();
        
    let weatherData = {
        temperature: temperature,
        humidity: humidity,
        date: formattedDate
    };

    localStorage.setItem("weatherData", JSON.stringify(weatherData));

    weatherLog.innerHTML = `
        <p>${temperature}&deg;F | ${humidity}%</p>
        <p>
        Recorded: ${formattedDate}
    </p>
    `;
document.getElementById("Temperature").value = "";
document.getElementById("Humidity").value = "";
});

let savedWeather =
    localStorage.getItem("weatherData");

if (savedWeather) {

    savedWeather =
        JSON.parse(savedWeather);

    document.getElementById("weather-log")
        .innerHTML = `
        <p class="data-recorded">
            ${savedWeather.temperature}&deg;F |
            ${savedWeather.humidity}%
        </p>

        <p>
            Recorded:
            ${savedWeather.date}
        </p>
    `;

}