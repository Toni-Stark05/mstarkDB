export interface settingDB {
  name: string
  PORT: number
}

export interface structureDB {
  name: string
  catalogs: [] | string[]
}

export interface catalog {
  name: string
  objects: [] | string[]
}
