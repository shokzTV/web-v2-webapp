import css from 'styled-jsx/css';

export const pageWrapper = css`
    .page {
        min-height: calc(100vh - 268px);
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .pageWrapper {
        max-width: 1175px;
        margin: 0 auto;
        padding: 20px 15px 40px 15px;
        flex-grow: 1;
        width: 100%;
    }
`;