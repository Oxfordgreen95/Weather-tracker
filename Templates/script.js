let chart;

function createChart(weatherHistory) {

    // 1. Get dates

    const labels = weatherHistory.map(
        entry => entry.date
    );

    // 2. Get temperatures

    const temperatures =
        weatherHistory.map(
            entry => entry.temperature
        );

    // 3. Get humidity values

    const humidities =
        weatherHistory.map(
            entry => entry.humidity
        );

    // 4. Find canvas

    const ctx =
        document.getElementById(
            "weather-chart"
        );

    // Destroy old chart first

    if (chart) {
        chart.destroy();
    }

    // Create chart

    chart = new Chart(ctx, {

        type: "line",

        data: {

            labels: labels,

            datasets: [

                {
                    label:
                        "Temperature (°F)",

                    data:
                        temperatures
                },

                {
                    label:
                        "Humidity (%)",

                    data:
                        humidities
                }

            ]
        }
    });
}


document.getElementById("submit-button")
.addEventListener("click", function () {

    let temperature =
        document.getElementById("Temperature")
        .value;

    let humidity =
        document.getElementById("Humidity")
        .value;

    let weatherLog =
        document.getElementById("weather-log");

    if (temperature === "" || humidity === "") {

        document.getElementById(
            "data-recorded"
        ).style.display = "none";

        weatherLog.innerHTML =
            "<p>Please enter both temperature and humidity.</p>";

        return;
    }

    document.getElementById(
        "data-recorded"
    ).style.display = "block";

    let currentDate =
        new Date();

    let formattedDate =
        currentDate.toLocaleString();

    let weatherData = {
        temperature: temperature,
        humidity: humidity,
        date: formattedDate
    };

    // GET EXISTING HISTORY

    let weatherHistory =
        JSON.parse(
            localStorage.getItem(
                "weatherHistory"
            )
        ) || [];

    // ADD NEW ENTRY

    weatherHistory.push(weatherData);

    // SAVE UPDATED HISTORY

    localStorage.setItem(
        "weatherHistory",
        JSON.stringify(weatherHistory)
    );

    // REDRAW LOG

    renderWeatherLog();

    createChart(weatherHistory);

    // CLEAR INPUTS

    document.getElementById(
        "Temperature"
    ).value = "";

    document.getElementById(
        "Humidity"
    ).value = "";
});


// ---------- DISPLAY SAVED DATA ----------

function renderWeatherLog() {

    let weatherLog =
        document.getElementById(
            "weather-log"
        );

    let weatherHistory =
        JSON.parse(
            localStorage.getItem(
                "weatherHistory"
            )
        ) || [];

    weatherLog.innerHTML = "";

    weatherHistory.forEach(function (entry) {

        weatherLog.innerHTML += `
            <div class="weather-entry">
                <p>
                    ${entry.temperature}&deg;F |
                    ${entry.humidity}%
                </p>

                <p>
                    Recorded:
                    ${entry.date}
                </p>

                <hr>
            </div>
        `;
    });
}

// LOAD SAVED DATA ON PAGE REFRESH

renderWeatherLog();

let savedWeatherHistory =
    JSON.parse(
        localStorage.getItem(
            "weatherHistory"
        )
    ) || [];

createChart(savedWeatherHistory);