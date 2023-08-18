// @ts-nocheck
'use client';

import dynamic from 'next/dynamic';

const AutoLinkText = dynamic(() => import('react-autolink-text2'), {
	ssr: false,
});

const DescriptionLink = ({ text }: { text?: string | null }) => {
	if (text) return <AutoLinkText text={text} linkProps={{ target: '_blank', rel: 'noopener noreferrer' }} />;
	return null;
};

export default DescriptionLink;
