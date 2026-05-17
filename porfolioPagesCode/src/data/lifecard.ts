export type Category = '風景' | '美食' | '手作';
export type Size = 'large' | 'wide';

export interface PhotoItem {
    id: number;
    category: Category;
    pic: string;
    size: Size;
    text: string;
};

export const allPhotos: PhotoItem[] = [
    { id: 1, category: '風景', pic: 's-1', size: 'large', text: '海之女神' },
    { id: 2, category: '風景', pic: 's-2', size: 'large', text: '異國冬景' },
    { id: 3, category: '風景', pic: 's-3', size: 'wide', text: '意外的相見' },
    { id: 4, category: '風景', pic: 's-4', size: 'large', text: '舒適想念的環境' },
    { id: 5, category: '風景', pic: 's-5', size: 'wide', text: '' },
    { id: 6, category: '風景', pic: 's-6', size: 'large', text: '' },
    { id: 7, category: '風景', pic: 's-7', size: 'large', text: '' },
    { id: 8, category: '風景', pic: 's-8', size: 'large', text: '' },
    { id: 9, category: '風景', pic: 's-9', size: 'wide', text: '' },
    { id: 10, category: '美食', pic: 'f-1', size: 'large', text: '' },
    { id: 11, category: '美食', pic: 'f-2', size: 'large', text: '' },
    { id: 12, category: '美食', pic: 'f-4', size: 'large', text: '' },
    { id: 13, category: '美食', pic: 'f-5', size: 'large', text: '' },
    { id: 14, category: '美食', pic: 'f-6', size: 'large', text: '' },
    { id: 15, category: '美食', pic: 'f-7', size: 'large', text: '' },
    { id: 16, category: '美食', pic: 'f-8', size: 'wide', text: '' },
    { id: 17, category: '美食', pic: 'f-9', size: 'wide', text: '' },
    { id: 18, category: '美食', pic: 'f-10', size: 'large', text: '' },
    { id: 19, category: '美食', pic: 'f-12', size: 'wide', text: '' },
    { id: 21, category: '美食', pic: 'f-14', size: 'large', text: '' },
    { id: 22, category: '美食', pic: 'f-16', size: 'large', text: '' },
    { id: 23, category: '美食', pic: 'f-17', size: 'wide', text: '' },
    { id: 24, category: '手作', pic: 'h-1', size: 'large', text: '' },
    { id: 25, category: '手作', pic: 'h-2', size: 'large', text: '' },
    { id: 26, category: '手作', pic: 'h-3', size: 'large', text: '' },
    { id: 27, category: '手作', pic: 'h-5', size: 'large', text: '偶爾' },
    { id: 28, category: '手作', pic: 'h-6', size: 'large', text: '簡單樸實的滿足' },
];