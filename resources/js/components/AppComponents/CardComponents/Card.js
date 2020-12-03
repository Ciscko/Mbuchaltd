import React, { Children, useEffect } from 'react';
import M from 'materialize-css'
import 'materialize-css/dist/css/materialize.min.css'

const Card = ({data, img, children}) => {
    const { images, title,  description, icon } = data
    useEffect(() => {
    })
    return (
        <div className='col l4 m4 s12'>
            <div className="card">
                <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={`${img}${images.split("|")[0]}`} />
                </div>
                <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4">{title}<i className="material-icons right">more_vert</i></span>
                    <span className="bold">Icon: </span> {icon}<br></br>
                   
                </div>
                <div className="card-reveal">
                
                    <span className="card-title black-text text-darken-5">
                        <h5>{title}
                    <i className="material-icons right">close</i></h5></span>
                    <p>{description}</p>
                    
                    <br></br><br></br>
                    {
                        children
                    }
                </div>
            </div>
        </div>
    )
}
export default Card;