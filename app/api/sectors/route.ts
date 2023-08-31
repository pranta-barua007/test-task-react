import { prismaClient } from "@/app/lib/prismaDb";
import { NextResponse } from "next/server";

export async function GET(_req: Request) {
    try {
        const baseSectors = await prismaClient.sector.findMany();

        return NextResponse.json(baseSectors)
    } catch(err) {
        console.error('GET SECTORS', err)
        return new NextResponse('Internal Error', { status: 500 });
    }
}