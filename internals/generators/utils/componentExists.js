/**
 * componentExists
 *
 * Check whether the given component exist in either the components or containers directory
 */

const fs = require('fs');
const path = require('path');

function componentExists(comp) {
  const pageComponents = fs.readdirSync(
    path.join(__dirname, '../../../src/containers'),
  );
  
  return pageComponents.indexOf(comp) >= 0;
}

module.exports = componentExists;
