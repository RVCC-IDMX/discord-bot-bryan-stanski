import * as cowsay from 'cowsay';
import { IOptions } from 'cowsay';
import getRandomInt from '../utils/random';
import quotes from '../utils/quotes.json';
import { Message, MessageEmbed } from 'discord.js';
import { OutputFileType } from 'typescript';

export default {
  callback: (message: Message, file: string) => {
    const randomInt = getRandomInt(0, 100);
    const quoteLocation = quotes[randomInt];
    const quoteMessage = quoteLocation.quote;
    const quoteAuthor = quoteLocation.author;

    let opts: IOptions = {
      text: `${quoteMessage} - ${quoteAuthor}`,
    };

    if (file) {
      opts.f = file;
      opts.r = false;
    } else {
      opts.r = true;
    }

    let output: string = '';
    try {
      output = cowsay.say(opts);
      output = output.replace(/```/g, "'''");
    } catch (error) {
      console.log(error);
      let output: string;
      output = 'Cowbarn does not exist';
      message
        .reply(output)
        .then(() => console.log(`Replied to message "${message.content}"`))
        .catch(console.error);
      message.react('🚫').then(console.log).catch(console.error);
      return;
    }
    if (output.length > 4090) {
      output = output.substring(0, 4090);
    }
    const embededMessage = new MessageEmbed()
      .setColor('AQUA')
      .setTitle('Cowbarn')
      .setAuthor('Bryan Stanski')
      .setDescription(`\`\`\`${output}\`\`\``)
      .setTimestamp();

    console.log(embededMessage);
    message.channel.send({ embeds: [embededMessage] });
  },
};
