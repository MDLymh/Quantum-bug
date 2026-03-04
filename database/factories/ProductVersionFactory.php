<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ProductVersion>
 */
class ProductVersionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'product_id'=> Product::inRandomOrder()->first()->id,
            'version' => $this->faker->numerify('v#.##'),
            'change_log_url' => $this->faker->url(),
            'is_stable'=> $this->faker->boolean(),
        ];
    }
}
