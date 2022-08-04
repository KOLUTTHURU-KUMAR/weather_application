const api = {
   key: "3e24d9dd9c603e3d004d0e60f6ad4238",
   base: "https://api.openweathermap.org/data/2.5/",
}

const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt){
   if(evt.keyCode == 13){
       getResults(searchBox.value);
   }
}

function getResults(query){
   fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
   .then(weather =>{return weather.json();})
   .then(displayResults);
}

function displayResults(weather){
   console.log(weather);
   let city = document.querySelector('.location .city');
   city.innerText = `${weather.name}, ${weather.sys.country}`;

   let now = new Date();
   let date = document.querySelector('.location .date');
   date.innerText = dateBuilder(now);

   let temp = document.querySelector('.current .temp');
   temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

   let weather_el = document.querySelector('.current .weather');
   weather_el.innerText = weather.weather[0].main;

   let hilow = document.querySelector('.max-min');
   hilow.innerText = `${Math.floor(weather.main.temp_min)}°c to ${Math.floor(weather.main.temp_max) + 1}°c`
}

function dateBuilder(d){
   let months = ["Januaury", "February", "March", "April",
                   "May", "June", "July", "August",
                   "September", "October", "November", "December"    
               ];
   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
               "Friday", "Saturday"
               ];
   let day = days[d.getDay()];
   let date = d.getDate();
   let month = months[d.getMonth()];
   let yr = d.getFullYear();

   return `${day} ${date} ${month} ${yr}`;
   
}