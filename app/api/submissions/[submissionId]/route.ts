import { createZodErrors } from "@/app/lib/createZodEroors";
import { prismaClient } from "@/app/lib/prismaDb";
import { applicationFormSchema } from "@/app/lib/validationSchema";
import { NextResponse } from "next/server";

type IParams = {
    submissionId?: string
}

export async function GET(_req: Request, { params }: { params: IParams }) {
    try {
        const { submissionId } = params;
       
        const submissionById = await prismaClient.submission.findFirst({
            where: {
                id: submissionId
            },
            include: {
                sectors: true
            }
        })

        if(!submissionById) {
            return NextResponse.json({error: 'Invalid ID'}, { status: 404 });
        }

        return NextResponse.json(submissionById, { status: 200 });
    }catch(err) {
        console.error('GET SUBMISSIONS ID', err)
        return NextResponse.json({error: 'Invalid ID'}, { status: 404 });
    }
}

export async function PATCH(req: Request, { params }: { params: IParams }) {
    try {
        const { submissionId } = params;
        const body = await req.json();

        const result = applicationFormSchema.safeParse(body);
        let zodErrors = {};
        if (!result.success) {
            zodErrors = createZodErrors(result.error.issues)
        }

        const { fullName, sectors } = body;

        const submission = await prismaClient.submission.update({
            where: {
                id: submissionId
            },
            data: {
                fullName,
                sectors: {
                   connect: sectors.map((s: {id: string}) => ({id: s.id}))
                }
            }
        })

        return NextResponse.json(submission);
    }catch(err) {
        console.error('PATCH SUBMISSIONS ID', err)
        return NextResponse.json(null);
    }
}