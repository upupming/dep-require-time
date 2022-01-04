
import { measureTask } from './index.js'
import { getPackageJSON } from './fs.js'

const { dependencies = {}, devDependencies = {} } = getPackageJSON()

measureTask('dependencies', Object.keys(dependencies))
measureTask('devDependencies', Object.keys(devDependencies))
