import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import { Tag } from '../../api/@types/Tag';
import { fetchTag, fetchAllTagSlugs } from '../../api/tag';
import SingleTagView from '../../components/pages/tags/SingleTagView';

export async function getStaticProps({params}) {
    const tag = await fetchTag(params.slug);
    return {
        props: {
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

export default function tag({tag}: {tag: Tag}): ReactElement {
    return <PageFrame title={tag && tag.name}>
        <SingleTagView tag={tag} />
    </PageFrame>;
}
