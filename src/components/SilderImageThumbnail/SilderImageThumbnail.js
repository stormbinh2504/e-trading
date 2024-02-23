import React, { useRef } from 'react'

// import '../../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import '../../../node_modules/react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

import "./SilderImageThumbnail.scss"

const images = [
    {
        original: 'https://picsum.photos/id/1018/1000/400/',
        thumbnail: 'https://picsum.photos/id/1018/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/400/',
        thumbnail: 'https://picsum.photos/id/1015/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1026/1000/400/',
        thumbnail: 'https://picsum.photos/id/1026/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1026/1000/400/',
        thumbnail: 'https://picsum.photos/id/1026/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1026/1000/400/',
        thumbnail: 'https://picsum.photos/id/1026/250/150/',
    },
    {
        original: 'https://picsum.photos/id/1026/1000/400/',
        thumbnail: 'https://picsum.photos/id/1026/250/150/',
    }
];

const SilderImageThumbnail = ({ images }) => {

    const myImageRef = useRef(null);

    const onFullscreen = () => {
        myImageRef.current.fullScreen()
    }

    const onPlay = () => {
        myImageRef.current.play()
    }

    const onPause = () => {
        myImageRef.current.pause()
    }

    const onMoveToSlide = () => {
        // Index start from 0 so 2 will move to 3rd slide
        myImageRef.current.slideToIndex(2)
    }

    const onEventTrigger = (eventName) => {
        console.log('Event Name ', eventName);
    }


    const renderLeftNav = (onClick, disabled) => {
        return (
            <button
                type="button"
                className="btn-prev btn-prev-left "
                aria-label="Prev Slide"
                disabled={disabled}
                onClick={onClick}
            >
                <i class="fa fa-angle-left" aria-hidden="true"></i>
            </button>
        );
    }

    const renderRightNav = (onClick, disabled) => {
        return (
            <button
                type="button"
                className="btn-prev btn-prev-right "
                aria-label="Next Slide"
                disabled={disabled}
                onClick={onClick}
            >
                <i class="fa fa-angle-right" aria-hidden="true"></i>
            </button>
        );
    }

    return (
        <div className="silder-thumbnail">
            <ImageGallery
                items={images}
                infinite={true}
                // lazyLoad={true}
                autoPlay={true}
                // slideDuration={3000}
                showPlayButton={false}

                onSlide={() => onEventTrigger('onSlide')}
                onClick={() => onEventTrigger('onClick')}
                onTouchMove={() => onEventTrigger('onTouchMove')}

                ref={myImageRef}

                renderLeftNav={renderLeftNav}
                renderRightNav={renderRightNav}
            />
        </div>
    )
}

export default SilderImageThumbnail