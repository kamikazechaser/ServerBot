// Node Modules

const nodeogram = require('nodeogram'),
      os        = require('os'),
      ip        = require("ip"),
      pos       = require('os-utils'),
      moment    = require("moment"),
      disk      = require('diskusage'),
      fs        = require('fs'),
      exec      = require('child_process').exec,

// Local Configs
      
      results   = require('./netstat.json'),
      token     = 'token',
      sudo      = 0                                  // Replace with your ID

const bot = new nodeogram.Bot(token);

bot.init();

bot.command('bash', 'Execute A Command. Usage /bash [cmd]', false, (args, message) => {
    if (message.from.id === sudo) {
        exec(args.join(" "), function (error, stdout, stderr) {
            var resp = ''
            if (error !== null) {
                resp = stderr
            } else {
                resp = stdout
            }
            bot.sendMessage(message.from.id, `<code>${resp}</code>`, {
                parse_mode: 'HTML'
            })
        });
    } else {
        message.reply(`Permission Denied!`)
    }
});

bot.command('ping', 'Execute Speed-Test', false, (args, message) => {
    if (message.from.id === sudo) {
        message.from.sendMessage(`<code>Speed Test Started!</code>`, {
            parse_mode: 'HTML'
        })
        require('speedtest-net')().on('data', function (data) {
            fs.writeFile('netstat.json', JSON.stringify(data));
            console.log('Speed Test Results Saved!');
            message.from.sendMessage(`<code>Speed Test Results Saved!</code>`, {
                parse_mode: 'HTML'
            })
        });
    } else {
        message.reply(`Permission Denied!`)
    }
});

bot.command('info', 'General Server Information', false, (args, message) => {
    if (message.from.id === sudo) {
        message.reply(`<i>General Information</i>\n\n<b>OS: </b><code>${os.type()} ${os.arch()}</code>\n<b>IP Address: </b><code>${ip.address()}</code>\n<b>Uptime: </b><code>${moment.duration(process.uptime(), "seconds").humanize()}</code>\n<b>User: </b><code>${process.env.USER}</code>\n<b>CPU Model: </b><code>${os.cpus()[0].model}</code>\n<b>Number Of Cores: </b><code>${os.cpus().length}</code>\n<b>Current CPU Speed: </b><code>${os.cpus()[0].speed} MHz</code>\n<b>Total RAM: </b><code>${pos.totalmem()} MB</code>`, {
            parse_mode: 'HTML'
        });
    } else {
        message.reply(`Permission Denied!`)
    }
});

bot.command('start', 'General Server Information', true, (args, message) => {
    if (message.from.id === sudo) {
        message.reply(`<b>Hi</b> <code>${message.from.name}</code>. <b>I am a bot which displays all relevant information regarding your server. Ensure You Run </b>/ping<b> On First Start To Overwrite Previous Speed-Test Values. Below are the commands which you can use:</b>\n\n/info - <code>Gets The General Information Of The Server.</code>\n/disk - <code>Displays The Storage Information Of The Server.</code>\n/ram - <code>Displays The Memory Information Of The Server.</code>\n/load - <code>Displays The CPU Load Of The Server.</code>\n/ping - <code>Initiates The Speed-Test (Takes 12 - 20 Seconds).</code>\n/results - <code>Displays The Speed-Test Results.</code>\n/geo - <code>Geo-Locates The Server</code>\n\n<b>Bot Developed By:</b> @kamikazechaser\n<b>Released Under: </b><code>GNU GPL v3</code>`, {
            parse_mode: 'HTML'
        })
    } else {
        message.reply(`Permission Denied!`)
    }
});

disk.check('/', function (err, info) { // use "/" for UNIX systems and "c:" for Windows Systems!
    bot.command('disk', 'Disk Statistics', false, (args, message) => {
    if (message.from.id === sudo) {
        message.reply(`<b>Free Space:</b> <code>${Math.floor((info.free) / 1048576)} MB  ${Math.floor((info.free / info.total) * 100)}% free</code>\n<b>Used Space:</b> <code>${Math.floor((info.total - info.free ) / 1048576)} MB ${Math.floor(((info.total - info.free) / info.total) * 100)}% used</code>`, {
            parse_mode: 'HTML'
        });
    } else {
    message.reply(`Permission Denied!`)              
    }          
    });
});

bot.command('results', 'Speed Test Results', false, (args, message) => {
    if (message.from.id === sudo) {
        message.reply(`<b>Download Speed:</b> <code>${results.speeds.download} MBps</code>\n<b>Upload Speed:</b> <code>${results.speeds.upload} MBps</code>\n<b>Ping:</b> <code>${results.server.ping} ms</code>\n<b>IP:</b> <code>${results.client.ip}</code>\n<b>ISP:</b> <code>${results.client.isp}</code>\n<b>ISP Rating:</b> <code>${results.client.isprating}/5</code>\n<b>ISP Download Speed Average:</b> <code>${results.client.ispdlavg} MBps</code>\n<b>ISP Upload Speed Average:</b> <code>${results.client.ispulavg} MBps</code>\n<b>Test Provider:</b> <code>${results.server.sponsor} (${results.server.country}, ${results.server.location})</code>\n`, {
            parse_mode: 'HTML'
        });
    } else {
        message.reply(`Permission Denied!`)
    }
});

bot.command('geo', 'Geo-Location', false, (args, message) => {
    if (message.from.id === sudo) {
        message.chat.sendLocation(results.client.lon, results.client.lat, {})
    } else {
        message.reply(`Permission Denied!`)
    }
});

bot.command('load', 'Get Current Load Stats', false, (args, message) => {
    if (message.from.id === sudo) {
        message.reply(`<i>The Load Should Remain Below 1.0, Otherwise the CPU Will Be Stressed</i>\n\n<b>Last 1 Minute: </b><code>${pos.loadavg(1).toFixed(2)}</code>\n<b>Last 5 Minutes: </b><code>${pos.loadavg(5).toFixed(2)}</code>\n<b>Last 15 Minutes: </b><code>${pos.loadavg(15).toFixed(2)}</code>`, {
            parse_mode: 'HTML'
        });
    } else {
        message.reply(`Permission Denied!`)
    }
});

bot.command('ram', 'Get Current RAM Stats', false, (args, message) => {
    if (message.from.id === sudo) {
        message.reply(`<b>Current Used RAM: </b><code>${parseInt(pos.totalmem())-Math.floor(pos.freemem())} MB (${Math.floor(100 - ((pos.freememPercentage()) * 100))} % used)</code>\n<b>Current Free RAM: </b><code>${Math.floor(pos.freemem())} MB (${Math.floor((pos.freememPercentage()) * 100)} % free)</code>`, {
            parse_mode: 'HTML'
        });
    } else {
        message.reply(`Permission Denied!`)
    }
});
