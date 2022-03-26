import DiscordJS, { DiscordAPIError, Intents } from 'discord.js';
import dotenv from 'dotenv';
import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
dotenv.config();

let opts: IOptions = {
  text: "I don't know my fruits",
  e: '00', // Changes eyes
  T: 'U', // Changes tongue
  f: 'lamb2', // Changes "cow" to a different "cow". For example, if set to C3PO the cow will become C3PO
  r: true, // Randomizes "cow"
  y: false, // Changes "cow" to look young/somewhat simple
};

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
  if (message.content.toLocaleLowerCase() === 'cowsay') {
    let output: string = cowsay.say(opts);
    output = output.replace(/```/g, "'''");
    console.log(output);
    if (output.length > 1996) {
      message.react('🚫').then(console.log).catch(console.error);
      message
        .reply({ content: "Exceeded Discord's 2000 character limit" })
        .then(() =>
          console.log(
            `Replied to message "${message.content}" with error message`
          )
        )
        .catch(console.error);
    } else {
      message.react('🥦').then(console.log).catch(console.error);
      message
        .reply({
          content: `\`\`\`${output}\`\`\``,
        })
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
    }
  }
});

client.login(process.env.TOKEN);
