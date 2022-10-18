import bp from 'body-parser';

export function startDB(app, PORT = 3730){
    app.use(bp.json());
    app.use(bp.urlencoded({ extended: true }));
    app.listen(PORT);
    console.log(`DB work from http://localhost:${PORT}`);

    app.get('/', (req, res) =>{
        res.send(`DB work from http://localhost:${PORT}`);
    })

    app.get('/setting', (req, res) => {
        let settingJSON = JSON.stringify({name: "My DB", port: PORT});
        res.send(settingJSON);
    })

}