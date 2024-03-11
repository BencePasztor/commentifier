import { useEffect, useState } from "react"

// Enum defining the possible states of the header.
export enum HeaderState {
    STATIC = "STATIC",
    STICKY = "STICKY",
    HIDDEN = "HIDDEN"
}

/**
 * Custom hook to handle sticky behavior of the header component.
 * @returns {HeaderState} The current state of the header based on scroll position
 */
export const useStickyHeader = () => {
    const [headerState, setHeaderState] = useState(HeaderState.STATIC)

    useEffect(() => {
        let prevScrollY = 0

        // Show, Hide or Fix the Header based on scroll position
        const scrollHandler = () => {
            console.log(prevScrollY, window.scrollY)
            const isScrollingDown = prevScrollY < window.scrollY
            prevScrollY = window.scrollY

            if (isScrollingDown) {
                setHeaderState(HeaderState.HIDDEN)
            } else if (window.scrollY !== 0) {
                setHeaderState(HeaderState.STICKY)
            } else {
                setHeaderState(HeaderState.STATIC)
            }
        }

        window.addEventListener("scroll", scrollHandler)
        return () => {
            window.removeEventListener("scroll", scrollHandler)
        }
    }, [])

    return headerState
}