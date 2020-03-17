import React, { ReactElement } from 'react';
import PageFrame from '../../components/PageFrame';
import { Tag } from '../../api/@types/Tag';
import { fetchTag, fetchAllTagIds } from '../../api/tag';
import SingleTagView from '../../components/pages/tags/SingleTagView';

export async function getStaticProps({params}) {
    const tag = await fetchTag(params.tagId);
    return {
        props: {
            tag
        }
    };
}

export async function getStaticPaths() {
    const tagIds = await fetchAllTagIds();
    return {
      paths: tagIds.map(String).map((tagId) => ({ params: { tagId } })),
      fallback: true,
    };
}

export default function tag({tag}: {tag: Tag}): ReactElement {
    return <PageFrame title={tag && tag.name}>
        <SingleTagView tag={tag} />
    </PageFrame>;
}
