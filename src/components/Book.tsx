import React, { useEffect, useState } from 'react';
import Chapter from './Chapter';

export type BookProps = {
    chapters: string[][]
}

const Book: React.FunctionComponent<BookProps> = props => {
    return (
        <Chapter pages={props.chapters[0]} />
    );
};

export default Book;