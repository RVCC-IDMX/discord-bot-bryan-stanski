import { Message } from 'discord.js';

export default {
  callback: (message: Message, ...args: string[]) => {
    console.log(args);
    message
      .reply('pong')
      .then(() => console.log(`Replied to message "${message.content}"`))
      .catch(console.error);
    message.react('🏓').then(console.log).catch(console.error);
  },
};
