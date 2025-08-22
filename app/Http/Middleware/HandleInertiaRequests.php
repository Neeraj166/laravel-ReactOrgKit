<?php

namespace App\Http\Middleware;

use App\Models\Organization;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Spatie\Permission\Models\Permission;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $domain = parse_url(url('/'), PHP_URL_HOST);

        $organization = Organization::where('domain', $domain)->first();


        $member = $request->user('member')?->all()?->first()?->toArray();
        $user = $request->user()?->all()?->first();
        $userData = array_merge(
            $user?->toArray()?? [],
            [
                'roles'       => $user?->roles()?->pluck('name')?->toArray(),
                'permissions' => $user?->permissions()?->pluck('name')?->toArray()
            ]
            );
        return [
            ...parent::share($request),
            'name'  => $organization?->name,
            'auth'  => [
                'user' => $userData,
                'member' => $member,
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'organization' => [...$organization->toArray(), 'permissions' => $organization?->permissions()?->pluck('name')?->toArray()],
            'flash'       => fn() => [
                'success' => $request->session()->get('success'),
                'error'   => $request->session()->get('error'),
            ],
        ];
    }
}
