import bp from 'body-parser';
import { fileSystem } from "./file-system.js";

export function startDB(app, setting){
    try{
        let PORT = setting.PORT;

        app.use(bp.json());
        app.use(bp.urlencoded({ extended: true }));
        app.listen(PORT);
        console.log(`DB work from http://localhost:${PORT}`);
        fileSystem();

        app.get('/', (req, res) =>{
            res.send(`Data base --- ${setting.name} <br> DB work from http://localhost:${PORT}`);
        })
    
        app.get('/setting', (req, res) => {
            let settingJSON = JSON.stringify({name: "My DB", port: PORT});
            res.send(settingJSON);
        })
    } catch(err){
        console.log('Error: ',err);
    }
 

}