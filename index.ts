import DiscordJS, { DiscordAPIError, Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';
import emojis from './utils/emojis';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
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

  if (newMessage.toLocaleLowerCase() === 'ping') {
    message.react('🏓').then(console.log).catch(console.error);
    message
      .reply({
        content: 'pong',
      })
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
  }

  if (newMessage.toLocaleLowerCase() === 'cowsay') {
    const output = cowsay();
    const emoji = emojis(output);
    message.react(emoji).then(console.log).catch(console.error);
    message
      .reply(output)
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);
