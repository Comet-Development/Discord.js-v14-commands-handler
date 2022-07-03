const client = require('../..')
const chalk = require('chalk')
const mongoose = require('mongoose')

client.on("ready", () => {
	const activities = [
		{ name: `${client.guilds.cache.size} Servers`, type: 2 }, // LISTENING
		{ name: `${client.channels.cache.size} Channels`, type: 0 }, // PLAYING
		{ name: `${client.users.cache.size} Users`, type: 3 }, // WATCHING
		{ name: `Discord.js v14`, type: 5 } // COMPETING
	];
	const status = [
		'online',
		'dnd',
		'idle'
	];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0
		client.user.setActivity(activities[i])
		i++;
	}, 5000);

	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0
		client.user.setStatus(status[s])
		s++;
	}, 30000);
	const Database = process.env.MONGO_DB

	if(Database) {
          mongoose.connect(Database, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          }).then(() => {
               console.log(chalk.cyan("Mongo Database • Connected"))
          }).catch((err) => {
               console.log(err)
          });
		}

	console.log(chalk.cyan(`Client Status  • Online`))
});
