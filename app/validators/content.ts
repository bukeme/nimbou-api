import vine from '@vinejs/vine'

export const createContentValidator = vine.compile(
  vine.object({
    title: vine.string().trim(),
    text: vine.string().trim().escape(),
  })
)
