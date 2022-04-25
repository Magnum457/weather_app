const apikey = '3265874a2c77ae4a04bb96236a642d2f';
const url = (location) => `
  https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}
`;

const mainEl = document.getElementById('main');
const formEl = document.getElementById('form');
const searchEl = document.getElementById('search');

async function getWeatherByLocation(location) {
  const response = await fetch(url(location));
  const responseData = await response.json();

  console.log(responseData, KelvinToCelsius(responseData.main.temp));

  addWeatherToPage(responseData);
}

function addWeatherToPage(data) {
  const temp = KelvinToCelsius(data.main.temp);
  const city = data.name;

  const weatherEl = document.createElement('div');
  weatherEl.classList.add('weather');

  weatherEl.innerHTML = `
    <h2>
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
      ${temp}°C
      <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" />
    </h2>
    <small>${data.weather[0].main}</small>
  `;

  main.innerHTML = '';

  mainEl.appendChild(weatherEl);
}

function KelvinToCelsius(Kelvin) {
  return (Kelvin - 273.15).toFixed(2);
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = searchEl.value;

  if (location) {
    getWeatherByLocation(location);
  }
});