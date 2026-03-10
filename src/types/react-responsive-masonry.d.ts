declare module 'react-responsive-masonry' {
    import * as React from 'react';

    export interface MasonryProps {
        columnsCount?: number;
        gutter?: string;
        children: React.ReactNode;
        className?: string;
    }

    export default class Masonry extends React.Component<MasonryProps> { }

    export interface ResponsiveMasonryProps {
        columnsCountBreakPoints?: { [key: number]: number };
        children: React.ReactNode;
    }

    export class ResponsiveMasonry extends React.Component<ResponsiveMasonryProps> { }
}
