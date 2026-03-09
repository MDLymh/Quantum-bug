<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreReportRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // auth()->user()->can('create report');
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "category_id" => "integer|required|exists:categories,id",
            "product_id"  => "integer|required|exists:products,id",
            "version_id"  => "integer|nullable|exists:product_versions,id",
            "title"       => "string|required|min:1|max:255",
            "description" => "string|required|min:1|max:500",

            // 1. Validamos que 'images' sea un arreglo y no exceda el límite que pusimos en el front
            "images"      => "nullable|array|max:3",

            // 2. Validación ESTRICTA para cada archivo individual dentro del arreglo
            "images.*"    => "file|image|mimes:jpg,jpeg,png,webp|max:2048",
        ];
    }

    /**
     * (Opcional) Mensajes de error personalizados para el frontend
     */
    public function messages(): array
    {
        return [
            'images.max'     => 'No puedes subir más de 3 imágenes.',
            'images.*.image' => 'El archivo subido debe ser una imagen real.',
            'images.*.mimes' => 'Solo se permiten imágenes en formato JPG, PNG o WEBP.',
            'images.*.max'   => 'Cada imagen no debe pesar más de 2MB.',
        ];
    }
}