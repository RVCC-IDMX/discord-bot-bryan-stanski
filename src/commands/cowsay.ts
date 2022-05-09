import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
import { Message, MessageEmbed } from 'discord.js';

/*
export default function (params: string) {
  let random = false;
  let animal = 'whale';
  if (params === 'true' || params === 'false') {
    random = params === 'true';
  } else {
    animal = params;
  }
}
*/

export default {
  callback: (message: Message, file: string, ...args: string[]) => {
    const randomInt = getRandomInt(0, 100);
    const quoteLocation = quotes[randomInt];
    const quoteMessage = quoteLocation.quote;
    const quoteAuthor = quoteLocation.author;

    let random = false;
    let animal = 'whale';

    let opts: IOptions = {
      text: `${quoteMessage} - ${quoteAuthor}`,
      e: '00', // Changes eyes
      T: 'U', // Changes tongue
      f: animal, // Changes "cow" to a different "cow". For example, if set to C3PO the cow will become C3PO
      r: random, // Randomizes "cow"
      y: false, // Changes "cow" to look young/somewhat simple
    };

    if (file) {
      opts.f = file;
      opts.r = false;
    } else {
      opts.r = true;
    }

    try {
      let output: string = cowsay.say(opts);

      output = output.replace(/```/g, "'''");
      if (output.length > 1996) {
        output = "Exceeded Discord's 2000 character limit";
        message
          .reply(output)
          .then(() => console.log(`Replied to message "${message.content}"`))
          .catch(console.error);
        message.react('🚫').then(console.log).catch(console.error);
        return;
      }
      message
        .reply(`\`\`\`${output}\`\`\``)
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
      message.react('🐄').then(console.log).catch(console.error);
    } catch (error) {
      console.log(error);
      let output: string;
      output = 'Cowsay does not exist';
      message
        .reply(output)
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
      message.react('🚫').then(console.log).catch(console.error);
    }
  },
};
