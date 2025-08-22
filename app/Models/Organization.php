<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasPermissions;
use Spatie\Permission\Traits\HasRoles;

class Organization extends Model
{
    use HasPermissions, HasRoles;
    protected $guard_name = 'web';
}
