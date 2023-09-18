import { DateTime } from 'luxon'

export const formatToLocalTime = (
  secs: any,
  zone: any,
  format = "cccc,dd LLL yyyy' | Localtime : 'hh mm a"
) => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format)
}
