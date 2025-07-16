
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import MenuItem from '@/models/MenuItem';
import { menuSeedData } from '/public/menu-seed-data';

export async function POST(req: NextRequest) {
    try {
        await connectDB();

        // Check if data already exists to avoid duplication
        const count = await MenuItem.countDocuments();
        if (count > 0) {
            return NextResponse.json({ message: "Database already contains menu items. Seed operation aborted." }, { status: 409 });
        }

        // Insert seed data
        await MenuItem.insertMany(menuSeedData);

        return NextResponse.json({ message: "Database successfully seeded with initial menu items." }, { status: 201 });

    } catch (error) {
        console.error("Failed to seed database:", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
