const { Client, GatewayIntentBits } = require("discord.js");
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: "openai_key",
});
const openai = new OpenAIApi(configuration);

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.on("ready", () => {
  console.log(`Logged in ${client.user.tag}`);
});

client.on("messageCreate", async (msg) => {
  if (msg.author.bot) return
  if (msg.content.startsWith("/generate")) {
    const prompt = msg.content.split(" ").slice(1).join(" ");
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });
    const imageUrl = response.data.data[0].url;
    msg.reply(imageUrl);
  } else {
    msg.reply(`Start the message like /generate ${msg.content}`);
  }
})

client.login("token")
