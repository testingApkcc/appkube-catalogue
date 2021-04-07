import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { v4 } from 'uuid'
import { AiOutlineLeft, AiOutlineRight, AiOutlineFullscreen } from "react-icons/ai";
import PhotoswipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { CustomGallery, Item, DefaultLayout } from 'react-photoswipe-gallery'

const Slider = ({ slider }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const layoutRef = useRef()
  function gotoNextSlide() {
    if ((currentSlide + 1) < slider.length) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  function goToPreviousSlide() {
    if (currentSlide - 1 >= 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <>
      <CustomGallery layoutRef={layoutRef} ui={PhotoswipeUIDefault}>
        <button className='nabtn-left' onClick={goToPreviousSlide}>
          <AiOutlineLeft />
        </button>
        {slider.map((sliderContent, index) => (
          <article key={v4()} className={`slider-content ${currentSlide === index ? 'active' : ''}`}>
            <div className="item-image">
              <Item
                original={sliderContent.image.childImageSharp.fluid.src}
                thumbnail={sliderContent.image.childImageSharp.fluid.src}
                width="1920"
                height="1280"
              >
                {({ ref, open }) => (
                  <div ref={ref} onClick={open}>
                    <button className="fullscreen">
                      <AiOutlineFullscreen />
                    </button>
                    <img src={sliderContent.image.childImageSharp.fluid.src} alt={sliderContent.name} title={sliderContent.name} width="600" height="480" />
                  </div>
                )}
              </Item>
            </div>
            <div className="item-content">
              <h3 className="has-text-weight-semibold is-size-2">
                {sliderContent.name}
              </h3>
              <p>
                {sliderContent.text}
              </p>
            </div>
          </article>
        ))}
        <button className='nabtn-right' onClick={gotoNextSlide}>
          <AiOutlineRight />
        </button>
      </CustomGallery>
      <DefaultLayout
        shareButton={false}
        fullscreenButton={true}
        zoomButton={true}
        ref={layoutRef}
      />
    </>
  );
};

Slider.propTypes = {
  slider: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      name: PropTypes.string,
      text: PropTypes.string,
    })
  ),
}

export default Slider