const test = require('./1-0-0.js')
const message = require('../catchEvent/scriptUtils/1-0-0/sendMessage.js')
const build = require('../catchEvent/scriptUtils/1-0-0/messageCreator.js')

//test.manage1_0_0('RMRK::LIST::1.0.0::10081238-7e982817a2d2575031-MAGK1-01_BABY_KUSAMA-0000000000000001::245000000000')
let mess = build.buildMessage('RMRK::LIST::1.0.0::10081238-7e982817a2d2575031-MAGK1-01_BABY_KUSAMA-0000000000000001::245000000000')
message.sendPhoto("1238654632", mess,mess.print() )