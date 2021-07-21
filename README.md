# Weather_api
## _Get the weather forecast for any city_

A NodeJs simple api to know location and forecast.

## Features

- Get your city location
- Get your or any city  weather forecast.

## How to use it

| Endpoints | Return |
| ------ | ------ |
| /v1/location | returns your city location data |
| /v1/current[/city] | returns your city coordinates and actual weahter or any other given city  |
| /v1/forecast[/city]  | returns your city coordinates or any other given city and 5 day weather forecast |

You can see how it works in [Heroku](https://weatherlocatiolforecast.herokuapp.com/v1/location)

## Tech

Weather_api use data from [Open Weather Map](https://openweathermap.org/api)
you need to register, get your own key and set it in src/config.js, and [ip-api]
(https://ip-api.com/)

## License

MIT

**Free Software, Hell Yeah!**
