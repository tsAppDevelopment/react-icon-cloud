import React, { JSX } from 'react'

export const UseInViewport = ({
  cb,
  children,
}: {
  cb: (isInViewPort: boolean) => void
  children: JSX.Element | JSX.Element[]
}) => {
  const ref = React.useRef(null) as any

  React.useEffect(() => {
    // https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/IntersectionObserver
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    }

    const wrappedCb: IntersectionObserverCallback = (entries) => {
      cb(entries.some((e) => e.isIntersecting))
    }

    const observer = new IntersectionObserver(wrappedCb, options)

    if (ref?.current) {
      observer.observe(ref.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [cb])

  return <div ref={ref}>{children}</div>
}
