const types = {
  'air-bags': ['AIR BAGS'],
  'autonomous-driver-assist': [
    'BACK OVER PREVENTION',
    'ELECTRONIC STABILITY CONTROL',
    'FORWARD COLLISION AVOIDANCE',
    'LANE DEPARTURE',
    'TRACTION CONTROL SYSTEM',
    'VEHICLE SPEED CONTROL'
  ],
  brakes: [
    'PARKING BRAKE',
    'SERVICE BRAKES',
    'SERVICE BRAKES, AIR',
    'SERVICE BRAKES, ELECTRIC',
    'SERVICE BRAKES, HYDRAULIC'
  ],
  communications: ['COMMUNICATIONS'],
  'electrical-system': ['ELECTRICAL SYSTEM'],
  'engine-and-cooling': ['ENGINE AND ENGINE COOLING', 'ENGINE'],
  equipment: ['EQUIPMENT'],
  'fuel-system': ['FUEL SYSTEM'],
  'hybrid-ev': ['HYBRID PROPULSION SYSTEM'],
  latches: ['LATCHES/LOCKS/LINKAGES', 'TRAILER HITCHES'],
  'lighting-systems': ['INTERIOR LIGHTING', 'EXTERIOR LIGHTING'],
  'power-train': ['POWER TRAIN'],
  seating: ['CHILD SEAT', 'SEATS', 'SEAT BELTS'],
  steering: ['STEERING'],
  structure: ['STRUCTURE'],
  suspension: ['SUSPENSION'],
  'tires-wheels': ['TIRES', 'WHEELS'],
  'unknown-other': [],
  visibility: ['VISIBILITY']
}

const deafultType = 'unknown-other'
function getType (text) {
  for (const key of Object.keys(types)) {
    for (const prefix of types[key]) {
      if (text.startsWith(prefix)) {
        return toSlug(key)
      }
    }
  }

  return deafultType
}

// module.exports.getType = getType

function toSlug (text) {
  text = text.split('/').join(' ')
  return text.toLowerCase().replace(/[^a-z0-9 -]/g, '') // remove invalid chars
    .replace(/\s+/g, '-') // collapse whitespace and replace by -
    .replace(/-+/g, '-')
}

module.exports.getType = getType
module.exports.toSlug = toSlug
