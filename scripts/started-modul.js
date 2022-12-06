import bp from 'body-parser';
import * as fsystem from './file-system.js';

export function startDB(app, setting){
    try{
        let PORT = setting.PORT;
        let NAME = setting.name;
        app.use(bp.json());
        app.use(bp.urlencoded({ extended: true }));
        app.listen(PORT);
        console.log(`DB work from http://localhost:${PORT}`);
        fsystem.fileSystem(setting.name);

        app.get('/', (req, res) =>{
            res.send(`Data base --- ${setting.name} <br> DB work from http://localhost:${PORT}`);
        });
    
        app.get('/setting', (req, res) =>{
            let settingJSON = JSON.stringify({name: NAME, port: PORT});
            res.send(settingJSON);
        });

        app.get('/catalog-ls', (req, res) =>{
            fsystem.catalogsLs().then(response => {
                res.send(response);
            });
        });

        app.post('/add-catalog', (req, res) =>{
            let name = req.body.name;
            fsystem.addCatalog(name).then(response =>{
                res.send(response);
            });
        });

        app.post('/remove-catalog', (req, res) =>{
            let name = req.body.name;
            fsystem.removeCatalog(name).then(response =>{
                res.send(response);
            });
        });

        app.post('/add-obj', (req, res) =>{
            let catalog = req.body.catalog;
            let obj = req.body.obj;
            fsystem.addObj(catalog, obj).then(response =>{
                res.send(response);
            });
        });

        app.post('/search-obj-keys', (req, res) =>{
            let catalog = req.body.catalog;
            let keys = req.body.keys;
            fsystem.searchObjKeys(catalog, keys).then(response =>{
                res.send(response);
            });
        });

        app.post('/search-obj-keys-and-value', (req, res) =>{
            let catalog = req.body.catalog;
            let keys = req.body.keys;
            let value = req.body.value;
            fsystem.searchObjVelue(catalog, keys, value).then(response =>{
                res.send(response);
            });
        });

        app.post('/remove-obj', (req, res) =>{
            let catalog = req.body.catalog;
            let obj = req.body.obj;
            fsystem.removeObj(catalog, obj).then(response =>{
                res.send(response);
            });
        });

    } catch(err){
        console.error(err);
    };
};