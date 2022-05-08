import { Message } from 'discord.js';

export default {
  callback: (message: Message, ...args: string[]) => {
    let product = 0;

    product = parseInt(args[0]) * parseInt(args[1]);

    message
      .reply(`The product is ${product}`)
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
    message.react('🧮').then(console.log).catch(console.error);
  },
};
