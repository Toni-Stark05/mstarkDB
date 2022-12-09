import fs from 'fs';
// local functions
function genStructure() {
    let structureDB = {
        name: 'test',
        catalogs: [],
    };
    let structureJSON = JSON.stringify(structureDB);
    fs.mkdir('data', (e) => {
        if (e)
            throw e;
    });
    fs.writeFileSync('./data/_structure.json', structureJSON);
}
// export functions
export function filesCheck() {
    if (!fs.existsSync('./data') || !fs.existsSync('./data/_structure.json')) {
        genStructure();
    }
}
export async function catalogsLs() {
    let structure = await JSON.parse(fs.readFileSync('./data/_structure.json', 'utf-8'));
    return { catalogs: structure.catalogs };
}
export async function addCatalog(name) {
    try {
        const structure = await JSON.parse(fs.readFileSync('./data/_structure.json', 'utf-8'));
        let catalogArr = structure.catalogs;
        for (let element of catalogArr) {
            if (name == element) {
                return {
                    status: 'ERROR',
                    discription: 'A directory with this name already exists',
                };
            }
        }
        catalogArr.push(name);
        structure.catalogs = catalogArr;
        let obj = {
            name: name,
            objects: [],
        };
        fs.writeFileSync('./data/_structure.json', `${JSON.stringify(structure)}`);
        fs.writeFileSync(`./data/${name}.json`, `${JSON.stringify(obj)}`);
        return {
            status: 200,
        };
    }
    catch (e) {
        console.error(e);
    }
}
export async function removeCatalog(name) {
    try {
        if (!fs.existsSync(`./data/${name}.json`)) {
            return {
                status: 'ERROR',
                discription: 'A directory with this name was not found',
            };
        }
        const structure = await JSON.parse(fs.readFileSync('./data/_structure.json', 'utf-8'));
        let catalogArr = structure.catalogs;
        catalogArr.forEach((element, index) => {
            if (name == element) {
                catalogArr.splice(index, 1);
            }
        });
        structure.catalogs = catalogArr;
        fs.writeFileSync('./data/_structure.json', `${JSON.stringify(structure)}`);
        fs.unlink(`./data/${name}.json`, (e) => {
            if (e)
                throw e;
        });
        return {
            status: 200,
        };
    }
    catch (e) {
        console.error(e);
    }
}
export async function addObj(catalog, obj) {
    try {
        if (!fs.existsSync(`./data/${catalog}.json`))
            return { status: 'ERROR', discription: 'catalog not found' };
        const ctl = await JSON.parse(fs.readFileSync(`./data/${catalog}.json`, 'utf-8'));
        let objArr = ctl.objects;
        objArr.push(obj);
        ctl.objects = objArr;
        fs.writeFileSync(`./data/${catalog}.json`, `${JSON.stringify(ctl)}`);
        return {
            status: 200,
        };
    }
    catch (e) {
        console.error(e);
    }
}
export async function searchObjKeys(catalog, keys) {
    try {
        if (!fs.existsSync(`./data/${catalog}.json`))
            return { status: 'ERROR', discription: 'catalog not found' };
        const ctl = await JSON.parse(fs.readFileSync(`./data/${catalog}.json`, 'utf-8'));
        let response = [];
        let objArr = ctl.objects;
        objArr.forEach((element) => {
            if (element[keys] != undefined)
                response.push(element);
        });
        if (response[0] == undefined)
            return { status: 204, discription: 'No Content' };
        return response;
    }
    catch (e) {
        console.error(e);
    }
}
export async function searchObjVelue(catalog, keys, value) {
    try {
        if (!fs.existsSync(`./data/${catalog}.json`))
            return {
                status: 'ERROR',
                discription: 'catalog not found',
            };
        const ctl = await JSON.parse(fs.readFileSync(`./data/${catalog}.json`, 'utf-8'));
        let response = [];
        for (let i = 0; i < ctl.objects.length; i++) {
            if (ctl.objects[i][keys] == value)
                response.push(ctl.objects[i]);
        }
        if (response[0] == undefined)
            return {
                status: 204,
                discription: 'No Content',
            };
        return response;
    }
    catch (e) {
        console.log(e);
    }
}
//# sourceMappingURL=msdbFS.js.map