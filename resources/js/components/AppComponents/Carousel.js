import React, { useEffect } from 'react';
import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'

const Carousel = ({ items, classes, options }) => {
    const carouselRef = React.createRef()
    useEffect(() => {
        M.Carousel.init(carouselRef.current, options)
    }, [])
    return (
        
            <div className="">
                <div className={classes} ref={carouselRef}>
                    {
                        items.map((item, index) => {
                            return (
                                <a key={index} className="carousel-item" href="#"><img src={item.source} /></a>
                            )
                        })
                    }
                </div>
            </div>
       
    );
}
export default Carousel;