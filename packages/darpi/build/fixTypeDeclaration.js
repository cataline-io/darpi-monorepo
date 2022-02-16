const fs = require('fs-extra')
const path = require('path')
const replace = require('replace-in-file')

const typesDir = (dir) => path.resolve(__dirname, `../dist/types/${dir}`)

const injectSchemaTypes = async () => {
  const schemaTypesDir = path.resolve(__dirname, '../../schema/dist')

  await fs.copy(schemaTypesDir, typesDir('schema'), {
    filter: (file) => file.split('.').pop() !== 'js'
  })
}

const wipeDarpiTypes = async () => {
  await fs.move(typesDir('darpi/src/index.d.ts'), typesDir('darpi/index.d.ts'))

  await fs.move(
    typesDir('darpi/src/models/FormContext.d.ts'),
    typesDir('darpi/models/FormContext.d.ts')
  )

  await fs.rm(typesDir('darpi/src'), { recursive: true })
  await fs.rm(typesDir('darpi/dev'), { recursive: true })

  await replace({
    files: [typesDir('darpi/index.d.ts')],
    from: /@cataline\.io\/schema/g,
    to: '../schema'
  })

  await replace({
    files: [typesDir('darpi/models/FormContext.d.ts')],
    from: /@cataline\.io\/schema/g,
    to: '../../schema'
  })
}

wipeDarpiTypes()
injectSchemaTypes()
