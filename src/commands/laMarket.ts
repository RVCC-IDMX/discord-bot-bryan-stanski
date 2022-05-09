import {
  Client,
  Intents,
  Message,
  MessageEmbed,
  MessageManager,
} from 'discord.js';
import { FileWatcherEventKind, getCombinedModifierFlags } from 'typescript';
import axios from 'axios';
import moment from 'moment';
import categories from '../utils/categories.json';

let region = 'North America East';

export default {
  callback: async (message: Message, ...args: string[]) => {
    console.log(args);

    let falseCount = 0;

    let marketPageInt = 0;
    if (args.length === 3) {
      const marketPage = args.pop();
      marketPageInt = parseInt(marketPage);
      console.log(marketPageInt);
    } else if (args.length > 3) {
      return;
    }

    const combinedArgs = args.join(' ');
    console.log(combinedArgs);

    const result = categories.filter(async (obj) => {
      const nameThing = obj.subcategory === combinedArgs;
      console.log(nameThing);

      if (nameThing === true) {
        const categoryIndex = obj.subcategory.indexOf(combinedArgs);
        console.log(categoryIndex);
        const categoryLocation = categories[categoryIndex];
        const mainCategory = categoryLocation.category;

        console.log(mainCategory);

        const mainCategoryWords = mainCategory.split(' ');
        for (let i = 0; i < mainCategoryWords.length; i++) {
          mainCategoryWords[i] =
            mainCategoryWords[i][0].toUpperCase() +
            mainCategoryWords[i].substr(1);
        }
        const mainCategoryCombined = mainCategoryWords.join(' ');
        console.log(mainCategoryCombined);

        const combinedArgsWords = combinedArgs.split(' ');
        for (let i = 0; i < combinedArgsWords.length; i++) {
          combinedArgsWords[i] =
            combinedArgsWords[i][0].toUpperCase() +
            combinedArgsWords[i].substr(1);
        }
        const subCatergoryCombined = combinedArgsWords.join(' ');
        console.log(subCatergoryCombined);

        const newSearch = null;
        const newUrl = `https://www.lostarkmarket.online/api/export-market-live/${region}?category=${mainCategoryCombined}&subcategory=${subCatergoryCombined}&format=json`;

        console.log(newUrl);

        let response;

        try {
          response = await axios.get(newUrl);

          console.log(response);
          let marketData = response[0];
          console.log(marketData);
        } catch (error) {
          console.error(error);
          message.reply('Unable to grab information.');
          return;
        }

        let marketData = response.data;
        console.log(marketData);

        const embededMessage = new MessageEmbed()
          .setTitle(`Current Recent Market Prices for ${subCatergoryCombined}`)
          .setColor('AQUA')
          .setDescription(
            `North America East Market Prices
            \n (will show all items in category up to the top 15 items)`
          );

        let i = 0;
        let marketArray = {};
        marketData.forEach((element) => {
          let itemName = marketData[i].name;
          console.log(itemName);
          let itemRecentPrice = marketData[i].recentPrice;
          console.log(itemRecentPrice);
          marketArray[i] = `${itemName}: ${itemRecentPrice} gold`;
          console.log(marketArray);
          i++;
        });

        console.log(marketPageInt);

        if (marketPageInt <= 1) {
          i = 1;
          marketPageInt = 1;
        } else if (marketPageInt > 1) {
          let k = 10 * (marketPageInt - 1);
          i = k + 5;
          console.log(i);
        }

        console.log(i);

        console.log(marketPageInt);
        marketData.forEach((element) => {
          if (i < 15 * marketPageInt && i < marketData.length) {
            let itemNumber = i + 1;
            embededMessage.addField(
              `Item ${itemNumber}`,
              marketArray[i],
              false
            );
            i++;
          }
        });

        if (i > marketData.length || i === marketData.length) {
          embededMessage.addField(
            `No more results for ${subCatergoryCombined}`,
            '-',
            false
          );
        }

        const filter = (reaction, user) => {
          return (
            ['👍'].includes(reaction.emoji.name) &&
            user.id === message.author.id
          );
        };

        message.reply({ embeds: [embededMessage] });
        /*  .then(function (sentMessage) {
            sentMessage
              .react('👍')
              .catch(() => console.error('emoji failed to react.'));
          }); */
      } else if (combinedArgs === 'help' && falseCount < 1) {
        message.reply(
          "A list of possible subcategories is available in this project's git repo readme <https://github.com/RVCC-IDMX/discord-bot-bryan-stanski/blob/main/README.md>"
        );
        falseCount++;
      } else if (nameThing === false && falseCount < 1) {
        message.reply(
          'Enter a valid subcategory. (Currently all combat supply subcategories are not working). For a list of possible subcategories, check out the readme @ <https://github.com/RVCC-IDMX/discord-bot-bryan-stanski/blob/main/README.md>'
        );
        falseCount++;
      }
    });
  },
};
