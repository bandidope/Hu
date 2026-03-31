import { promises as fs } from 'fs';
import fetch from 'node-fetch'

const obtenerImagen = async (keyword) => {
  const endpoints = ["gelbooru", "safebooru", "danbooru"];

  for (const endpoint of endpoints) {
    try {
      const url = `${api.url2}/nsfw/${endpoint}?keyword=${keyword}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`${endpoint} HTTP ${res.status}`);

      const buffer = await res.arrayBuffer();

      if (buffer.byteLength > 0) {
        return Buffer.from(buffer);
      }
    } catch (err) {
      console.error(`Error en ${endpoint}:`, err.message);
    }
  }

  return null;
};

const charactersFilePath = './lib/characters.json'

async function loadCharacters() {
  try {
    const data = await fs.readFile(charactersFilePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('❀ Error al cargar characters.json:', error)
    throw new Error('❀ No se pudo cargar el archivo characters.json')
  }
}

function findSimilarCharacter(name, characters) {
  name = name.toLowerCase().trim()
  return (
    characters.find((c) => c.name.toLowerCase() === name) ||
    characters.find((c) => c.name.toLowerCase().includes(name)) ||
    characters.find((c) => name.includes(c.name.toLowerCase()))
  )
}

export default {
  command: ['charimage', 'wimage', 'cimage'],
  category: 'gacha',
  run: async (client, m, args) => {
    const db = global.db.data
    const chatId = m.chat
    const chatData = db.chats[chatId]

    if (chatData.adminonly || !chatData.gacha)
      return m.reply(`🌱 Estos comandos estan desactivados en este grupo.`)

    if (args.length === 0)
      return m.reply(
        `🌱 Por favor, proporciona el nombre de un personaje.`
      )

    try {
      const characterName = args.join(' ').toLowerCase().trim()
      const characters = await loadCharacters()
      const character = findSimilarCharacter(characterName, characters)

      if (!character)
        return m.reply(`🌱 No se ha encontrado el personaje *${characterName}*, ni uno similar.`)

      const message = `➭ Nombre › *${character.name}*

ੈ⚥‧₊˚ Género › *${character.gender}*
ੈ⛁₊˚ Valor › *${character.value.toLocaleString()}*
ੈ❀︎‧₊˚ Fuente › *${character.source}*

${dev}`

const imagen = await obtenerImagen(personaje.keyword, personaje.name);

if (!imagen) {
  return m.reply(`✎ No se pudo obtener una imagen para *${personaje.name}*.`);
}

const payload = {
  image: imagen,
  caption: mensaje,
  mimetype: 'image/jpeg'
};

await client.sendMessage(chatId, payload, { quoted: m });

    } catch (error) {
      await m.reply(msgglobal + error)
    }
  },
};
