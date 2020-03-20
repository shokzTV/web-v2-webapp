import {isMobile} from "react-device-detect";
import { ReactElement } from "react";
import { useShare } from "../../hooks/share";
import { COLORS } from "../../style/colors";

interface Props {
    url: string;
    title: string;
    text?: string;
}
export default function Share({url, title, text = ''}: Props): ReactElement | null {
    const share = useShare(url, title, text);
    if(isMobile) {
        return <div className={'shareWrapper'}>
            <div className={'button'} onClick={share}>Share</div>

            <style jsx>{`
                .shareWrapper {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 20px 0;
                    margin-top: 30px;
                }

                .button {
                    background-color: ${COLORS.PRIMARY};
                    height: 40px;
                    width: 150px;
                    border-radius: 20px;
                    line-height: 20px;
                    font-size: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #FFF;
                    text-transform: uppercase;
                    text-align: center;
                    cursor: pointer;
                }
            `}</style>
        </div>;
    }

    return null;
}