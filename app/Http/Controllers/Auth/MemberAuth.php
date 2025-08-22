<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Member;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class MemberAuth extends Controller
{

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if ($validator->fails()) {
            // Inertia expects validation errors via redirect withErrors
            return redirect()->back()->withErrors($validator)->withInput();
        }

        $credentials = $request->only('email', 'password');

        if (Auth::guard('member')->attempt($credentials)) {
            $request->session()->regenerate();
            // Inertia redirect
            return back()->with('success', 'You are now logged in!');
        }

        // Login failed
        return redirect()->back()
            ->withErrors(['email' => 'These credentials do not match our records.'])
            ->withInput();
    }

    public function logout()
    {
        Auth::guard('member')->logout();
        request()->session()->regenerateToken();
        return back()->with('success', 'You are now logged out!');
    }
}
