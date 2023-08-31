import { prismaClient } from "@/app/lib/prismaDb";
import { NextResponse } from "next/server";

type IParams = {
    sectorId?: string
}

export async function GET(_req: Request, { params }: { params: IParams }) {
    try {
        const { sectorId } = params;
       
        const sectorById = await prismaClient.sector.findFirst({
            where: {
                id: sectorId
            },
            include: {
                subSectors: true
            }
        })

        if(!sectorById) {
            return new NextResponse('Invalid ID', { status: 400 });
        }

        return NextResponse.json(sectorById);
    }catch(err) {
        console.error('GET SECTORS ID', err)
        return NextResponse.json(null);
    }
}