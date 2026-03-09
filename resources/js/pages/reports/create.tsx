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

    // 1. ESTILOS DE INPUTS: Aplanados, sin bordes redondeados y fondo sutil oscuro para integrarse al layout
    const baseInputClasses = "flex w-full rounded-none border border-gray-300 dark:border-white/10 bg-transparent dark:bg-[#1a1a1e] px-4 py-3 text-sm text-gray-900 dark:text-white ring-offset-background placeholder:text-gray-400 dark:placeholder:text-gray-600 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-qb-cyan focus-visible:border-qb-cyan disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-300";

    // 2. ESTILOS DE LABELS: Apegados a la identidad visual de la imagen
    const labelClasses = "text-[10px] font-black uppercase tracking-widest text-gray-800 dark:text-gray-300 mb-1";

    return (
        <AppLayout>
            <Head title="Create Report" />
            
            {/* ELIMINAMOS LA "TARJETA": Ahora el contenido fluye directo en el layout principal */}
            <div className="w-full max-w-5xl mx-auto pt-6 pb-16 transition-colors duration-300">
                
                {/* HEADER DE LA SECCIÓN */}
                <div className="relative mb-10 border-b border-gray-200 dark:border-white/10 pb-8 pt-6">
                    {/* Barra superior de colores que respeta el modo glitch */}
                    <div className="glitch-decor absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-qb-blue via-qb-cyan to-qb-purple"></div>
                    
                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase tracking-tighter glitch-title mt-2">
                        Create Report
                    </h1>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-3">
                        Submit a new bug or support ticket
                    </p>
                </div>

                <Form
                    action={reports.store().url}
                    method="post"
                    disableWhileProcessing
                    className="flex flex-col gap-8"
                >
                    {({ processing, errors }) => (
                        <div className="grid gap-8">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="flex flex-col">
                                    <Label htmlFor="category_id" className={labelClasses}>Category *</Label>
                                    <select 
                                        id="category_id"
                                        name="category_id"
                                        required
                                        className={baseInputClasses} 
                                    >
                                        <option value="" className="dark:bg-[#1a1a1e]">Select Category</option>
                                        {categories.map(cat => <option key={cat.value.toString()} value={cat.value.toString()} className="dark:bg-[#1a1a1e]">{cat.name}</option>)}
                                    </select>
                                    <InputError message={errors.category_id} className="mt-2" />
                                </div>

                                <div className="flex flex-col">
                                    <Label htmlFor="product_id" className={labelClasses}>Product *</Label>
                                    <select 
                                        id="product_id"
                                        name="product_id"
                                        required
                                        className={baseInputClasses} 
                                        value={productId}
                                        onChange={e => setProductId(e.target.value)}
                                    >
                                        <option value="" className="dark:bg-[#1a1a1e]">Select Product</option>
                                        {products.map(prod => <option key={prod.value.toString()} value={prod.value.toString()} className="dark:bg-[#1a1a1e]">{prod.name}</option>)}
                                    </select>
                                    <InputError message={errors.product_id} className="mt-2" />
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <Label htmlFor="version_id" className={labelClasses}>Version (Optional)</Label>
                                <select 
                                    id="version_id"
                                    name="version_id"
                                    className={baseInputClasses} 
                                    disabled={loadingVersions || versions.length === 0}
                                >
                                    <option value="" className="dark:bg-[#1a1a1e]">{loadingVersions ? "Loading..." : "Select Version"}</option>
                                    {versions.map(v => <option key={v.value.toString()} value={v.value.toString()} className="dark:bg-[#1a1a1e]">{v.name}</option>)}
                                </select>
                                <InputError message={errors.version_id} className="mt-2" />
                            </div>

                            <div className="flex flex-col">
                                <Label htmlFor="title" className={labelClasses}>Title *</Label>
                                <Input 
                                    id="title"
                                    type="text"
                                    name="title"
                                    required
                                    placeholder="Report title..."
                                    className={baseInputClasses}
                                />
                                <InputError message={errors.title} className="mt-2" />
                            </div>

                            <div className="flex flex-col">
                                <Label htmlFor="description" className={labelClasses}>Description *</Label>
                                <textarea 
                                    id="description"
                                    name="description"
                                    required
                                    maxLength={500}
                                    className={`${baseInputClasses} min-h-[10rem] resize-none`} 
                                    placeholder="Detailed description of the issue..."
                                />
                                <InputError message={errors.description} className="mt-2" />
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-end mb-1">
                                    <Label className={labelClasses}>Attachments</Label>
                                    <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                        {images.length} / 3 Max (2MB)
                                    </span>
                                </div>
                                
                                <input 
                                    type="file" 
                                    name="images[]" 
                                    multiple 
                                    ref={fileInputRef} 
                                    className="hidden" 
                                />

                                <div {...getRootProps()} className={`border border-dashed rounded-none p-10 text-center transition-all duration-300 
                                    ${isDropzoneDisabled ? 'border-gray-200 bg-gray-50 dark:border-white/5 dark:bg-white/5 cursor-not-allowed opacity-60' : 
                                    isDragActive ? 'border-qb-cyan bg-qb-cyan/5 text-qb-cyan cursor-pointer scale-[1.01]' : 
                                    'border-gray-300 dark:border-white/10 hover:border-qb-blue dark:hover:border-qb-cyan cursor-pointer dark:bg-[#1a1a1e] text-gray-500 dark:text-gray-400 hover:text-qb-blue dark:hover:text-qb-cyan'}`}>
                                    
                                    <input {...getInputProps()} />
                                    
                                    <p className="text-xs font-bold uppercase tracking-widest">
                                        {isDropzoneDisabled 
                                            ? "Maximum limit of 3 images reached" 
                                            : "Drag & drop images here, or click to browse"}
                                    </p>
                                </div>

                                {images.length > 0 && (
                                    <div className="mt-4 flex flex-col gap-2">
                                        {images.map((file, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-none text-sm group transition-colors hover:border-gray-300 dark:hover:border-white/20">
                                                <span className="truncate max-w-[80%] text-gray-700 dark:text-gray-300 font-medium text-xs">{file.name}</span>
                                                <button type="button" onClick={() => removeImage(idx)} className="text-gray-400 hover:text-red-500 font-bold px-3 transition-colors">✕</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                
                                <InputError message={errors.images as string} /> 
                            </div>

                            <Button
                                type="submit"
                                className="mt-6 w-full h-14 rounded-none font-black uppercase tracking-widest text-xs transition-all duration-300
                                           bg-qb-dark text-white hover:bg-qb-blue 
                                           dark:bg-qb-cyan dark:text-qb-dark dark:hover:bg-white dark:hover:shadow-[0_0_15px_rgba(47,244,238,0.5)]"
                                disabled={processing}
                            >
                                {processing && <Spinner className="mr-3" />}
                                {processing ? "Transmitting..." : "Submit Report"}
                            </Button>
                        </div>
                    )}
                </Form>
            </div>
        </AppLayout>
    );
}