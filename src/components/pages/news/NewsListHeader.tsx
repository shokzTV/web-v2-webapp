import { ReactElement } from "react";

export default function NewsListHeader(): ReactElement {
    return <div className={'headerRow'}>
        <div className={'image'}>
            <img src={'/images/wd.png'} alt={'fat_witch_doctor'} />
        </div>
        <div className={'info'}>
            <h1>Immer auf dem neusten Stand bleiben!</h1>
            <div className={'subHeader'}>Alles rund um die deustche Dota 2 Szene</div>

            <a className={'discordLink'} href={'http://www.discord.gg/hagYNWg'} target={'_blank'} rel={'noreferrer'}>
                <img src={'/images/social/discord.png'} alt={'discord-icon'} />
                <span className={'linkLabel'} >Dem shokz.TV Discord Server beitreten</span>
            </a>
        </div>

        <style jsx>{`
            .headerRow {
                display: flex;
                align-items: center;
                margin: -20px;
            }

            .image {
                width: 33%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                padding: 20px;
            }

            .info {
                width: 66%;
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            .discordLink {
                display: flex;
                align-items: center;
                margin-top: 20px;
            }
            .discordLink img {
                margin-right: 10px;
            }

            @media only screen and (max-width: 425px) {
                .headerRow {
                    margin: 0;
                    flex-direction: column;
                }
                .image {
                    align-items: center;
                    width: 100%;
                }
                .info {
                    width: 100%;
                    text-align: center;
                }
            }
        `}</style>
    </div>;
}