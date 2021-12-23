const { cosmiconfigSync } = require('cosmiconfig')
const findUp = require('find-up')
const semver = require('semver')

let cachedDeps

function getAllDependencies() {
  if (cachedDeps) {
    return cachedDeps
  }
  const nearestConfig = cosmiconfigSync('stylelint').search(process.cwd())
  if (!nearestConfig) {
    cachedDeps = []
    return cachedDeps
  }
  const nearestPackageJson = findUp.sync('package.json', { cwd: nearestConfig.filepath })
  if (!nearestPackageJson) {
    cachedDeps = []
    return cachedDeps
  }
  try {
    const pkg = require(nearestPackageJson)
    let deps = []
    if (pkg.dependencies) {
      deps = deps.concat(Object.keys(pkg.dependencies).map(name => ({ name, version: pkg.dependencies[name] })))
    }
    if (pkg.devDependencies) {
      deps = deps.concat(Object.keys(pkg.devDependencies).map(name => ({ name, version: pkg.devDependencies[name] })))
    }
    cachedDeps = deps
    return cachedDeps
    // eslint-disable-next-line unicorn/prefer-optional-catch-binding
  } catch (err) {
    cachedDeps = []
    return cachedDeps
  }
}

function getInstalledPackageVersion(moduleId) {
  const dependencies = getAllDependencies()
  const dependency = dependencies.find(dep => dep.name === moduleId)
  if (!dependency) {
    return null
  }
  let packageJson
  try {
    packageJson = require(`${moduleId}/package.json`)
    // eslint-disable-next-line unicorn/prefer-optional-catch-binding
  } catch (err) {
    return semver.minVersion(dependency.version).version
  }
  return packageJson.version
}

function hasInstalledPackage(moduleId, version) {
  const installedVersion = getInstalledPackageVersion(moduleId)
  if (!installedVersion) {
    return false
  }
  if (version) {
    return semver.satisfies(installedVersion, version)
  }
  return true
}

module.exports = {
  getInstalledPackageVersion,
  hasInstalledPackage,
}
