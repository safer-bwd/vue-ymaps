export default (items) => {
  const _enum = items.reduce((acc, item) =>
    ({ ...acc, [item]: Symbol(item) }), {})
  return Object.freeze(_enum)
}
