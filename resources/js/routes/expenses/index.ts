import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
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
const expenses = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
togglePaid: Object.assign(togglePaid, togglePaid),
}

export default expenses