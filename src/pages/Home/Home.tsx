
import "./Home.scss"
import { ModalsOpen } from "../../App";
import { useState } from "react";

interface HomeProps {
    username: string
}

const Home = ({username}: HomeProps) => {

    const user = localStorage.getItem("username")

    return (

        <>
           <section className="home">
                <div className="home__header">
                    <h2 className="home__header-title"> {username} </h2>
                </div>
           </section>
        </>

    );

}

export default Home;