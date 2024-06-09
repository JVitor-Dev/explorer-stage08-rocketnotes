const path = require('path') // organizar os caminho dos diretórios
const multer = require('multer') // para fazer os uploads
const crypto = require('crypto') // gerar uma hash no nome do arquivo do usuário, para evitar arquivos com o mesmo nome

// informação como configurações
const TMP_FOLDER = path.resolve(__dirname, '..', '..', 'tmp') //onde recebe o arquivo
const UPLOADS_FOLDER = path.resolve(__dirname, 'uploads') //onde ficará armazenado o arquivo

const MULTER = {
  storage: multer.diskStorage({
    destination: TMP_FOLDER, // para onde vai o arquivo
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex') //nome aleatorio do arquivo
      const fileName = `${fileHash}-${file.originalname}` //nome do arquivo

      return callback(null, fileName) // nome do arquivo com hash
    }
  })
}

module.exports = {
  MULTER,
  TMP_FOLDER,
  UPLOADS_FOLDER
}
