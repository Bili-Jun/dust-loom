export function isString(value: any) {
  return Object.prototype.toString.call(value) === '[object String]'
}

export function capitalizeFirstLetter(value: string) {
  if (!value || !isString(value)) {
    return
  }
  return value.charAt(0).toUpperCase() + value.slice(1);
}
