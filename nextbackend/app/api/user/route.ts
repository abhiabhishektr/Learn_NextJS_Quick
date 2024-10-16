import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export async function POST(request: NextRequest) {

    const body= await request.json();
    client.user.create({
        data: {
            username: body.username,
            password: body.password
        }
    })

    return Response.json({
        name: "abhishek",
        email: "abhishek@gmail"
    })

    
}