
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import MenuItem from '@/models/MenuItem';
import cloudinary from '@/lib/cloudinary';
import { Readable } from 'stream';

// Helper function to stream file buffer
async function streamToBuffer(readableStream: ReadableStream<Uint8Array>): Promise<Buffer> {
    const chunks: Uint8Array[] = [];
    const reader = readableStream.getReader();
    while (true) {
        const { done, value } = await reader.read();
        if (done) {
            break;
        }
        if (value) {
            chunks.push(value);
        }
    }
    return Buffer.concat(chunks);
}

// GET all menu items
export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
        return NextResponse.json({ message: "Database not configured." }, { status: 500 });
    }
    const menuItems = await MenuItem.find({}).sort({ category: 1, name: 1 });
    return NextResponse.json(menuItems);
  } catch (error) {
    console.error('Failed to get menu items:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new menu item
export async function POST(req: NextRequest) {
  try {
    const conn = await connectDB();
    if (!conn) {
        return NextResponse.json({ message: "Database not configured." }, { status: 500 });
    }

    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;
    
    if (!imageFile) {
        return NextResponse.json({ message: 'Image is required' }, { status: 400 });
    }

    // Stream file to buffer for upload
    const imageBuffer = await streamToBuffer(imageFile.stream());

    // Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'luxmisweets' },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        );
        Readable.from(imageBuffer).pipe(uploadStream);
    }) as any;


    const dietaryValues = formData.getAll('dietary[]');

    const newMenuItem = new MenuItem({
        name: formData.get('name'),
        category: formData.get('category'),
        price: formData.get('price'),
        priceUnit: formData.get('priceUnit'),
        hint: formData.get('hint'),
        isFeatured: formData.get('isFeatured') === 'true',
        dietary: dietaryValues.filter(d => d !==''),
        image: uploadResult.secure_url,
    });

    await newMenuItem.save();
    return NextResponse.json(newMenuItem, { status: 201 });

  } catch (error) {
    console.error('Failed to create menu item:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
