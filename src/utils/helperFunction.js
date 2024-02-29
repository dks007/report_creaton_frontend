export const toTitleCase = (phrase) => {
  return phrase
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// This function is created to check  name  which is present in options list or not
export const checkDataInList = (nameToCheck, list, keyToCheck) => {
  for (const item of list) {
    if (item[keyToCheck] === nameToCheck) {
      return { value: nameToCheck, label: nameToCheck }
    }
  }
  return null
}
