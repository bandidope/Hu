import fs from 'fs';
import { watchFile, unwatchFile } from 'fs'
import { fileURLToPath } from 'url'

global.owner = ['51936994155', '51904937048']
global.sessionName = 'Sessions/Owner'
global.version = '^2.0'

// No olvides sacar tu apikey de cada api!

global.api = {
  url: 'https://api.evogb.org',
  url2: 'https://api.stellarwa.xyz',
  url3: 'https://sylphyy.xyz',
  key: '', // api.evogb.org
  key2: '', // api.stellarwa.xyz
  key3: '' // sylphy.xyz
}

global.bot = {
  api: 'https://api.stellarwa.xyz',
  web: 'https://github.com/CheirZ'
}

global.mods = ['51936994155', '51936994155']

global.msgglobal = '[Error: *TypeError*] fetch failed'
globalThis.dev = '★彡[ Yallico Whois ]彡★'

global.mess = {
  socket: '《✧》 Este comando solo puede ser ejecutado por un Socket.',
  admin: '《✧》 Este comando solo puede ser ejecutado por los Administradores del Grupo.',
  botAdmin: '《✧》 Este comando solo puede ser ejecutado si el Socket es Administrador del Grupo.'
}

global.my = {
  ch: '120363419947391620@newsletter',
  name: '🤖 Project Whois 🔥 Oficial channel'
}

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  import(`${file}?update=${Date.now()}`)
})
