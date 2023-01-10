import fs from 'fs'

import { structureDB, catalog } from './interface.js'

// local functions

function genStructure(name: string): void {
  let structureDB: structureDB = {
    name: `${name}`,
    catalogs: [],
  }
  let structureJSON: any = JSON.stringify(structureDB)
  fs.mkdir('data', (e: any) => {
    if (e) throw e
  })
  fs.writeFileSync('./data/_structure.json', structureJSON)
}

function isEqual(object1: any, object2: any) {
  const props1 = Object.getOwnPropertyNames(object1)
  const props2 = Object.getOwnPropertyNames(object2)

  if (props1.length !== props2.length) {
    return false
  }

  for (let i = 0; i < props1.length; i += 1) {
    const prop = props1[i]

    if (object1[prop] !== object2[prop]) {
      return false
    }
  }

  return true
}

function deleteObject(objects: any, objectDell: any) {
  for (let i = 0; i < objects.length; i++) {
    //console.log(objects[i], objectDell)
    if (isEqual(objects[i], objectDell)) {
      objects.splice(i, 1)
      break
    }
  }
  return objects
}
// export functions

export function filesCheck(name: string): void {
  if (!fs.existsSync('./data') || !fs.existsSync('./data/_structure.json')) {
    genStructure(name)
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

export async function removeObj(catalog: string, obj: any) {
  try {
    if (!fs.existsSync(`./data/${catalog}.json`))
      return { status: 'ERROR', discription: 'catalog not found' }

    const ctl: catalog = await JSON.parse(
      fs.readFileSync(`./data/${catalog}.json`, 'utf-8')
    )

    let objArr: any = ctl.objects
    let check: boolean = false

    for (let i = 0; i < objArr.length; i++) {
      if (isEqual(objArr[i], obj)) {
        objArr.splice(i)
        check = true
      }
    }

    if (check) {
      ctl.objects = objArr
      fs.writeFileSync(`./data/${catalog}.json`, `${JSON.stringify(ctl)}`)

      return {
        status: 200,
      }
    } else {
      return { status: 'ERROR', discription: 'object not found' }
    }
  } catch (e) {
    console.error(e)
  }
}

export async function removeObjVelue(
  catalog: string,
  keys: string,
  value: any
) {
  try {
    const ctl = await JSON.parse(
      fs.readFileSync(`./data/${catalog}.json`, 'utf-8')
    )

    let objArr: any[] = []
    for (let i = 0; i < ctl.objects.length; i++) {
      if (ctl.objects[i][keys] == value) {
        objArr.push(ctl.objects[i])
      }
    }

    if (objArr.length) {
      for (let i = 0; i < objArr.length; i++) {
        ctl.objects = deleteObject(ctl.objects, objArr[i])
      }
      fs.writeFileSync(`./data/${catalog}.json`, `${JSON.stringify(ctl)}`)
      return {
        status: 200,
      }
    } else {
      return { status: 'ERROR', discription: 'object not found' }
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
      if (ctl.objects[i][keys] === value) response.push(ctl.objects[i])
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
