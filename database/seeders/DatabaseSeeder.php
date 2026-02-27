<?php

namespace Database\Seeders;

use App\Models\Blog;
use App\Models\Category;
use App\Models\EvidenceOfTicket;
use App\Models\Product;
use App\Models\ProductVersion;
use App\Models\Tag;
use App\Models\Ticket;
use App\Models\TicketCategory;
use App\Models\TicketComment;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(1000)->create();
        Category::factory(10)->create();
        Product::factory(5)->create();
        ProductVersion::factory(100)->create();
        Blog::factory(150)->create();
        Tag::factory(10)->create();
        TicketCategory::factory(10)->create();
        Ticket::factory(50)->create();
        EvidenceOfTicket::factory(10)->create();
        TicketComment::factory(50)->create();
    }
}
