
import "./ViewListings.scss"
// import Listing from "../../components/Listing/Listing";
import sampleImg from "../../assets/images/istockphoto-187227839-612x612.jpg";
import Listings from "../../components/Listings/Listings";

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



const ViewListings = () => {

    // for testing purposes
    const listings: ListingType[] = [
        {
            image: sampleImg,
            rent: "12,000",
            street: "4232 beverly Lane",
            city: "Burnaby",
            location: "North Burnaby",
            bedrooms: "4",
            bathrooms: "2",
            size: "1250",
            availability: "TODAY",
            agency: "High Five Agency",
        },
        {
            image: sampleImg,
            rent: "12,000",
            street: "4232 beverly Lane",
            city: "Burnaby",
            location: "North Burnaby",
            bedrooms: "4",
            bathrooms: "2",
            size: "1250",
            availability: "TODAY",
            agency: "High Five Agency",
        },
        {
            image: sampleImg,
            rent: "12,000",
            street: "4232 beverly Lane",
            city: "Burnaby",
            location: "North Burnaby",
            bedrooms: "4",
            bathrooms: "2",
            size: "1250",
            availability: "TODAY",
            agency: "High Five Agency",
        },
        {
            image: sampleImg,
            rent: "12,000",
            street: "4232 beverly Lane",
            city: "Burnaby",
            location: "North Burnaby",
            bedrooms: "4",
            bathrooms: "2",
            size: "1250",
            availability: "TODAY",
            agency: "High Five Agency",
        },
        {
            image: sampleImg,
            rent: "12,000",
            street: "4232 beverly Lane",
            city: "Burnaby",
            location: "North Burnaby",
            bedrooms: "4",
            bathrooms: "2",
            size: "1250",
            availability: "TODAY",
            agency: "High Five Agency",
        }

    ]

    // image: string
    // rent: number
    // street: string
    // city: string
    // location: string
    // bedrooms: string
    // bathrooms: string
    // size: string
    // availability: string
    // agency: string

    return (
        <>
            <section className="all-listings">
                <div className="all-listings__header">
                    <h2 className="all-listings__title">
                        All Listings
                    </h2>
                </div>

                {/* <Listing /> */}
                <Listings listings={listings}/>

            </section>
        </>
    )
}

export default ViewListings;