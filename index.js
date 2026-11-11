
const {
  Client,
  GatewayIntentBits,
  Events,
  SlashCommandBuilder,
  REST,
  Routes
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

const respostasFnaf = [
  {
    palavras: ["freddy"],
    resposta: "Freddy Fazbear é o mascote principal da franquia FNAF! 🐻"
  },
  {
    palavras: ["bonnie"],
    resposta: "Bonnie é o coelho animatrônico roxo de FNAF 1! 🐰"
  },
  {
    palavras: ["chica"],
    resposta: "Chica é a galinha animatrônica que aparece em FNAF 1! 🐤"
  },
  {
    palavras: ["foxy"],
    resposta: "Foxy é o pirata animatrônico da Pirate Cove! 🦊"
  },
  {
    palavras: ["golden freddy"],
    resposta: "Golden Freddy é um dos personagens mais misteriosos de FNAF! 👻"
  },
  {
    palavras: ["springtrap"],
    resposta: "Springtrap aparece em FNAF 3 e tem uma ligação importante com William Afton! 🐰"
  },
  {
    palavras: ["afton", "william"],
    resposta: "William Afton é um dos principais antagonistas da história de FNAF."
  },
  {
    palavras: ["fnaf 1"],
    resposta: "FNAF 1 foi lançado em 2014. Você precisa sobreviver cinco noites na pizzaria!"
  },
  {
    palavras: ["fnaf 2"],
    resposta: "FNAF 2 apresenta novos animatrônicos e não possui portas de segurança!"
  },
  {
    palavras: ["fnaf 3"],
    resposta: "FNAF 3 acontece em uma atração de terror chamada Fazbear's Fright!"
  },
  {
    palavras: ["fnaf 4"],
    resposta: "FNAF 4 apresenta pesadelos assustadores com versões Nightmare dos animatrônicos!"
  }
];

const palavrasProibidas = [
  "palavra_inadequada_exemplo"
];

client.once(Events.ClientReady, () => {
  console.log(`🐻 ${client.user.tag} está online!`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.author.bot) return;

  const texto = message.content.toLowerCase();

  if (palavrasProibidas.some(p => texto.includes(p))) {
    try {
      await message.delete();
      await message.channel.send(
        `${message.author}, mantenha o respeito no servidor!`
      );
    } catch (error) {
      console.log("Não consegui moderar esta mensagem.");
    }
    return;
  }

  const perguntaFnaf = respostasFnaf.find(item =>
    item.palavras.some(p => texto.includes(p))
  );

  if (perguntaFnaf) {
    await message.reply(perguntaFnaf.resposta);
    return;
  }

  if (
    texto.includes("fnaf") ||
    texto.includes("freddy") ||
    texto.includes("animatronic")
  ) {
    await message.reply(
      "🐻 Pergunte algo sobre os personagens, jogos ou histórias de FNAF!"
    );
    return;
  }

  await message.reply("Eu só respondo coisas de FNAF! 🐻");
});

client.login(process.env.DISCORD_TOKEN);
