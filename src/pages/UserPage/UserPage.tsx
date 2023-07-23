
import "./UserPage.scss";
import { UserType } from "../../App";

// interface UserPageProps {

// }

interface userPageProps {
    user: UserType | null
    isUserAuthorized: boolean
  }

const UserPage = ({user, isUserAuthorized}: userPageProps) => {
    console.log(user?.username)
    return (

        <>
            <section className="user-info">
                {
                    isUserAuthorized ?
                <div>
                    Hello, {user?.username}
                </div>
                :
                <div>
                Please sign in
                </div>
                }
            </section>
        </>
    )

}

export default UserPage