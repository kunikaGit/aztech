
import React, { useEffect, useRef } from "react"
const CommonBanner = ({ title }) => {
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.4; // 0.5x speed (half speed)
        }
    }, []);
    return (
        <>
            <section className="relative pt-4">
                <div className="absolute inset-0  overflow-hidden  -z-10 common-banner" style={{ height: '320px' }} >
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full object-cover  -z-10 h-full "
                        src="video/graphs.mp4"
                    />
                </div>
            </section>
            <div className="text-center flex items-center justify-center m-auto xl:max-w-4xl lg:max-w-full lg:text-6xl md:text-4xl sm:text-3xl"
                style={{ height: '300px' }} >
                <h2 className='font-display main-banner-heading font-bold dark:text-jacarta-700 text-white'>{title}</h2>
            </div>
        </>
    )
}
export default CommonBanner