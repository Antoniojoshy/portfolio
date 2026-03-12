export interface GalleryImage {
    id: number;
    url: string;
    alt: string;
    category: 'Urban' | 'Nature' | 'Abstract' | 'Tech';
}

export const galleryImages: GalleryImage[] = [
    {
        id: 1,
        url: 'https://images.unsplash.com/photo-1646724234243-48d60266910a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGFyY2hpdGVjdHVyZSUyMG5pZ2h0fGVufDF8fHx8MTc3Mjc2MDYwN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        alt: 'Urban architecture at night',
        category: 'Urban',
    },
    {
        id: 2,
        url: 'https://images.unsplash.com/photo-1598439473183-42c9301db5dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuYXR1cmUlMjBsYW5kc2NhcGUlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzcyNzg2NTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        alt: 'Mountain landscape',
        category: 'Nature',
    },
    {
        id: 3,
        url: 'https://images.unsplash.com/photo-1598399929533-847def01aa41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBiZWFjaCUyMG9jZWFufGVufDF8fHx8MTc3MjcwNTA0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        alt: 'Beach sunset',
        category: 'Nature',
    },
    {
        id: 4,
        url: 'https://images.unsplash.com/photo-1598087216773-d02ad98034f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHJlZXQlMjBwaG90b2dyYXBoeSUyMHVyYmFufGVufDF8fHx8MTc3MjY4Mjc1OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        alt: 'Urban street photography',
        category: 'Urban',
    },
    {
        id: 5,
        url: 'https://images.unsplash.com/photo-1705254613735-1abb457f8a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGNvbG9yZnVsJTIwYXJ0fGVufDF8fHx8MTc3MjcwNjI1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        alt: 'Abstract art',
        category: 'Abstract',
    },
    {
        id: 6,
        url: 'https://images.unsplash.com/photo-1664355680555-12687f77e0d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3Jrc3BhY2UlMjBkZXNrJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NzI3OTE5MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        alt: 'Workspace technology',
        category: 'Tech',
    },
];
