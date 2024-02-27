export const removeSensitiveFields = <T extends Record<string, unknown>>(payload: T, ...aditionalFieldsToOmit: Array<keyof T>): T => {
  const defaultFieldsToOmit = [
    'id',
    'deletedAt'
  ] as Array<keyof T>

  const newPayload = {
    ...payload
  }

  const fieldsToOmit = [
    ...defaultFieldsToOmit,
    ...aditionalFieldsToOmit
  ]

  fieldsToOmit.forEach(
    field => {
      delete newPayload[field]
    }
  )

  return newPayload
}
