import Express from "express";
import * as db from "./scripts/started-modul.js"

const app = Express();

db.startDB(app);
