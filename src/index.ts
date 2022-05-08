import DiscordJS, { DiscordAPIError, Intents } from 'discord.js';
import dotenv from 'dotenv';
// import cowsay from './utils/cowsay';
// import emojis from './utils/emojis';
dotenv.config();

/*
  const CHANNELS = process.env.CHANNELS || null;

  if (!CHANNELS) {
    console.error('CHANNELS is not defined');
    process.exit(1);
  }

  const channels = CHANNELS.split(',');
  console.table(channels);
*/

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  let handler = require('./command-handler');
  if (handler.default) {
    handler = handler.default;
  }

  handler(client);
});

/*
  client.on('ready', () => {
    console.log('The bot is ready');
  });

  client.on('messageCreate', (message) => {
    if (!channels.includes(message.channel.id)) return;

    const PREFIX = process.env.PREFIX || 'bs!';
    const toCheck = message.content;
    const checked = toCheck.startsWith(PREFIX);

    if (checked != true) {
      return;
    }

    const args = message.content
      .toLowerCase()
      .substring(PREFIX.length)
      .slice()
      .trim()
      .split(/ /);
    const newMessage = args.shift()!;

    let params: string = args.pop() as string;

    if (newMessage === 'ping') {
      message.react('🏓').then(console.log).catch(console.error);
      message
        .reply({
          content: 'pong',
        })
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
    }

    if (newMessage === 'cowsay') {
      try {
        cowsay(params);
      } catch (error) {
        console.log(error);
        return;
      }
      const output = cowsay(params);
      const emoji = emojis(output);
      message.react(emoji).then(console.log).catch(console.error);
      message
        .reply(output)
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
    }
  });
*/

client.login(process.env.TOKEN);
