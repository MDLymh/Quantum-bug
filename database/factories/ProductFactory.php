<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->sentence(3);
        return [
            "name"=> $name,
            "description"=> fake()->paragraph(),
            "release_date"=> fake()->dateTime(),
            "category_id"=> Category::inRandomOrder()->first()->id ?? Category::factory(),
            "current_version"=> fake()->semver(),
            "last_stable_version"=> fake()->semver(),
            "is_active"=> fake()->boolean(),
            "has_subscription"=> fake()->boolean(),
        ];
    }
}
