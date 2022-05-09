import { Message, MessageEmbed } from 'discord.js';
import { FileWatcherEventKind } from 'typescript';
import axios from 'axios';
import moment from 'moment';

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// `https://api.openweathermap.org/data/2.5/weather?q=San Francisco&appid=${process.env.WEATHERAPIKEY}`

const apiKey = process.env.WEATHERAPIKEY;
let city = 'San Francisco';

export default {
  callback: async (message: Message, ...args: string[]) => {
    console.log(args);

    const location = args.join(' ');

    if (!location) {
      message
        .reply('Enter a valid city name.')
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
      message.react('🚫').then(console.log).catch(console.error);
      return;
    }
    let newCity = city.replace(city, location);

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${newCity}&appid=${apiKey}`;

    let response;
    try {
      response = await axios.get(url);
    } catch (error) {
      console.error(error);
      message.reply('Unable to grab information.');
      return;
    }
    let cityData = response.data;
    console.log(cityData);

    let temp = cityData.main.temp;
    temp = (1.8 * (temp - 273) + 32).toFixed(0);
    let high = cityData.main.temp_max;
    high = (1.8 * (high - 273) + 32).toFixed(0);
    let low = cityData.main.temp_min;
    low = (1.8 * (low - 273) + 32).toFixed(0);

    const tz = cityData.timezone;
    let sunrise = cityData.sys.sunrise;
    sunrise = moment
      .unix(sunrise + tz)
      .utc()
      .format('h:mm a');
    let sunset = cityData.sys.sunset;
    sunset = moment
      .unix(sunset + tz)
      .utc()
      .format('h:mm a');

    const embededMessage = new MessageEmbed()
      .setTitle(`${cityData.name}, ${cityData.sys.country}`)
      .setColor('AQUA')
      .setThumbnail(
        ` http://openweathermap.org/img/wn/${cityData.weather[0].icon}@2x.png`
      )
      .setDescription(`${temp}°F and ${cityData.weather[0].description}`)
      .addField('High', `${high}°F`, true)
      .addField('Low', `${low}°F`, true)
      .addField('\u200B', '\u200B', false)
      .addField('Sunrise', `${sunrise}`, true)
      .addField('Sunset', `${sunset}`, true);

    message.reply({ embeds: [embededMessage] });
  },
};
