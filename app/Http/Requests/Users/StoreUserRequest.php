<?php

namespace App\Http\Requests\Users;


use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => [
                'required', 
                'string', 
                'max:255'
            ],
            'paternal_last_name' => [
                'required', 
                'string', 
                'max:255'
            ],
            'maternal_last_name'=> [
                'nullable', 
                'string', 
                'max:255'
            ],
            'email' => [
                'required', 
                'string', 
                'email', 
                'max:255', 
                'unique:users'
            ],
            
            'password' => [
                'required', 
                'string', 
                Password::min(8)
                    ->letters()
                    ->mixedCase()
                    ->numbers()
                    ->symbols()
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'first_name' => __('api/fields/User.first_name'),
            'paternal_last_name' => __('api/fields/User.paternal_last_name'),
            'maternal_last_name' => __('api/fields/User.maternal_last_name'),
            'email' => __('api/fields/User.email'),
            'password' => __('api/fields/User.password'),
        ];
    }
}
