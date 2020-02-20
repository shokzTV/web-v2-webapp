import React, { ReactElement, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadFeaturedEvents } from '../../store/Event'; 


export default function FeaturedEvents(): ReactElement {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadFeaturedEvents());
    }, []);

    return <>
        Events
    </>;
}