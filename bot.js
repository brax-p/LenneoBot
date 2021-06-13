let secret = 'bc5uhg3n6xuqpm8mnepharh9lu2pqn';
let oAuth = 'oauth:nqhuo11r0gtza8xrq3x678qcn02nh2';
let BOT_USERNAME = 'LenneoBot';
let channelName = 'Lenneo';

const tmi = require('tmi.js');

// Define configuration options
const opts = {
  identity: {
    username: 'LenneoBot',
    password: 'oauth:nqhuo11r0gtza8xrq3x678qcn02nh2'
  },
  channels: [
    'Lenneo'
  ]
};

// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();
let commands = [];
commands.push('!help');
commands.push('!youtube');
commands.push('!kappa')
commands.push('!whiff')


let whiff = 0;


// Called every time a message comes in
function onMessageHandler (target, context, msg, self) {
  if (self) { return; } // Ignore messages from the bot

  // Remove whitespace from chat message
  const commandUpper = msg.trim();
  const commandName = commandUpper.toLowerCase();
  

  // If the command is known, let's execute it
  if(isCommand(commandName))
  {
    let response = "";
    if(commandName === "!help")
    {
      response = help();
      client.say(target,`${response}`);
    }
    else if(commandName === "!youtube")
    {
      response = youtube();
      client.say(target,`${response}`);
    }
    else if(commandName === "!commands")
    {
      let i = 0;
      let message = "";

      for(i=0; i < commands.length;i++)
      {
        response = returnCommands(i);
        message+=response;
        message+=" | ";
      }
      client.say(target,`${message}`);
    }
    else if(commandName === "!kappa")
    {
      response = "Kappa";
      client.say(target,`${response}`);
    }
    else if(commandName === "!whiff")
    {
      response = addWhiff();
      client.say(target,`${response}`);
    }
    else
      client.say(target, `I'm sorry, I don't know that command. !commands`);
  }
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler (addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}

function help()
{
    let response = '!commands or !github';
    return response;
}

function youtube()
{
    let youtubeLink = 'https://www.youtube.com/channel/UCmDjYnmcO4eW7zB-hlJ_meg';
    return youtubeLink;
}

function returnCommands(i)
{
  let response = commands[i];
  return response;
}

function isCommand(message)
{
  if(message[0] === '!')
    return true;
  else 
    return false;
}

function addWhiff()
{
  whiff++;
  let message = "Lenneo has now whiff'd " + whiff + " times\n" ;
  return message;
}
