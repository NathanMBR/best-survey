const defaultFieldsToOmit = [
  'internalId',
  'deletedAt'
] as const

type DefaultKeys = typeof defaultFieldsToOmit[number]

export const removeSensitiveFields = <Payload extends Record<string, unknown>, Key extends keyof Payload>(
  payload: Payload,
  additionalFieldsToOmit: Array<Key>
): Omit<Payload, Key | DefaultKeys> => {
  const fieldsToOmit = [
    ...defaultFieldsToOmit,
    ...additionalFieldsToOmit
  ]

  const newPayload = Object.fromEntries(
    Object.entries(payload).filter(
      ([key]) => !fieldsToOmit.includes(key as Key)
    )
  ) as Omit<Payload, Key | DefaultKeys>

  return newPayload
}
