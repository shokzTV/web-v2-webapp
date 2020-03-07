import { ReactElement } from "react";

export default function Loader(): ReactElement {
    return <div className={'loader'}>
        <style jsx>{`
            .loader {
                width: 100%;
                height: 100%;
                background:linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%);
                background-size:400% 100%;
                animation:loading 1.4s ease infinite;
            }    
            @keyframes loading{
                0% {
                    background-position:100% 50%;
                }
                100% {
                    background-position:0 50%;
                }
            }
        `}</style>
    </div>
}