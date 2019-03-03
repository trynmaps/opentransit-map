/*
Sort by putting letters before numbers and treat number strings as integers.
Calling Array.prototype.sort() without a compare function sorts elements as
strings by Unicode code point order, e.g. [2, 12, 13, 9, 1, 27].sort() returns
[1, 12, 13, 2, 27, 9]
*/
function sortAlphaNumeric(a, b) {
  const notAlpha = /[^a-zA-Z]/g;

  const aRoute = a.properties.name;
  const bRoute = b.properties.name;
  const aInteger = parseInt(aRoute, 10);
  const bInteger = parseInt(bRoute, 10);
  const aAlpha = aRoute.replace(notAlpha, '');
  const bAlpha = bRoute.replace(notAlpha, '');

  // special case for K/T and K-OWL
  if (aRoute === 'K/T' && bRoute === 'K-OWL') return -1;
  if (aRoute === 'K-OWL' && bRoute === 'K/T') return 1;

  if (Number.isNaN(aInteger) && Number.isNaN(bInteger)) {
    return aAlpha < bAlpha ? -1 : 1;
  }
  if (Number.isNaN(aInteger)) {
    return -1;
  }
  if (Number.isNaN(bInteger)) {
    return 1;
  }
  if (aInteger === bInteger) {
    return aAlpha < bAlpha ? -1 : 1;
  }
  return aInteger - bInteger;
}

export default sortAlphaNumeric;
