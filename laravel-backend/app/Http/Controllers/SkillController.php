<?php

namespace App\Http\Controllers;

use App\Models\Skill;
use Illuminate\Http\Request;

class SkillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index() {
    return Skill::all();
}

public function store(Request $request) {
    return Skill::create($request->all());
}

public function destroy($id) {
    Skill::destroy($id);
}
}
