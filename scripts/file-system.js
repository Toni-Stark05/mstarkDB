import fs from 'fs';

let structure_json = '{}';
function crStructure(){
    fs.writeFile("./data/structure.json", structure_json, (err) => {
        if (err) throw err;
    });
}

export function fileSystem(){
    try {
        if (fs.existsSync('./data')) {
            if(fs.existsSync('./data/structure.json')){
            }
            else{
                crStructure();
            }
        } 
        else {
            fs.mkdir('data', err => {
                if(err) throw err; 
            });
            crStructure();
        }

        console.log('The file system is ready to work');
    } 
    catch(err) {
        console.error(err)
    }
}