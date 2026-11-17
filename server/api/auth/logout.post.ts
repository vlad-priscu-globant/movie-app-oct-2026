export default defineEventHandler((event): null => {
  endSession(event)
  setResponseStatus(event, 204)
  return null
})
