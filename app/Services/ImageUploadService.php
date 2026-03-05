<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ImageUploadService
{
    protected ImageManager $manager;
    protected string $basePath;

    public function __construct()
    {
        $this->manager = new ImageManager(new Driver());
        
        
        $this->basePath = env('IMAGE_UPLOAD_BASE_PATH', 'app/private');
    }

    /**
     * Processes, compresses, and saves a single image.
     *
     * @param UploadedFile $image
     * @param string $directory Destination folder
     * @return string Relative path of the saved image
     */
    public function processAndSaveImage(UploadedFile $image, string $directory = 'reports'): string
    {
        $storagePath = storage_path("{$this->basePath}/{$directory}");
        $this->ensureDirectoryExists($storagePath);

        $filename = Str::uuid() . '.webp';
        $absolutePath = $storagePath . '/' . $filename;

        $img = $this->manager->read($image->getRealPath());
        $img->scaleDown(width: 1920);
        $img->toWebp(80)->save($absolutePath);

        return "{$directory}/{$filename}";
    }

    /**
     * Processes, compresses, and saves an array of images.
     * (Reuses the processAndSaveImage logic to avoid redundancy)
     *
     * @param UploadedFile[] $images
     * @param string $directory Destination folder
     * @return array Relative paths of the saved images
     */
    public function processAndSaveImages(array $images, string $directory = 'reports'): array
    {
        $savedPaths = [];

        foreach ($images as $image) {
            if ($image instanceof UploadedFile) {
                $savedPaths[] = $this->processAndSaveImage($image, $directory);
            }
        }

        return $savedPaths;
    }

    /**
     * Private helper to ensure the directory exists.
     * * @param string $path
     * @return void
     */
    private function ensureDirectoryExists(string $path): void
    {
        if (!file_exists($path)) {
            mkdir($path, 0755, true);
        }
    }
}