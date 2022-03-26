import DiscordJS, { Intents } from 'discord.js';
import dotenv from 'dotenv';
import * as cowsay from 'cowsay';
dotenv.config();

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', () => {
  console.log('The bot is ready');
});

client.on('messageCreate', (message) => {
  if (message.content === 'ping') {
    message.reply({
      content: 'pong',
    });
  }
  if (message.content === 'cowsay') {
    let output: string = cowsay.say({ text: "I don't know my fruits" });
    console.log(output);
    message.reply({
      content: `\`\`\`${cowsay.say({ text: "I don't know my fruits" })}\`\`\``,
    });
  }
});

client.login(process.env.TOKEN);
