import "./Listing.scss";
import sampleImg from "../../assets/images/istockphoto-187227839-612x612.jpg"
import { CSSProperties } from "react";


interface ListingType {
    image: string
    rent: string
    street: string
    location: string
    city: string
    bedrooms: string
    bathrooms: string
    size: string
    availability: string
    agency: string
}

interface ListingProp {
    listing: ListingType
}

const Listing = ({listing}: ListingProp) => {

    return(

        <article className="listing__card">

            <div 
                // style={listingBg}
                className="listing__card__top">
                <div className="listing__card__top-container">
                    <img
                        className="listing__card__top-photo" 
                        src={listing.image} alt="property photo" />
                </div>
                <div className="listing__card__top-price">
                    <p className="listing__card-top__price-value">
                        {/* this is a variable amount */}
                        ${listing.rent}/month
                    </p>
                </div>
            </div>
            <div className="listing__card__bottom">
                <div className="listing__card__bottom-address">
                    <p className="listing__card_bottom-street"> 
                        {/* variable value */}
                        {/* 1003 1228 Marinaside Crescent */}
                        {listing.street}
                    </p>
                    <div className="listing__card__bottom-location">
                        <p className="listing__card__bottom-neighbouthood">
                            {/* South Burnaby */}
                            {listing.location}
                        </p>
                        <p style={{fontWeight: "bold"}}>
                            |
                        </p>
                        <p className="listing__card__bottom-city">
                            {/* Vancouver */}
                            {listing.city}
                        </p>
                    </div>
                </div>
                <div className="listing__card__bottom-specs">
                    <div className="listing__card__bottom-specs-wrapper">

                        <p className="listing__card__bottom-spec-val">
                            {/* 3 bd  */}
                            {listing.bedrooms} bd
                        </p>
                        <p 
                            className="listing__card__bottom-spec-val listing__card__bottom-spec-val--line"
                            > 
                             
                        </p>
                        <p className="listing__card__bottom-spec-val">
                            {/* 3 ba */}
                            {listing.bathrooms} ba
                        </p>
                        <p 
                            className="listing__card__bottom-spec-val listing__card__bottom-spec-val--line"
                            >
                                 
                        </p>
                        <p className="listing__card__bottom-spec-val">
                            {/* 950 sf */}
                            {listing.size} sq
                        </p>
                    </div>
                    <p className="listing__card__bottom__open-house">
                        <span className="listing__card__bottom__open-house__value"> 
                            {/* TODAY */}
                            {listing.availability}
                        </span> 
                    </p>
                </div>
                
                <div className="listing__card__bottom-agency">
                    {/* amex tech reality */}
                    {listing.agency}
                </div>

            </div>

                

        </article>

    )
}

export default Listing;