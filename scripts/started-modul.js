import bp from 'body-parser';
import { response } from 'express';
import { fileSystem, addCatalog } from './file-system.js';

export function startDB(app, setting){
    try{
        let PORT = setting.PORT;
        let NAME = setting.name;
        app.use(bp.json());
        app.use(bp.urlencoded({ extended: true }));
        app.listen(PORT);
        console.log(`DB work from http://localhost:${PORT}`);
        fileSystem(setting.name);

        app.get('/', (req, res) =>{
            res.send(`Data base --- ${setting.name} <br> DB work from http://localhost:${PORT}`);
        })
    
        app.get('/setting', (req, res) => {
            let settingJSON = JSON.stringify({name: NAME, port: PORT});
            res.send(settingJSON);
        })

        app.post('/add-catalog', (req, res) =>{
            let name = req.body.name
            
            addCatalog(name).then(response =>{
                res.send(response);
            })
        })

    } catch(err){
        console.log('Error: ',err);
    }
 

}