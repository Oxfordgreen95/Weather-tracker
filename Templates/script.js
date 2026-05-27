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

    weatherLog.innerHTML += `
        <p>${temperature}°F | ${humidity}%</p>
    `;

});