
'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Edit, Trash, PlusCircle, Unlock, Database, AlertTriangle } from 'lucide-react';
import type { MenuItem } from '@/lib/types';
import { menuSeedData } from '/public/menu-seed-data';

const menuItemSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  category: z.enum(['Cakes', 'Sweets', 'Drinks', 'Snacks']),
  price: z.coerce.number().min(0, 'Price must be a positive number'),
  priceUnit: z.string().optional(),
  image: z.any(),
  hint: z.string().min(1, 'Image hint is required'),
  dietary: z.array(z.string()).optional(),
  isFeatured: z.boolean().default(false),
});

type MenuItemForm = z.infer<typeof menuItemSchema>;

const DIETARY_OPTIONS = ['Eggless', 'Vegan', 'Gluten-Free'];
const ADMIN_SECRET = "madhukar804453";

export default function AdminPage() {
  const searchParams = useSearchParams();
  const secret = searchParams.get('secret');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const { toast } = useToast();

  const form = useForm<MenuItemForm>({
    resolver: zodResolver(menuItemSchema),
    defaultValues: {
      name: '',
      category: 'Sweets',
      price: 0,
      priceUnit: '',
      image: null,
      hint: '',
      dietary: [],
      isFeatured: false,
    },
  });

  useEffect(() => {
    // Basic secret key check
    if (secret === ADMIN_SECRET) {
      setIsAuthorized(true);
      fetchMenuItems();
    } else {
      setIsAuthorized(false);
      setIsLoading(false);
    }
  }, [secret]);

  const fetchMenuItems = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/menu');
      if (res.ok) {
        const data = await res.json();
        setMenuItems(data);
      } else {
        toast({
          variant: 'destructive',
          title: 'Failed to fetch menu items',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'An error occurred while fetching data.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSeedData = async () => {
    setIsSeeding(true);
    try {
        const res = await fetch('/api/menu/seed', { method: 'POST' });
        const result = await res.json();
        if (res.ok) {
            toast({ title: "Database Seeded!", description: result.message });
            fetchMenuItems();
        } else {
            throw new Error(result.message || "Failed to seed data");
        }
    } catch (error: any) {
        toast({ variant: "destructive", title: "Seeding Failed", description: error.message });
    } finally {
        setIsSeeding(false);
    }
  };

  const handleFormSubmit = async (data: MenuItemForm) => {
    setIsSubmitting(true);
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        if (key === 'image' && value instanceof File) {
            formData.append(key, value);
        } else if (key === 'dietary') {
            (value as string[]).forEach(d => formData.append('dietary[]', d));
        }
        else if (value !== null && value !== undefined) {
           formData.append(key, String(value));
        }
    });

    const url = editingItem ? `/api/menu/${editingItem._id}` : '/api/menu';
    const method = editingItem ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, { method, body: formData });
      const result = await res.json();

      if (res.ok) {
        toast({
          title: `Success!`,
          description: `Menu item ${editingItem ? 'updated' : 'created'}.`,
        });
        fetchMenuItems();
        setIsDialogOpen(false);
      } else {
        throw new Error(result.message || 'An unknown error occurred');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Submission failed',
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleDelete = async (id: string) => {
    if(!confirm('Are you sure you want to delete this item?')) return;
    
    try {
      const res = await fetch(`/api/menu/${id}`, { method: 'DELETE' });
      if (res.ok) {
        toast({ title: 'Item deleted successfully' });
        fetchMenuItems();
      } else {
        const result = await res.json();
        throw new Error(result.message || 'Failed to delete item');
      }
    } catch (error: any) {
      toast({ variant: 'destructive', title: 'Deletion failed', description: error.message });
    }
  };


  const openEditDialog = (item: MenuItem) => {
    setEditingItem(item);
    form.reset({
        ...item,
        image: null, // Don't pre-fill file input
    });
    setIsDialogOpen(true);
  };

  const openNewDialog = () => {
    setEditingItem(null);
    form.reset({
      name: '',
      category: 'Sweets',
      price: 0,
      priceUnit: '',
      image: null,
      hint: '',
      dietary: [],
      isFeatured: false,
    });
    setIsDialogOpen(true);
  };
  

  if (!isAuthorized) {
    return (
      <div className="flex h-screen items-center justify-center bg-secondary">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle /> Access Denied
            </CardTitle>
            <CardDescription>
              The secret key provided is invalid. Please provide a valid key to access this page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-3xl font-bold">Menu Management</CardTitle>
              <CardDescription>Add, edit, or delete your shop's menu items.</CardDescription>
            </div>
            <div className="flex gap-2">
                <Button onClick={handleSeedData} variant="outline" disabled={isSeeding}>
                    {isSeeding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Database className="mr-2 h-4 w-4" />}
                    Seed Initial Data
                </Button>
                <Button onClick={openNewDialog}>
                    <PlusCircle className="mr-2 h-4 w-4" /> Add New Item
                </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menuItems.map((item) => (
                  <TableRow key={item._id}>
                    <TableCell>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-md object-cover h-16 w-16"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>₹{item.price} {item.priceUnit}</TableCell>
                    <TableCell>{item.isFeatured ? 'Yes' : 'No'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => openEditDialog(item)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(item._id!)} className="text-destructive hover:text-destructive">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingItem ? 'Edit' : 'Add'} Menu Item</DialogTitle>
            <DialogDescription>
              {editingItem ? 'Update the details for this menu item.' : 'Fill out the form to add a new item to your menu.'}
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-4 max-h-[80vh] overflow-y-auto p-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Chocolate Truffle Cake" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            <SelectItem value="Cakes">Cakes</SelectItem>
                            <SelectItem value="Sweets">Sweets</SelectItem>
                            <SelectItem value="Drinks">Drinks</SelectItem>
                            <SelectItem value="Snacks">Snacks</SelectItem>
                        </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Price (₹)</FormLabel>
                        <FormControl>
                        <Input type="number" placeholder="e.g., 800" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
              </div>
              <FormField
                control={form.control}
                name="priceUnit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price Unit</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., per cake, /kg" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                           <Input type="file" onChange={(e) => field.onChange(e.target.files ? e.target.files[0] : null)} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hint"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image AI Hint</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., chocolate cake" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="dietary"
                render={() => (
                  <FormItem>
                    <FormLabel>Dietary Options</FormLabel>
                     <div className="flex flex-wrap gap-4">
                        {DIETARY_OPTIONS.map((option) => (
                        <FormField
                            key={option}
                            control={form.control}
                            name="dietary"
                            render={({ field }) => {
                            return (
                                <FormItem key={option} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value?.includes(option)}
                                    onCheckedChange={(checked) => {
                                        return checked
                                        ? field.onChange([...(field.value || []), option])
                                        : field.onChange(
                                            field.value?.filter(
                                                (value) => value !== option
                                            )
                                            )
                                    }}
                                    />
                                </FormControl>
                                <FormLabel className="font-normal">{option}</FormLabel>
                                </FormItem>
                            )
                            }}
                        />
                        ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Feature this item
                      </FormLabel>
                       <CardDescription>
                        Featured items will appear on the homepage.
                       </CardDescription>
                    </div>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="secondary">Cancel</Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {editingItem ? 'Save Changes' : 'Create Item'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
