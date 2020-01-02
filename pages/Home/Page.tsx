import { ReactElement } from "react";
import Navigation from "../Common/Navigation";


export default function Page(): ReactElement {
    return <>
        <Navigation />
        
        <div className={'pageWrapper'}>

        </div>

        <style jsx>{`
            .pageWrapper {
                position: relative;
                background: rgba(255, 255, 255, .3);
                height: calc(100vh - 49px);
                z-index: -1;
            }

            .pageWrapper:before {
                content: '';
                position: absolute;
                top: 0;
                transform: translateY(-200px);
                left: 0;
                right: 0;
                bottom: 0;
                background-image: url('/images/home_bg.jpg');
                background-size: cover;
                mask-image: linear-gradient(rgba(255, 255, 255, .4), rgba(255, 255, 255, 0));
            }  
        `}</style>
    </>;
}