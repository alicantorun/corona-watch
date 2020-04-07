export function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  const countryA = a.cases;
  const countryB = b.cases;

  let comparison = 0;
  if (countryA > countryB) {
    comparison = -1;
  } else if (countryA < countryB) {
    comparison = 1;
  }
  return comparison;
}
