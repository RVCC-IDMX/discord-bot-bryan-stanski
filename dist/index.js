"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = tslib_1.__importStar(require("discord.js"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const cowsay_1 = tslib_1.__importDefault(require("./utils/cowsay"));
const emojis_1 = tslib_1.__importDefault(require("./utils/emojis"));
dotenv_1.default.config();
const CHANNELS = process.env.CHANNELS || null;
if (!CHANNELS) {
    console.error('CHANNELS is not defined');
    process.exit(1);
}
const channels = CHANNELS.split(',');
console.table(channels);
const client = new discord_js_1.default.Client({
    intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
});
client.on('ready', () => {
    console.log('The bot is ready');
});
client.on('messageCreate', (message) => {
    if (!channels.includes(message.channel.id))
        return;
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
    const newMessage = args.shift();
    let params = args.pop();
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
            (0, cowsay_1.default)(params);
        }
        catch (error) {
            console.log(error);
            return;
        }
        const output = (0, cowsay_1.default)(params);
        const emoji = (0, emojis_1.default)(output);
        message.react(emoji).then(console.log).catch(console.error);
        message
            .reply(output)
            .then(() => console.log(`Replied to message "${message.content}"`))
            .catch(console.error);
    }
});
client.login(process.env.TOKEN);
