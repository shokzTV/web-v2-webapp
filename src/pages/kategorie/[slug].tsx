import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import { Tag } from '../../api/@types/Tag';
import { fetchTag, fetchAllTagSlugs } from '../../api/tag';
import SingleTagView from '../../components/pages/tags/SingleTagView';
import { Event } from '../../api/@types/Event';
import { fetchMainEvent } from '../../api/event';
import { getImageUrl } from '../../config/image';
import Share from '../../components/block/Share';

export async function getStaticProps({params}) {
    const tag = await fetchTag(params.slug);
    const mainEvent = await fetchMainEvent();
    return {
        props: {
            mainEvent,
            tag
        }
    };
}

export async function getStaticPaths() {
    const slugs = await fetchAllTagSlugs();
    return {
      paths: slugs.map(String).map((slug) => ({ params: { slug } })),
      fallback: true,
    };
}

export default function tag({tag, mainEvent}: {tag: Tag; mainEvent: Event}): ReactElement {
    return <PageFrame title={tag && tag.name} mainEvent={mainEvent} ogTitle={tag && tag.name} ogDescription={tag && tag.description} ogImage={getImageUrl(tag && tag.image)}>
        <SingleTagView tag={tag} />

        <Share url={`https://shokz.tv/kategorie/${tag && tag.slug}`} title={tag && tag.name} text={tag && tag.description} />
    </PageFrame>;
}
