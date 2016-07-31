# ServerBot
A 💡Telegram Bot For Checking **Server Statistics And Information.**

[![Build Status](https://travis-ci.org/kamikazechaser/LiveCoinBot.svg?branch=master)](https://travis-ci.org/kamikazechaser/LiveCoinBot)
[![https://github.com/kamikazechaser/LiveCoinBot/blob/master/LICENSE.md](https://img.shields.io/badge/license-GNU%20GPLv3-lightgrey.svg)](https://github.com/kamikazechaser/LiveCoinBot/blob/master/LICENSE.md)
[![https://telegram.me/kamikazechaser](https://img.shields.io/badge/%F0%9F%92%AC_Telegram-kamikazechaser-blue.svg)](https://telegram.me/kamikazechaser)

## Installation

- _Ensure you have NodeJS and npm installed else visit [here](https://nodejs.org/en/download/package-manager/)_
- _Preferrable to use with tmux or screen_
- _If you have a windows server edit the bot.js file as commented on line 37_
- _Replace your token in the config.json file_

```bash
$ npm install -g gulp

$ git clone https://github.com/kamikazechaser/ServerBot.git && cd ServerBot

$ npm install

$ gulp
```

## Commands

Command | Description
--- | ---
/start | Displays general information about the bot and list of commands.
/info | Gets the general information of the server.
/disk | Displays the storage information of the server.
/ram | Displays the memory information of the server.
/load | Displays the CPU load of the server.
/ping | Initiates the speed-test (takes 12 - 20 seconds). You will be notified on start and end of speed-test. 
/results | Displays the speed-test results.
/geo | Geo-locates the server.



## License
 
    ServerBot
    Copyright (C) 2016 Mohammed Sohail <kamikazechaser.github.io>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
