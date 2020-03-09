import { ReactElement } from "react";
import classNames from "classnames";

interface Props {
    type?: 'text' | 'ckeditor' | 'h1' | 'h2' | 'h3' | 'h4';
    rows: number; 
}

export default function TextLoader({type = 'text', rows = 1}: Props): ReactElement {
    const paintRows = Array(rows).fill(undefined);
    
    return <div className={classNames('loader', type)}>
        {paintRows.map((data, index) => <div key={index} className={'row'} />)}

        <style jsx>{`
            .row {
                width: 100%;
                height: 1em;
                background:linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%);
                background-size:400% 100%;
                animation:loading 1.4s ease infinite;
            }    

            .text .row {
                margin-bottom: .2em;
            }

            .ckeditor .row {
                margin-bottom: 1em;
            }

            .h1 .row {
                margin-bottom: .2em;
            }

            .h2 .row {
                margin-bottom: .2em;
            }

            .h3 .row {
                margin-bottom: .4em;
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