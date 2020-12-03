import React from 'react';
import Card from './Card';
const Cards = ({cardItems, img, children }) => {
    return(
        <>
            <div className="container">
                <div className="row">
                    
                </div>
                <div className="row">
                   {
                        cardItems.map((cardData, index) => {
                            return <Card key={index} data={ cardData } img = {img}>
                                {
                                    children
                                }
                            </Card>
                        })
                   }
                </div>
            </div>
        </>
    );
}
export default Cards;