import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\ExpenseController::getDashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
export const getDashboardStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDashboardStats.url(options),
    method: 'get',
})

getDashboardStats.definition = {
    methods: ["get","head"],
    url: '/api/dashboard-stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExpenseController::getDashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
getDashboardStats.url = (options?: RouteQueryOptions) => {
    return getDashboardStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::getDashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
getDashboardStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getDashboardStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExpenseController::getDashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
getDashboardStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getDashboardStats.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ExpenseController::getDashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
    const getDashboardStatsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getDashboardStats.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::getDashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
        getDashboardStatsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDashboardStats.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ExpenseController::getDashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
        getDashboardStatsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getDashboardStats.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getDashboardStats.form = getDashboardStatsForm
/**
* @see \App\Http\Controllers\ExpenseController::index
 * @see app/Http/Controllers/ExpenseController.php:23
 * @route '/expenses'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/expenses',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExpenseController::index
 * @see app/Http/Controllers/ExpenseController.php:23
 * @route '/expenses'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::index
 * @see app/Http/Controllers/ExpenseController.php:23
 * @route '/expenses'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExpenseController::index
 * @see app/Http/Controllers/ExpenseController.php:23
 * @route '/expenses'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ExpenseController::index
 * @see app/Http/Controllers/ExpenseController.php:23
 * @route '/expenses'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::index
 * @see app/Http/Controllers/ExpenseController.php:23
 * @route '/expenses'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ExpenseController::index
 * @see app/Http/Controllers/ExpenseController.php:23
 * @route '/expenses'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ExpenseController::create
 * @see app/Http/Controllers/ExpenseController.php:82
 * @route '/expenses/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/expenses/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExpenseController::create
 * @see app/Http/Controllers/ExpenseController.php:82
 * @route '/expenses/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::create
 * @see app/Http/Controllers/ExpenseController.php:82
 * @route '/expenses/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExpenseController::create
 * @see app/Http/Controllers/ExpenseController.php:82
 * @route '/expenses/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ExpenseController::create
 * @see app/Http/Controllers/ExpenseController.php:82
 * @route '/expenses/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::create
 * @see app/Http/Controllers/ExpenseController.php:82
 * @route '/expenses/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ExpenseController::create
 * @see app/Http/Controllers/ExpenseController.php:82
 * @route '/expenses/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\ExpenseController::store
 * @see app/Http/Controllers/ExpenseController.php:94
 * @route '/expenses'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/expenses',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ExpenseController::store
 * @see app/Http/Controllers/ExpenseController.php:94
 * @route '/expenses'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::store
 * @see app/Http/Controllers/ExpenseController.php:94
 * @route '/expenses'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ExpenseController::store
 * @see app/Http/Controllers/ExpenseController.php:94
 * @route '/expenses'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::store
 * @see app/Http/Controllers/ExpenseController.php:94
 * @route '/expenses'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ExpenseController::show
 * @see app/Http/Controllers/ExpenseController.php:0
 * @route '/expenses/{expense}'
 */
export const show = (args: { expense: string | number } | [expense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/expenses/{expense}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExpenseController::show
 * @see app/Http/Controllers/ExpenseController.php:0
 * @route '/expenses/{expense}'
 */
show.url = (args: { expense: string | number } | [expense: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    expense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        expense: args.expense,
                }

    return show.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::show
 * @see app/Http/Controllers/ExpenseController.php:0
 * @route '/expenses/{expense}'
 */
show.get = (args: { expense: string | number } | [expense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExpenseController::show
 * @see app/Http/Controllers/ExpenseController.php:0
 * @route '/expenses/{expense}'
 */
show.head = (args: { expense: string | number } | [expense: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ExpenseController::show
 * @see app/Http/Controllers/ExpenseController.php:0
 * @route '/expenses/{expense}'
 */
    const showForm = (args: { expense: string | number } | [expense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::show
 * @see app/Http/Controllers/ExpenseController.php:0
 * @route '/expenses/{expense}'
 */
        showForm.get = (args: { expense: string | number } | [expense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ExpenseController::show
 * @see app/Http/Controllers/ExpenseController.php:0
 * @route '/expenses/{expense}'
 */
        showForm.head = (args: { expense: string | number } | [expense: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\ExpenseController::edit
 * @see app/Http/Controllers/ExpenseController.php:123
 * @route '/expenses/{expense}/edit'
 */
export const edit = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/expenses/{expense}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExpenseController::edit
 * @see app/Http/Controllers/ExpenseController.php:123
 * @route '/expenses/{expense}/edit'
 */
edit.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { expense: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    expense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        expense: typeof args.expense === 'object'
                ? args.expense.id
                : args.expense,
                }

    return edit.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::edit
 * @see app/Http/Controllers/ExpenseController.php:123
 * @route '/expenses/{expense}/edit'
 */
edit.get = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExpenseController::edit
 * @see app/Http/Controllers/ExpenseController.php:123
 * @route '/expenses/{expense}/edit'
 */
edit.head = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ExpenseController::edit
 * @see app/Http/Controllers/ExpenseController.php:123
 * @route '/expenses/{expense}/edit'
 */
    const editForm = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::edit
 * @see app/Http/Controllers/ExpenseController.php:123
 * @route '/expenses/{expense}/edit'
 */
        editForm.get = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ExpenseController::edit
 * @see app/Http/Controllers/ExpenseController.php:123
 * @route '/expenses/{expense}/edit'
 */
        editForm.head = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\ExpenseController::update
 * @see app/Http/Controllers/ExpenseController.php:138
 * @route '/expenses/{expense}'
 */
export const update = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/expenses/{expense}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\ExpenseController::update
 * @see app/Http/Controllers/ExpenseController.php:138
 * @route '/expenses/{expense}'
 */
update.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { expense: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    expense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        expense: typeof args.expense === 'object'
                ? args.expense.id
                : args.expense,
                }

    return update.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::update
 * @see app/Http/Controllers/ExpenseController.php:138
 * @route '/expenses/{expense}'
 */
update.put = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\ExpenseController::update
 * @see app/Http/Controllers/ExpenseController.php:138
 * @route '/expenses/{expense}'
 */
update.patch = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\ExpenseController::update
 * @see app/Http/Controllers/ExpenseController.php:138
 * @route '/expenses/{expense}'
 */
    const updateForm = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::update
 * @see app/Http/Controllers/ExpenseController.php:138
 * @route '/expenses/{expense}'
 */
        updateForm.put = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\ExpenseController::update
 * @see app/Http/Controllers/ExpenseController.php:138
 * @route '/expenses/{expense}'
 */
        updateForm.patch = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ExpenseController::destroy
 * @see app/Http/Controllers/ExpenseController.php:178
 * @route '/expenses/{expense}'
 */
export const destroy = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/expenses/{expense}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ExpenseController::destroy
 * @see app/Http/Controllers/ExpenseController.php:178
 * @route '/expenses/{expense}'
 */
destroy.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { expense: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    expense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        expense: typeof args.expense === 'object'
                ? args.expense.id
                : args.expense,
                }

    return destroy.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::destroy
 * @see app/Http/Controllers/ExpenseController.php:178
 * @route '/expenses/{expense}'
 */
destroy.delete = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ExpenseController::destroy
 * @see app/Http/Controllers/ExpenseController.php:178
 * @route '/expenses/{expense}'
 */
    const destroyForm = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::destroy
 * @see app/Http/Controllers/ExpenseController.php:178
 * @route '/expenses/{expense}'
 */
        destroyForm.delete = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\ExpenseController::togglePaid
 * @see app/Http/Controllers/ExpenseController.php:164
 * @route '/expenses/{expense}/toggle-paid'
 */
export const togglePaid = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePaid.url(args, options),
    method: 'post',
})

togglePaid.definition = {
    methods: ["post"],
    url: '/expenses/{expense}/toggle-paid',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ExpenseController::togglePaid
 * @see app/Http/Controllers/ExpenseController.php:164
 * @route '/expenses/{expense}/toggle-paid'
 */
togglePaid.url = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { expense: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { expense: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    expense: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        expense: typeof args.expense === 'object'
                ? args.expense.id
                : args.expense,
                }

    return togglePaid.definition.url
            .replace('{expense}', parsedArgs.expense.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::togglePaid
 * @see app/Http/Controllers/ExpenseController.php:164
 * @route '/expenses/{expense}/toggle-paid'
 */
togglePaid.post = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: togglePaid.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ExpenseController::togglePaid
 * @see app/Http/Controllers/ExpenseController.php:164
 * @route '/expenses/{expense}/toggle-paid'
 */
    const togglePaidForm = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: togglePaid.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ExpenseController::togglePaid
 * @see app/Http/Controllers/ExpenseController.php:164
 * @route '/expenses/{expense}/toggle-paid'
 */
        togglePaidForm.post = (args: { expense: number | { id: number } } | [expense: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: togglePaid.url(args, options),
            method: 'post',
        })
    
    togglePaid.form = togglePaidForm
const ExpenseController = { getDashboardStats, index, create, store, show, edit, update, destroy, togglePaid }

export default ExpenseController