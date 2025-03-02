
import { locale } from "svelte-i18n"
export function timeAgo(timestamp: number, datenow: number = Date.now()) {

    let rtf: undefined | Intl.RelativeTimeFormat;

    locale.subscribe((l) => {
        rtf = new Intl.RelativeTimeFormat(l ? l.split("-")[0].length > 2 ? "en" : l : "en", {
            numeric: "always",
            style: "short"
        })
    })

    const diff = datenow - timestamp
    const second = diff / 1000
    const seconds = second % 60
    const minute = second / 60
    const hour = minute / 60
    const day = hour / 24
    const year = day / 365.242375;

    if(rtf === undefined || rtf === null) {
        return "0"
    }
    if (year >= 1) {
        return rtf.format(Math.round(-year), "year")
    } else if (day >= 1) {
        return rtf.format(Math.round(-day), "day")
    } else if (hour >= 1) {
        return rtf.format(Math.round(-hour), "hour")
    } else if (minute >= 1) {
        return rtf.format(Math.round(-minute), "minute")
    } else {
        return rtf.format(Math.round(-seconds), "second")
    }
}