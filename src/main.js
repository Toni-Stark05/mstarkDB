/*
    main.ts
*/
import Express from 'express';
import fs from 'fs';
import { database } from './msdbAPI.js';
const app = Express();
const setting = JSON.parse(fs.readFileSync('setting.json').toString());
database(app, setting);
//# sourceMappingURL=main.js.map