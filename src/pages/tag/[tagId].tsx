import React, { ReactElement, useState, useEffect } from 'react';
import PageFrame from '../../components/PageFrame';
import { useRouter } from 'next/router';
import { Tag } from '../../api/@types/Tag';
import { fetchTag } from '../../api/tag';
import SingleTagView from '../../components/pages/tags/SingleTagView';

export default function tag(): ReactElement {
    const router = useRouter();
    const tagId = +router.query.tagId;
    const [tag, setTag] = useState<Tag | null>(null);
    
    useEffect(() => {
        const load = async () => setTag(await fetchTag(tagId));
        if(!tag && tagId) {
            load();
        }
    }, [tagId]);
    
    return <PageFrame>
        <SingleTagView tag={tag} />
    </PageFrame>;
}