import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchIdeas, getIdeas } from "../../store/idea";

export default function Feed() {
    const dispatch = useDispatch();
    const ideas = useSelector(getIdeas);

    useEffect(() => {
        dispatch(fetchIdeas())
    }, [dispatch])

    return (
        <>
        </>
    )
}