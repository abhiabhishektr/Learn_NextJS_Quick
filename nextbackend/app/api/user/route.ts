// nextbackend/app/api/user/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const client = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Check if user already exists
        const existingUser = await client.user.findUnique({
            where: { username: body.username },
        });

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // Create the new user
        const newUser = await client.user.create({
            data: {
                username: body.username,
                password: hashedPassword,
            },
        });

        return NextResponse.json(
            { message: "User created successfully", user: newUser },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating user:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    } finally {
        // Close Prisma Client to prevent connection leaks
        await client.$disconnect();
    }
}


