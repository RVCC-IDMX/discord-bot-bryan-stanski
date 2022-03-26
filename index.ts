import DiscordJS, { DiscordAPIError, Intents } from 'discord.js';
import dotenv from 'dotenv';
import cowsay from './utils/cowsay';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content.toLocaleLowerCase() === 'ping') {
    message.react('🏓').then(console.log).catch(console.error);
    message
      .reply({
        content: 'pong',
      })
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
  }

  /* Reaction Logic left here because I am unable to bring in
     the emoji from cowsay.ts & use it in the react() method
     after attempting for a few hours. I felt time was better
     spent on the rest of the project */

  if (message.content.toLocaleLowerCase() === 'cowsay') {
    const output = cowsay();
    if (output === "```Exceeded Discord's 2000 character limit```") {
      message.react('🚫').then(console.log).catch(console.error);
    } else {
      message.react('🥦').then(console.log).catch(console.error);
    }
    message
      .reply(output)
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
  }
});

client.login(process.env.TOKEN);
