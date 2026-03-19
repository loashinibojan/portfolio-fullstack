<?php

namespace App\Http\Controllers;

use App\Models\Experience;
use Illuminate\Http\Request;

class ExperienceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index() {
    return Experience::all();
}

public function store(Request $request) {
    return Experience::create($request->all());
}

public function update(Request $request, $id) {
    $exp = Experience::findOrFail($id);
    $exp->update($request->all());
    return $exp;
}

public function destroy($id) {
    Experience::destroy($id);
}
}
