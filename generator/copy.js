import repo from './repo'

(async function () {
  try {
    const generator = await repo.resolveGenerator()
    await generator.saveFiles()
    console.log('successfully copied files')
  } catch (ex) {
    console.log('failed to copy files: %s', ex.message)
  }
})()
