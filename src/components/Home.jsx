import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUser} from "../Store/slice/UserSlice";

export const Home = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    useEffect(() => {
        console.log(user)
    }, [user])
    return(

        <>
            <h1>Home</h1>
            {user.users.map((user, index) => <p key={index}>{user.name}</p>)}
        </>
    )
}