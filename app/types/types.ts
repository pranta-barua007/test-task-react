export type Sector = {
    id: string;
    name: string;
    value: number;
    createdAt: Date;
    updatedAt: Date;
    hasNext: boolean;
    parentId: string | null;
    subSectors?: Sector[]
}