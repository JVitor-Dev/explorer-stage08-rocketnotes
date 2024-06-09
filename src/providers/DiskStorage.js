const fs = require('fs')
const path = require('path')
const uploadConfig = require('../configs/upload')

class DiskStorage {
  async saveFile(file) {
    await fs.promises.rename(
      //mudar o arquivo de lugar - 'rename' renomear ou mover arquivos
      path.resolve(uploadConfig.TMP_FOLDER, file),
      path.resolve(uploadConfig.UPLOADS_FOLDER, file)
    )

    return file
  }

  async deleteFile(file) {
    const filePath = path.resolve(uploadConfig.UPLOADS_FOLDER, file) //pegar o endereço do arquivo existente
    try {
      await fs.promises.stat(filePath) //stat = retorna estado do arquivo, se ta aberto, existe ou não, etc
    } catch {
      return
    }

    await fs.promises.unlink(filePath) //deletar o arquivo - 'unlink' deleta arquivos
  }
}

module.exports = DiskStorage
