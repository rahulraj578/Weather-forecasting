const API_KEY ='aa4235fef5f3bec41f4c3a995ee4e35d';

const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
'Oct', 'Nov', 'Dec'];

setInterval(() => {
const time = new Date();
const month = time.getMonth();
const date = time.getDate();
const day = time.getDay();
const hour = time.getHours();
const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
const minutes = time.getMinutes();
const ampm = hour >=12 ? 'PM' : 'AM'
timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat :
hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span
id="am-pm">${ampm}</span>`
dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]
}, 1000);
getWeatherData()
function getWeatherData () {
navigator.geolocation.getCurrentPosition((success) => {
console.log(success);
let {latitude, longitude } = success.coords;
console.log(latitude,longitude)
// fetch('https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aa4235fef5f3bec41f4c3a995ee4e35d`)
// .then(res => res.json()).then(data => {
// console.log(data)
// showWeatherData(data);
// })
fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=aa4235fef5f3bec41f4c3a995ee4e35d`)
.then(res => res.json()).then(data => {
console.log("*****",data)
showWeatherData(data);
}).catch(err=>console.log(err))

})
}

function showWeatherData (data){
let {speed} = data.list[0].wind;
console.log(speed);
let {humidity,temp}=data.list[0].main;
let{country}=data.city;
let{name}=data.city;
timezone.innerHTML = data.city.name;
countryEl.innerHTML = data.city.coord.lat + 'N ' + data.city.coord.lon+'E'
currentWeatherItemsEl.innerHTML =
`<div class="weather-item">
<div>Temperature</div>
<div>${((temp-273.15).toFixed(1))+' &#176;C'}</div>
</div>
<div class="weather-item">
<div>Humidity</div>
<div>${humidity}%</div>
</div>
<div class="weather-item">
<div>Wind-Speed</div>
<div>${speed}</div>
</div>
</div>
`;

let otherDayForcast = ''
// console.log(data.list);
const abc=data.list.slice(0,61);
console.log(abc);
let i=0;
abc.forEach((day, idx) => {
console.log(day);
console.log(idx);
if(idx==3 || (idx-3)%8==0){
otherDayForcast += `
<div class="weather-forecast-item">
<div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
<img

src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather
icon" class="w-icon">

<div class="other">
<div class="weather-item">
<div>Temperature</div>
<div>${((day.main.temp)-273.15).toFixed(1)+' &#176;C'}</div>
</div>
<div class="weather-item">
<div>Humidity</div>
<div>${day.main.humidity}%</div >
</div>
<div class="weather-item">
<div>Wind-speed</div>
<div>${day.wind.speed}</div>
</div>
</div>
</div>
`
}
})

weatherForecastEl.innerHTML = otherDayForcast;
}