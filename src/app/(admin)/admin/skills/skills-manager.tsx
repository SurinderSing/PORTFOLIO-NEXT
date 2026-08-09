'use client';

import React, { useState } from 'react';
import { SkillCategoryWithSkills } from '@/types/database';
import {
  createSkillCategoryAction,
  updateSkillCategoryAction,
  deleteSkillCategoryAction,
  createSkillAction,
  deleteSkillAction,
} from '@/lib/admin-actions';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Code2,
  X,
  Tag,
} from 'lucide-react';

interface SkillsManagerProps {
  initialCategories: SkillCategoryWithSkills[];
}

export default function SkillsManager({
  initialCategories,
}: SkillsManagerProps) {
  const [categories, setCategories] =
    useState<SkillCategoryWithSkills[]>(initialCategories);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryOrder, setCategoryOrder] = useState(0);

  // Adding skill state
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [newSkillName, setNewSkillName] = useState('');

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({
    type: null,
    message: '',
  });

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      if (isCreatingCategory) {
        const res = await createSkillCategoryAction({
          name: categoryName,
          sort_order: Number(categoryOrder),
        });
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Category created successfully.',
          });
          setIsCreatingCategory(false);
          setCategories((prev) => [
            ...prev,
            {
              id: Date.now(),
              name: categoryName,
              sort_order: Number(categoryOrder),
              skills: [],
            },
          ]);
        } else {
          setStatus({
            type: 'error',
            message: res.error || 'Failed to create.',
          });
        }
      } else if (editingCategory !== null) {
        const res = await updateSkillCategoryAction(editingCategory, {
          name: categoryName,
          sort_order: Number(categoryOrder),
        });
        if (res.success) {
          setStatus({
            type: 'success',
            message: 'Category updated successfully.',
          });
          setEditingCategory(null);
          setCategories((prev) =>
            prev.map((cat) =>
              cat.id === editingCategory
                ? {
                    ...cat,
                    name: categoryName,
                    sort_order: Number(categoryOrder),
                  }
                : cat
            )
          );
        } else {
          setStatus({
            type: 'error',
            message: res.error || 'Failed to update.',
          });
        }
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'An error occurred.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (
      !confirm(
        'Are you sure you want to delete this category and all its skills?'
      )
    )
      return;
    setLoading(true);
    try {
      const res = await deleteSkillCategoryAction(id);
      if (res.success) {
        setCategories((prev) => prev.filter((c) => c.id !== id));
        setStatus({
          type: 'success',
          message: 'Category deleted successfully.',
        });
      } else {
        setStatus({ type: 'error', message: res.error || 'Failed to delete.' });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to delete.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAddSkill = async (categoryId: number) => {
    if (!newSkillName.trim()) return;
    setLoading(true);
    setStatus({ type: null, message: '' });

    try {
      const category = categories.find((c) => c.id === categoryId);
      const nextOrder = (category?.skills.length || 0) + 1;
      const res = await createSkillAction({
        category_id: categoryId,
        name: newSkillName.trim(),
        sort_order: nextOrder,
      });

      if (res.success) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  skills: [
                    ...cat.skills,
                    {
                      id: Date.now(),
                      category_id: categoryId,
                      name: newSkillName.trim(),
                      sort_order: nextOrder,
                    },
                  ],
                }
              : cat
          )
        );
        setNewSkillName('');
        setActiveCategoryId(null);
        setStatus({ type: 'success', message: 'Skill added.' });
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to add skill.',
        });
      }
    } catch (err: any) {
      setStatus({
        type: 'error',
        message: err.message || 'Error adding skill.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSkill = async (skillId: number, categoryId: number) => {
    setLoading(true);
    try {
      const res = await deleteSkillAction(skillId);
      if (res.success) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === categoryId
              ? { ...cat, skills: cat.skills.filter((s) => s.id !== skillId) }
              : cat
          )
        );
        setStatus({ type: 'success', message: 'Skill deleted.' });
      } else {
        setStatus({
          type: 'error',
          message: res.error || 'Failed to delete skill.',
        });
      }
    } catch (err: any) {
      setStatus({ type: 'error', message: err.message || 'Failed to delete.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {status.type && (
        <div
          className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
            status.type === 'success'
              ? 'bg-green-500/10 text-green-600 border border-green-500/20'
              : 'bg-red-500/10 text-red-600 border border-red-500/20'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 size={18} />
          ) : (
            <AlertCircle size={18} />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold font-poppins flex items-center gap-2">
            <Code2 size={20} className="text-primary" />
            <span>Manage Skills & Categories</span>
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            Organize skills by categories (e.g. Frontend Skills, Component
            Libraries, Backend & Databases)
          </p>
        </div>

        {!isCreatingCategory && editingCategory === null && (
          <button
            onClick={() => {
              setIsCreatingCategory(true);
              setCategoryName('');
              setCategoryOrder(categories.length + 1);
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full main-gradient-1 text-white text-xs font-semibold shadow-md hover:opacity-90 transition-opacity"
          >
            <Plus size={14} />
            <span>Add Category</span>
          </button>
        )}
      </div>

      {/* Category Create/Edit Form */}
      {(isCreatingCategory || editingCategory !== null) && (
        <form
          onSubmit={handleSaveCategory}
          className="p-6 rounded-2xl bg-card border border-primary/40 space-y-4 shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold font-poppins text-primary">
              {isCreatingCategory
                ? 'Add Skill Category'
                : 'Edit Skill Category'}
            </h3>
            <button
              type="button"
              onClick={() => {
                setIsCreatingCategory(false);
                setEditingCategory(null);
              }}
              className="p-1 rounded-lg text-muted-foreground hover:bg-tertiary"
            >
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Category Name
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                required
                placeholder="e.g. Frontend Skills, Cloud & DevOps"
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1 text-muted-foreground">
                Sort Order
              </label>
              <input
                type="number"
                value={categoryOrder}
                onChange={(e) =>
                  setCategoryOrder(parseInt(e.target.value) || 0)
                }
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:border-primary outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsCreatingCategory(false);
                setEditingCategory(null);
              }}
              className="px-4 py-2 rounded-full border border-border text-xs font-medium hover:bg-tertiary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-full main-gradient-1 text-white text-xs font-semibold hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Category'}
            </button>
          </div>
        </form>
      )}

      {/* Categories & Skills Cards */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-5 rounded-2xl bg-card border border-border space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Tag size={16} className="text-primary" />
                <h3 className="text-base font-semibold font-poppins">
                  {cat.name}
                </h3>
                <span className="text-xs text-muted-foreground">
                  (Order: {cat.sort_order})
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setEditingCategory(cat.id);
                    setCategoryName(cat.name);
                    setCategoryOrder(cat.sort_order);
                    setIsCreatingCategory(false);
                  }}
                  className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
                  title="Edit Category"
                >
                  <Edit2 size={14} />
                </button>
                <button
                  onClick={() => handleDeleteCategory(cat.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Delete Category"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Skills chips */}
            <div className="flex flex-wrap items-center gap-2">
              {cat.skills.map((skill) => (
                <div
                  key={skill.id}
                  className="group inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-background border border-border text-xs font-medium"
                >
                  <span>{skill.name}</span>
                  <button
                    onClick={() => handleDeleteSkill(skill.id, cat.id)}
                    className="opacity-40 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity"
                    title="Remove skill"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}

              {/* Add skill inline */}
              {activeCategoryId === cat.id ? (
                <div className="inline-flex items-center gap-2">
                  <input
                    type="text"
                    value={newSkillName}
                    onChange={(e) => setNewSkillName(e.target.value)}
                    placeholder="Skill name..."
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(cat.id);
                      } else if (e.key === 'Escape') {
                        setActiveCategoryId(null);
                      }
                    }}
                    className="px-2.5 py-1 text-xs rounded-lg bg-background border border-primary outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(cat.id)}
                    className="px-2 py-1 rounded-lg main-gradient-1 text-white text-xs font-semibold"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveCategoryId(null)}
                    className="p-1 text-muted-foreground hover:text-foreground"
                  >
                    <X size={14} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategoryId(cat.id);
                    setNewSkillName('');
                  }}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-border hover:border-primary text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Plus size={12} />
                  <span>Add Skill</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
