import fse from 'fs-extra'

export const copyDist = async (changes = true) => {
  await fse.copy('./dist/', './.generator/dist/', {
    overwrite: true
  })

  await fse.remove('./.generator/changes')
  if (changes) {
    await fse.copy('./dist/', './.generator/changes')
  }
}
