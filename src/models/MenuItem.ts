
import mongoose, { Document, Schema } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  category: 'Cakes' | 'Sweets' | 'Drinks' | 'Snacks';
  price: number;
  priceUnit?: string;
  image: string;
  hint: string;
  dietary?: string[];
  isFeatured: boolean;
}

const MenuItemSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Cakes', 'Sweets', 'Drinks', 'Snacks'], required: true },
  price: { type: Number, required: true },
  priceUnit: { type: String },
  image: { type: String, required: true }, // Cloudinary URL
  hint: { type: String, required: true },
  dietary: [{ type: String }],
  isFeatured: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
