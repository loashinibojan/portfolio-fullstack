<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   public function index() {
    return response()->json(Project::latest()->get());
}

public function store(Request $request) {
    $project = Project::create($request->all());
    return response()->json($project);
}

public function update(Request $request, $id) {
    $project = Project::findOrFail($id);
    $project->update($request->all());
    return response()->json($project);
}

public function destroy($id) {
    Project::destroy($id);
    return response()->json(['message' => 'Deleted']);
}
}
