
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


// PUT (update) a menu item
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const conn = await connectDB();
    if (!conn) {
        return NextResponse.json({ message: "Database not configured." }, { status: 500 });
    }

    const formData = await req.formData();
    const imageFile = formData.get('image') as File | null;

    const updateData: any = {
        name: formData.get('name'),
        category: formData.get('category'),
        price: formData.get('price'),
        priceUnit: formData.get('priceUnit'),
        hint: formData.get('hint'),
        isFeatured: formData.get('isFeatured') === 'true',
        dietary: formData.getAll('dietary[]').filter(d => d!==''),
    };

    if (imageFile && imageFile.size > 0) {
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
        updateData.image = uploadResult.secure_url;

        // Optionally delete old image from Cloudinary
        const existingItem = await MenuItem.findById(id);
        if (existingItem && existingItem.image) {
            const publicId = existingItem.image.split('/').pop()?.split('.')[0];
            if (publicId) {
                cloudinary.uploader.destroy(`luxmisweets/${publicId}`).catch(err => console.error("Failed to delete old image", err));
            }
        }
    }

    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedMenuItem) {
      return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
    }

    return NextResponse.json(updatedMenuItem);

  } catch (error) {
    console.error(`Failed to update menu item ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE a menu item
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const conn = await connectDB();
    if (!conn) {
        return NextResponse.json({ message: "Database not configured." }, { status: 500 });
    }
    const deletedItem = await MenuItem.findByIdAndDelete(id);

    if (!deletedItem) {
      return NextResponse.json({ message: 'Menu item not found' }, { status: 404 });
    }
    
    // Delete image from Cloudinary
    if (deletedItem.image) {
        const publicId = deletedItem.image.split('/').pop()?.split('.')[0];
        if (publicId) {
            cloudinary.uploader.destroy(`luxmisweets/${publicId}`).catch(err => console.error("Failed to delete image from cloudinary", err));
        }
    }

    return NextResponse.json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    console.error(`Failed to delete menu item ${id}:`, error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
