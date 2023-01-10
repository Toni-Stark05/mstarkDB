import bp from 'body-parser'
import { settingDB } from './interface.js'
import * as mfs from './msdbFS.js'

export function database(app: any, setting: settingDB) {
  let PORT: number = setting.PORT
  let NAME: string = setting.name
  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))
  app.listen(PORT)
  console.log(`DB work from http://localhost:${PORT}`)

  mfs.filesCheck(setting.name)

  app.get('/', (req: any, res: any): void => {
    res.send(`Data base --- ${NAME} <br> DB work from http://localhost:${PORT}`)
  })

  app.get('/catalog-ls', (req: any, res: any) => {
    mfs.catalogsLs().then((response) => {
      res.send(response)
    })
  })

  app.post('/add-catalog', (req: any, res: any) => {
    let name = req.body.name
    mfs.addCatalog(name).then((response) => {
      res.send(response)
    })
  })

  app.post('/remove-catalog', (req: any, res: any) => {
    let name = req.body.name
    mfs.removeCatalog(name).then((response) => {
      res.send(response)
    })
  })

  app.post('/add-obj', (req: any, res: any) => {
    let catalog = req.body.catalog
    let obj = req.body.obj
    mfs.addObj(catalog, obj).then((response) => {
      res.send(response)
    })
  })

  app.post('/remove-obj', (req: any, res: any) => {
    let catalog = req.body.catalog
    let obj = req.body.obj
    mfs.removeObj(catalog, obj).then((response) => {
      res.send(response)
    })
  })

  app.post('/search-obj-keys', (req: any, res: any) => {
    let catalog = req.body.catalog
    let keys = req.body.keys
    mfs.searchObjKeys(catalog, keys).then((response) => {
      res.send(response)
    })
  })

  app.post('/search-obj-keys-and-value', (req: any, res: any) => {
    let catalog = req.body.catalog
    let keys = req.body.keys
    let value = req.body.value
    mfs.searchObjVelue(catalog, keys, value).then((response) => {
      res.send(response)
    })
  })
}
