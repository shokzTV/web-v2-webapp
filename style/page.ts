import css from 'styled-jsx/css';

export const pageWrapper = css`
    .pageWrapper {
        max-width: 1024px;
        margin: 0 auto;x
        position: relative;
        background: rgba(255, 255, 255, .3);
        height: calc(100vh - 49px);
        z-index: -1;
    }

    .pageWrapper:before {
        content: '';
        position: absolute;
        z-index: -1;
        top: 0;
        transform: translateY(-200px);
        left: 0;
        right: 0;
        bottom: 0;
        background-image: url('/images/home_bg.jpg');
        background-size: cover;
        mask-image: linear-gradient(rgba(255, 255, 255, .4), rgba(255, 255, 255, 0));
    } 

    .pageContent {
        background: #FFF;
        box-shadow: 5px 5px 15px 0px rgba(0,0,0,0.5);
    }
`;