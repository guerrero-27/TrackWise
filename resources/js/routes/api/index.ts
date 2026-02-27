import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ExpenseController::dashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
export const dashboardStats = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboardStats.url(options),
    method: 'get',
})

dashboardStats.definition = {
    methods: ["get","head"],
    url: '/api/dashboard-stats',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ExpenseController::dashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
dashboardStats.url = (options?: RouteQueryOptions) => {
    return dashboardStats.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ExpenseController::dashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
dashboardStats.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboardStats.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ExpenseController::dashboardStats
 * @see app/Http/Controllers/ExpenseController.php:190
 * @route '/api/dashboard-stats'
 */
dashboardStats.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboardStats.url(options),
    method: 'head',
})
const api = {
    dashboardStats: Object.assign(dashboardStats, dashboardStats),
}

export default api