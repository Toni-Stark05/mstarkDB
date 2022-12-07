import bp from 'body-parser'
import { settingDB } from './interface.js'

export function database(app: any, setting: settingDB) {
  let PORT: number = setting.PORT
  let NAME: string = setting.name
  app.use(bp.json())
  app.use(bp.urlencoded({ extended: true }))
  app.listen(PORT)
  console.log(`DB work from http://localhost:${PORT}`)

  app.get('/', (req: any, res: any): void => {
    res.send(`Data base --- ${NAME} <br> DB work from http://localhost:${PORT}`)
  })
}
