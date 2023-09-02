export type Sector = {
    id: string;
    name: string;
    value: number | string;
    createdAt: string;
    updatedAt: string;
    hasNext: boolean;
    parentId?: string | null;
    subSectors?: Sector[]
}