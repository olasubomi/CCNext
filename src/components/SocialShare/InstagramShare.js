import Link from 'next/link';
import React from 'react';

const InstagramShareButton = ({url, children}) => {
    return (
        <Link href={url} target="_blank" width={328} >{children}
        </Link>
    );
}

export default InstagramShareButton
