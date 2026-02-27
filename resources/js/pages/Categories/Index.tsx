import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Plus, Trash2, Edit2 } from 'lucide-react';

interface Props {
    categories: Array<{
        id: number;
        name: string;
        color: string;
        icon: string | null;
    }>;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: '#',
    },
];

const COLORS = [
    '#6366F1', '#8B5CF6', '#EC4899', '#F59E0B',
    '#10B981', '#3B82F6', '#06B6D4', '#EF4444',
    '#F97316', '#14B8A6',
];

export default function CategoriesIndex({ categories }: Props) {
    const [isCreating, setIsCreating] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    const createForm = useForm({
        name: '',
        color: COLORS[0],
        icon: '',
    });

    const editForm = useForm({
        name: '',
        color: COLORS[0],
        icon: '',
    });

    const handleCreateSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createForm.post('/categories', {
            onSuccess: () => {
                createForm.reset();
                setIsCreating(false);
            },
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        editForm.patch(`/categories/${editingId}`, {
            onSuccess: () => {
                editForm.reset();
                setEditingId(null);
            },
        });
    };

    const handleEdit = (category: any) => {
        editForm.setData({
            name: category.name,
            color: category.color,
            icon: category.icon || '',
        });
        setEditingId(category.id);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `/categories/${id}`;
            form.innerHTML = `
                <input type="hidden" name="_token" value="${document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')}">
                <input type="hidden" name="_method" value="DELETE">
            `;
            document.body.appendChild(form);
            form.submit();
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="py-6">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
                    {/* Page Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Categories</h1>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">Manage your expense categories</p>
                    </div>

                    {/* Create Category Form */}
                    {isCreating && (
                        <form onSubmit={handleCreateSubmit} className="mb-8 rounded-lg bg-white dark:bg-gray-800 p-6 shadow">
                            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Create New Category</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        value={createForm.data.name}
                                        onChange={(e) => createForm.setData('name', e.target.value)}
                                        className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-700 dark:text-white"
                                        placeholder="e.g., Groceries, Utilities"
                                        maxLength={255}
                                    />
                                    {createForm.errors.name && <p className="mt-1 text-sm text-red-600">{createForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        {COLORS.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => createForm.setData('color', color)}
                                                className={`h-10 w-10 rounded-lg border-2 ${
                                                    createForm.data.color === color ? 'border-gray-900 dark:border-white' : 'border-gray-300'
                                                }`}
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={createForm.processing}
                                        className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {createForm.processing ? 'Creating...' : 'Create Category'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsCreating(false);
                                            createForm.reset();
                                        }}
                                        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Edit Category Form */}
                    {editingId && (
                        <form onSubmit={handleEditSubmit} className="mb-8 rounded-lg bg-white dark:bg-gray-800 p-6 shadow">
                            <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">Edit Category</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input
                                        type="text"
                                        value={editForm.data.name}
                                        onChange={(e) => editForm.setData('name', e.target.value)}
                                        className="mt-2 block w-full rounded-lg border border-gray-300 dark:border-gray-600 px-4 py-2 dark:bg-gray-700 dark:text-white"
                                        placeholder="e.g., Groceries, Utilities"
                                        maxLength={255}
                                    />
                                    {editForm.errors.name && <p className="mt-1 text-sm text-red-600">{editForm.errors.name}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900 dark:text-white">Color</label>
                                    <div className="mt-2 flex gap-2 flex-wrap">
                                        {COLORS.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => editForm.setData('color', color)}
                                                className={`h-10 w-10 rounded-lg border-2 ${
                                                    editForm.data.color === color ? 'border-gray-900 dark:border-white' : 'border-gray-300'
                                                }`}
                                                style={{ backgroundColor: color }}
                                                title={color}
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4">
                                    <button
                                        type="submit"
                                        disabled={editForm.processing}
                                        className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                                    >
                                        {editForm.processing ? 'Updating...' : 'Update Category'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setEditingId(null);
                                            editForm.reset();
                                        }}
                                        className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-white"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}

                    {/* Categories List */}
                    <div className="space-y-4">
                        {categories.length > 0 ? (
                            categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between rounded-lg bg-white dark:bg-gray-800 p-4 shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="h-12 w-12 rounded-lg"
                                            style={{ backgroundColor: category.color }}
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">{category.color}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(category)}
                                            className="rounded bg-blue-100 dark:bg-blue-900 p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800"
                                        >
                                            <Edit2 className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(category.id)}
                                            className="rounded bg-red-100 dark:bg-red-900 p-2 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-800"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="rounded-lg bg-white dark:bg-gray-800 p-6 text-center shadow">
                                <p className="text-gray-600 dark:text-gray-400">No categories yet. Create your first category!</p>
                                {!isCreating && (
                                    <button
                                        onClick={() => setIsCreating(true)}
                                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                                    >
                                        <Plus className="h-5 w-5" />
                                        Create Category
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Create Category Button */}
                    {!isCreating && categories.length > 0 && (
                        <div className="mt-8">
                            <button
                                onClick={() => setIsCreating(true)}
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                            >
                                <Plus className="h-5 w-5" />
                                Create Category
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
