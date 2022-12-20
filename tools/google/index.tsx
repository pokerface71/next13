declare global {
	// eslint-disable-next-line no-unused-vars
	interface Window {
		gtag: any
	}
}
type GTagEvent = {
	action: string
	category: string
	label: string
	value: number
}

// log the pageView with their URL
export const pageView = (url: URL): void => {
	window?.gtag('config', process.env.googleAnalyticsTrackingId, {
		page_path: url
	})
}
// log specific events happening.
// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }: GTagEvent): void => {
	window?.gtag('event', action, {
		event_category: category,
		event_label: label,
		value
	})
}
