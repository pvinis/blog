export const GOOGLE_ANALYTICS_ID = 'UA-141718871-1'

export const pageview = (url: URL) => {
  window.gtag("config", GOOGLE_ANALYTICS_ID, {
    page_path: url
  })
}

type GTagEvent = {
  action: string
  category: string
  label: string
  value: number
}

export const event = ({ action, category, label, value }: GTagEvent) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  })
}
