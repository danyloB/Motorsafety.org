const TYPES = {
  STRING: 'STRING',
  NUMBER: 'NUMBER',
  BOOLEAN: 'BOOLEAN'
}

function getColumnValue (raw, type) {
  switch (type) {
    case TYPES.STRING:
      return getString(raw)
    case TYPES.NUMBER:
      return getNumber(raw)
    case TYPES.BOOLEAN:
      return getBoolean(raw)
    default:
      return getString(raw)
  }
}
function getString (raw) {
  return raw + ''
}
function getNumber (raw) {
  const number = +raw
  return Number.isNaN(number) ? null : number
}

function getBoolean (raw) {
  return raw && typeof raw === 'string' && ['yes', 'true', 'y'].includes(raw.toLocaleLowerCase())
}

module.exports.TYPES = TYPES
module.exports.getColumnValue = getColumnValue
