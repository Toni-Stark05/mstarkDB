import fs from 'fs';
import * as uuid from 'uuid';

async function crStructure(structure_json){
    try{
        fs.writeFileSync('./data/_structure.json', structure_json, (err) => {
            if (err) throw err;
        });
    } catch(err){
        console.error(err);
    };
};


export async function addCatalog(name){
    try{
        const structure = JSON.parse(
            fs.readFileSync('./data/_structure.json', "utf-8", (err) => {
                if(err) throw err; 
        }));
    
        for (let index = 0; index < structure.Catalogs.length; index++) {
            let element = structure.Catalogs[index];
            if(name == element) return {status: 'ERROR', discription: 'A directory with this name already exists'};
        }
        let id = uuid.v4();
        let obj = `{"id":"${id}", "objects": []}`;
        structure.Catalogs.push(name);
        fs.writeFileSync('./data/_structure.json', `${JSON.stringify(structure)}`, (err) => {
            if(err) throw err;
        })
        fs.writeFileSync(`./data/${name}.json`, obj, (err) => {
            if(err) throw err;
        })
        return {status: "OK"};
    } catch(err){
        console.error(err);
    };
};

export async function removeCatalog(name){
    try{
        if(!fs.existsSync(`./data/${name}.json`)) return {status: 'ERROR', discription: 'A directory with this name was not found'};
        
        const structure = JSON.parse(
            fs.readFileSync('./data/_structure.json', "utf-8", (err) => {
                if(err) throw err; 
        }));
        
        for (let index = 0; index < structure.Catalogs.length; index++) {
            let element = structure.Catalogs[index];
            if(name == element){
                structure.Catalogs.splice(index, 1);
                break;
            }; 

        };

        fs.writeFileSync('./data/_structure.json', `${JSON.stringify(structure)}`, (err) => {
            if(err) throw err;
        })
        fs.unlink(`./data/${name}.json`, (err) => {
            if(err) throw err;
        })
        return {status: "OK"};
    } catch(err){
        console.error(err);
    };
};

export async function addObj(catalog, obj){
    try{
        if(!fs.existsSync(`./data/${catalog}.json`)) return {status: 'ERROR', discription: 'catalog not found'};
        const ctl = JSON.parse(
            fs.readFileSync(`./data/${catalog}.json`, "utf-8", (err) => {
                if(err) throw err; 
        }));

        ctl.objects.push(obj);

        fs.writeFileSync(`./data/${catalog}.json`, `${JSON.stringify(ctl)}`, (err) => {
            if(err) throw err;
        });

        return {status: '200'};
    } catch(err){
        console.error(err);
    };
};

export async function catalogsLs(){
    try{
        let files = [];
        fs.readdirSync('./data/').forEach(file => {
            if(file != '_structure.json') files.push(file);
        });
    return files;
    }catch(err){
        console.error(err);
    };
};

export async function searchObjKeys(catalog, keys){
    try{

    }catch(err){
        console.error(err);
    };

    if(!fs.existsSync(`./data/${catalog}.json`)) return {status: 'ERROR', discription: 'catalog not found'};
    const ctl = JSON.parse(
        fs.readFileSync(`./data/${catalog}.json`, "utf-8", (err) => {
            if(err) throw err; 
    }));
    let response = [];
    for(let i = 0; i < ctl.objects.length; i++){
        if(ctl.objects[i][keys] != undefined) response.push(ctl.objects[i]);
    }
    if(response[0] == undefined) return {status: 'ERROR', discription: 'keys not found'};

    return response;
};

export async function searchObjVelue(catalog, keys, value){
    try{

    }catch(err){
        console.error(err);
    };

    if(!fs.existsSync(`./data/${catalog}.json`)) return {status: 'ERROR', discription: 'catalog not found'};
    const ctl = JSON.parse(
        fs.readFileSync(`./data/${catalog}.json`, "utf-8", (err) => {
            if(err) throw err; 
    }));
    let response = [];
    for(let i = 0; i < ctl.objects.length; i++){
        if(ctl.objects[i][keys] == value) response.push(ctl.objects[i]);
    }
    if(response[0] == undefined) return {status: '204', discription: 'No Content'};

    return response;
};

export async function fileSystem(db_name){
    try {
        let structure_json = `{"name": "${db_name}", "Catalogs": []}`;
        if (fs.existsSync('./data')) {
            if(fs.existsSync('./data/_structure.json')){
            }
            else{
                
                crStructure(structure_json);
            };
        } 
        else {
            fs.mkdir('data', err => {
                if(err) throw err; 
            });
            await crStructure(structure_json);
        };

        console.log('The file system is ready to work');
        console.log('OK');
    } 
    catch(err) {
        console.error(err);
    };
};