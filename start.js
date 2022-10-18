import Express from "express";
import fs from "fs";
import * as db from "./scripts/started-modul.js"

const app = Express();


const setting = JSON.parse(fs.readFileSync('setting.json'));

db.startDB(app, setting);
