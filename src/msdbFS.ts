import fs from 'fs'

import { structureDB, catalog } from './interface.js'

// local functions

function genStructure(): void {
  let structureDB: structureDB = {
    name: 'test',
    catalogs: [],
  }
  let structureJSON: any = JSON.stringify(structureDB)
  fs.mkdir('data', (e: any) => {
    if (e) throw e
  })
  fs.writeFileSync('./data/_structure.json', structureJSON)
}

// export functions

export function filesCheck(): void {
  if (!fs.existsSync('./data') || !fs.existsSync('./data/_structure.json')) {
    genStructure()
  }
}

export async function catalogsLs() {
  let structure: structureDB = await JSON.parse(
    fs.readFileSync('./data/_structure.json', 'utf-8')
  )
  return { catalogs: structure.catalogs }
}

export async function addCatalog(name: string) {
  try {
    const structure: structureDB = await JSON.parse(
      fs.readFileSync('./data/_structure.json', 'utf-8')
    )

    let catalogArr: string[] = structure.catalogs

    for (let element of catalogArr) {
      if (name == element) {
        return {
          status: 'ERROR',
          discription: 'A directory with this name already exists',
        }
      }
    }

    catalogArr.push(name)
    structure.catalogs = catalogArr

    let obj: catalog = {
      name: name,
      objects: [],
    }

    fs.writeFileSync('./data/_structure.json', `${JSON.stringify(structure)}`)
    fs.writeFileSync(`./data/${name}.json`, `${JSON.stringify(obj)}`)

    return {
      status: 200,
    }
  } catch (e) {
    console.error(e)
  }
}

export async function removeCatalog(name: string) {
  try {
    if (!fs.existsSync(`./data/${name}.json`)) {
      return {
        status: 'ERROR',
        discription: 'A directory with this name was not found',
      }
    }

    const structure: structureDB = await JSON.parse(
      fs.readFileSync('./data/_structure.json', 'utf-8')
    )
    let catalogArr: string[] = structure.catalogs

    catalogArr.forEach((element, index) => {
      if (name == element) {
        catalogArr.splice(index, 1)
      }
    })
    structure.catalogs = catalogArr

    fs.writeFileSync('./data/_structure.json', `${JSON.stringify(structure)}`)
    fs.unlink(`./data/${name}.json`, (e) => {
      if (e) throw e
    })
    return {
      status: 200,
    }
  } catch (e) {
    console.error(e)
  }
}

export async function addObj(catalog: string, obj: any) {
  try {
    if (!fs.existsSync(`./data/${catalog}.json`))
      return { status: 'ERROR', discription: 'catalog not found' }

    const ctl: catalog = await JSON.parse(
      fs.readFileSync(`./data/${catalog}.json`, 'utf-8')
    )

    let objArr: any[] = ctl.objects
    objArr.push(obj)
    ctl.objects = objArr

    fs.writeFileSync(`./data/${catalog}.json`, `${JSON.stringify(ctl)}`)

    return {
      status: 200,
    }
  } catch (e) {
    console.error(e)
  }
}

export async function searchObjKeys(catalog: string, keys: string) {
  try {
    if (!fs.existsSync(`./data/${catalog}.json`))
      return { status: 'ERROR', discription: 'catalog not found' }

    const ctl: catalog = await JSON.parse(
      fs.readFileSync(`./data/${catalog}.json`, 'utf-8')
    )

    let response: any[] = []

    let objArr: any = ctl.objects
    objArr.forEach((element: any) => {
      if (element[keys] != undefined) response.push(element)
    })

    if (response[0] == undefined)
      return { status: 204, discription: 'No Content' }

    return response
  } catch (e) {
    console.error(e)
  }
}

export async function searchObjVelue(
  catalog: string,
  keys: string,
  value: any
) {
  try {
    if (!fs.existsSync(`./data/${catalog}.json`))
      return {
        status: 'ERROR',
        discription: 'catalog not found',
      }

    const ctl = await JSON.parse(
      fs.readFileSync(`./data/${catalog}.json`, 'utf-8')
    )

    let response: any[] = []

    for (let i = 0; i < ctl.objects.length; i++) {
      if (ctl.objects[i][keys] == value) response.push(ctl.objects[i])
    }

    if (response[0] == undefined)
      return {
        status: 204,
        discription: 'No Content',
      }

    return response
  } catch (e) {
    console.log(e)
  }
}
