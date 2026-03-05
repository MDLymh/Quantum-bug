import { Form, Head, usePage } from '@inertiajs/react';
import { useEffect, useState, useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from "@/layouts/app-layout";
import { selectOption } from "@/types/select-option";
import productVersion from '@/routes/productVersion';
import reports from '@/routes/reports';

export default function CreateReport() {
    const { categories, products } = usePage().props as unknown as { categories: selectOption[], products: selectOption[] };
    

    const [productId, setProductId] = useState("");
    const [versions, setVersions] = useState<selectOption[]>([]);
    const [loadingVersions, setLoadingVersions] = useState(false);


    const fileInputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<File[]>([]);


    useEffect(() => {
        if (productId) {
            setLoadingVersions(true);
            axios.get(productVersion.index().url)
                .then(res => setVersions(res.data))
                .catch(err => console.error("Error cargando versiones", err))
                .finally(() => setLoadingVersions(false));
        } else {
            setVersions([]);
        }
    }, [productId]);


    const syncFileInput = (files: File[]) => {
        if (fileInputRef.current) {
            const dataTransfer = new DataTransfer();
            files.forEach(file => dataTransfer.items.add(file));
            fileInputRef.current.files = dataTransfer.files;
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const availableSlots = 3 - images.length;
        if (availableSlots <= 0) return; 

        const newImages = [...images, ...acceptedFiles.slice(0, availableSlots)];
        setImages(newImages);
        syncFileInput(newImages)
    }, [images]);

    const removeImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        setImages(newImages);
        syncFileInput(newImages)
    };

    const isDropzoneDisabled = images.length >= 3;

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        maxFiles: 3,
        maxSize: 2 * 1024 * 1024,
        disabled: isDropzoneDisabled, 
    });

    const baseInputClasses = "flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <AppLayout>
            <Head title="Create Report" />
            
            <div className="max-w-2xl mx-auto p-6 bg-background rounded-lg shadow-sm border mt-6">
                <h1 className="text-2xl font-bold mb-6">Create Report</h1>

                <Form
                
                
                    action={reports.store().url}
                    method="post"
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-6">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="category_id">Category *</Label>
                                    <select 
                                        id="category_id"
                                        name="category_id"
                                        required
                                        className={baseInputClasses} 
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => <option key={cat.value.toString()} value={cat.value.toString()}>{cat.name}</option>)}
                                    </select>
                                    <InputError message={errors.category_id} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="product_id">Product *</Label>
                                    <select 
                                        id="product_id"
                                        name="product_id"
                                        required
                                        className={baseInputClasses} 
                                        value={productId}
                                        onChange={e => setProductId(e.target.value)}
                                    >
                                        <option value="">Select Product</option>
                                        {products.map(prod => <option key={prod.value.toString()} value={prod.value.toString()}>{prod.name}</option>)}
                                    </select>
                                    <InputError message={errors.product_id} />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="version_id">Version (Optional)</Label>
                                <select 
                                    id="version_id"
                                    name="version_id"
                                    className={baseInputClasses} 
                                    disabled={loadingVersions || versions.length === 0}
                                >
                                    <option value="">{loadingVersions ? "Loading..." : "Select Version"}</option>
                                    {versions.map(v => <option key={v.value.toString()} value={v.value.toString()}>{v.name}</option>)}
                                </select>
                                <InputError message={errors.version_id} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="title">Title *</Label>
                                <Input 
                                    id="title"
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="Report title"
                                />
                                <InputError message={errors.title} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description *</Label>
                                <textarea 
                                    id="description"
                                    name="description"
                                    required
                                    maxLength={500}
                                    className={`${baseInputClasses} min-h-[8rem] resize-none`} 
                                    placeholder="Detailed description..."
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label>Images (Optional, max 3)</Label>
                                
                                {/* INPUT NATIVO OCULTO: 
                                    Aquí es donde la magia ocurre. Inertia leerá automáticamente
                                    "images[]" y lo enviará junto al resto del formulario. */}
                                <input 
                                    type="file" 
                                    name="images[]" 
                                    multiple 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                />

                                <div {...getRootProps()} className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors 
                                    ${isDropzoneDisabled ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60 dark:border-gray-800 dark:bg-gray-800' : 
                                    isDragActive ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 cursor-pointer' : 
                                    'border-gray-300 dark:border-gray-700 hover:border-blue-400 cursor-pointer'}`}>
                                    
                                    {/* Evitamos que el Dropzone cree su propio input descontrolado pasándole los props vacíos y dependiendo solo del visual */}
                                    <input {...getInputProps()} />
                                    
                                    <p className="text-sm text-muted-foreground">
                                        {isDropzoneDisabled 
                                            ? "Límite de 3 imágenes alcanzado" 
                                            : "Arrastra hasta 3 imágenes o haz clic aquí"}
                                    </p>
                                </div>

                                {images.length > 0 && (
                                    <div className="mt-2 flex flex-col gap-2">
                                        {images.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-2 bg-muted rounded-md border text-sm">
                                                <span className="truncate max-w-[80%]">{file.name}</span>
                                                <button type="button" onClick={() => removeImage(idx)} className="text-destructive font-bold px-3 hover:opacity-80 transition-opacity">✕</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                <InputError message={errors.images as string} /> 
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full"
                                disabled={processing}
                            >
                                {processing && <Spinner className="mr-2" />}
                                Submit Report
                            </Button>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}