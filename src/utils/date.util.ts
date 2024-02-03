import dayjs from 'dayjs'

export function formatDate(value: string, format = 'MMMM YYYY') {
  return dayjs(value).format(format)
}
