/*
    main.ts
*/

import Express from 'express'
import fs from 'fs'
import { database } from './msdbAPI.js'
import { settingDB } from './interface.js'

const app = Express()
const setting: settingDB = JSON.parse(
  fs.readFileSync('setting.json').toString()
)

database(app, setting)
