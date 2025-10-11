<?php

namespace Tests\Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/** @extends Factory<User> */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->words(random_int(5, 15), true),
            'published' => $this->faker->boolean,
            'content' => $this->faker->text,
            'counter' => $this->faker->randomNumber(5),
        ];
    }
}
