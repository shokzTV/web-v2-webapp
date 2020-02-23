import { useDispatch, useSelector } from "react-redux";
import { loadAvailableVideos } from "../store/Ui";
import { availableVideosSelector } from "../store/selectors/Ui";
import { videoEntitiesSelector } from '../store/selectors/Videos';
import { useMemo } from "react";
import { loadVideos } from "../store/Video";


export function useVideoList(page: number = 0, pageSize: number = 4): number[] {
    const dispatch = useDispatch();
    const videoIds = useSelector(availableVideosSelector);
    const videos = useSelector(videoEntitiesSelector);
    const start = pageSize * page;
    const videosOfIntrest = videoIds.slice(start, start + pageSize);
    const pageVideos = useMemo(() => videosOfIntrest.map((id) => videos[id])
                                                    .sort(({id: a}, {id: b}) => b - a)
                                                    .map((video) => video && video.id), [videosOfIntrest, videos]);

    if(!videoIds.length) {
        dispatch(loadAvailableVideos());
        return [...Array(pageSize).keys()];
    }

    if(videosOfIntrest.find((id) => !videos[id])) {
        dispatch(loadVideos(videosOfIntrest));
        return [...Array(pageSize).keys()];
    }

    return pageVideos;
}