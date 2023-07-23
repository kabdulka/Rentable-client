import "./Listings.scss";
import Listing from "../Listing/Listing";


interface ListingType {
    image: string
    rent: string
    street: string
    city: string
    location: string
    bedrooms: string
    bathrooms: string
    size: string
    availability: string
    agency: string
}

interface ListingsProps {
    listings: ListingType[]
}

const Listings = ({listings}: ListingsProps) => {

    return (
        <section className="listings">
            <ul className="listings__list">

                {
                    listings.map((listing, index) => 
                        <Listing
                            key={index}
                            listing={listing}
                        />
                    )
                }

            </ul>

        </section>
    )

}

export default Listings;