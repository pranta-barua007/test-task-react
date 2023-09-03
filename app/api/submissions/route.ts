import { NextResponse } from "next/server";
import { prismaClient } from "@/app/lib/prismaDb";

import { applicationFormSchema } from "@/app/lib/validationSchema";
import { createZodErrors } from "@/app/lib/createZodEroors";

export async function GET(_req: Request) {
  try {
    const allSubmissions = await prismaClient.submission.findMany();

    return NextResponse.json(allSubmissions);
  } catch (err) {
    console.error("GET SUBMISSIONS", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = applicationFormSchema.safeParse(body);
    let zodErrors = {};
    if (!result.success) {
      zodErrors = createZodErrors(result.error.issues);
    }

    const { fullName, sectors } = body;

    const submission = await prismaClient.submission.create({
      data: {
        fullName,
        sectors: {
          connect: sectors.map((s: {id: string}) => ({id: s.id})) 
        },
      },
      include: {
        sectors: true
      }
    });

    return NextResponse.json(
      Object.keys(zodErrors).length > 0
        ? { errors: zodErrors }
        : { data: { ...submission }, success: true }
    );
  } catch (err) {
    console.error("POST SUBMISSIONS", err);
    return NextResponse.json(null);
  }
}
