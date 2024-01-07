export function capitalizeWords(inputString) {
  return inputString.replace(/\b\w/g, (match) => match.toUpperCase())
}
