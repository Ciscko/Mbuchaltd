import React, { Children, useEffect } from 'react';
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

const Card = ({data, img, children}) => {
    const { images, title1, title2, title3} = data
    useEffect(() => {
    })
    return (
        <div className='col l6 m6 s12'>
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={`${img}${images.split("|")[0]}`} />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4"><i className="material-icons right">more_vert</i></span>
                <br></br>
                </div>
                <div className="card-reveal">
                
                    <span className="card-title black-text text-darken-5">
                        <p>
                    <i className="material-icons right">close</i></p></span>
                    
                   
                    {title2}
                    <br></br> <br></br>

                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}
export default Card;