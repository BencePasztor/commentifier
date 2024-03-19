import { useState, useEffect, useRef } from 'react'

/**
 * A custom hook for using the intersection observer on an element
 * @param options - Options for the intersection observer.
 * @returns An array containing a ref for the target and a boolean that indicates whether the element is intersecting or not.
 */
export const useIntersectionObserver = <E extends HTMLElement>(
  options?: IntersectionObserverInit
): [React.MutableRefObject<E | null>, boolean] => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const targetRef = useRef<E | null>(null)

  useEffect(() => {
    const targetElement = targetRef.current

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        setIsIntersecting(entry.isIntersecting)
      })
    }, options)

    if (targetElement) {
      observer.observe(targetElement)
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement)
      }
    }
  }, [options])

  return [targetRef, isIntersecting]
}
