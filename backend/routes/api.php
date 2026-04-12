<?php

use App\Http\Controllers\Api\QuoteController;
use App\Http\Controllers\Api\QuoteItemController;
use App\Http\Controllers\Api\QuotePublishController;
use App\Http\Controllers\Api\DocumentController;
use App\Http\Controllers\Api\DocumentVersionController;
use Illuminate\Support\Facades\Route;

Route::prefix('quotes')->group(function () {
    Route::get('/', [QuoteController::class, 'index']);
    Route::post('/create', [QuoteController::class, 'store']);
    Route::get('/{quote}', [QuoteController::class, 'show']);
    Route::post('/{quote}/items', [QuoteItemController::class, 'store']);
    Route::post('/{quote}/publish', [QuotePublishController::class, 'store']);
});

Route::put('/items/{item}', [QuoteItemController::class, 'update']);
Route::delete('/items/{item}', [QuoteItemController::class, 'destroy']);

Route::post('/documents', [DocumentController::class, 'store']);
Route::get('/documents/{document}', [DocumentController::class, 'show']);

Route::post('/documents/{document}/versions', [DocumentVersionController::class, 'store']);
