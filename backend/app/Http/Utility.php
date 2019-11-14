<?php


namespace App\Http;


use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class Utility {
    public static function richRetrieve(Request $request, Builder $query) {
        if ($request->has('filter')) {
            $filters = explode(',', $request->input('filter'));
            foreach ($filters as $filter) {
                list($criteria, $value) = explode(':', $filter);
                $query->where($criteria, 'like', '%' . $value . '%');
            }
        }
        if ($request->has('sort')) {
            $sorts = explode(',', $request->input('sort', ''));
            foreach ($sorts as $sortCol) {
                $sortDir = Str::startsWith($sortCol, '-') ? 'desc' : 'asc';
                $sortCol = ltrim($sortCol, '-');
                $query->orderBy($sortCol, $sortDir);
            }
        }
        $page_size = 20;
        if ($request->has('page_size')) {
            $page_size = $request->input('page_size');
        }
        return $query->paginate($page_size);
    }
}
