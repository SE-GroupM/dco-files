// Dynamic variables for location
const locationName = "Phuket"; // Change this variable to any city
document.getElementById("location-name").textContent = locationName;

// HTML elements for temperature and description
const temperatureElement = document.getElementById("temperature");
const descriptionElement = document.getElementById("description");

// Weather API URL
const weatherUrl = `https://wttr.in/${locationName}?format=%t|%C`; // %t for temperature, %C for condition

// Fetch the temperature and description, then update the text overlay
fetch(weatherUrl)
  .then(response => response.text())
  .then(data => {
    const [temp, description] = data.split("|"); // Split the response into temperature and description
    temperatureElement.textContent = temp.trim(); // Update temperature
    descriptionElement.textContent = description.trim(); // Update description
  })
  .catch(error => {
    console.error("Error fetching weather data:", error);
    temperatureElement.textContent = "N/A";
    descriptionElement.textContent = "Unavailable";
  });



// function to test if the city works or not
  async function checkCity(city) {
    const url = `https://wttr.in/${city}?format=%C`;
    try {
      const response = await fetch(url);
      const text = await response.text();
      if (text.includes("Unknown location")) {
        console.log(`${city} is not recognized.`);
      } else {
        console.log(`${city} is valid: Weather Condition - ${text}`)
        console.log(text)
      }
    } catch (error) {
      console.error("Error checking city:", error);
    }
  }
  
  checkCity("Stockholm"); // Replace with your desired city name