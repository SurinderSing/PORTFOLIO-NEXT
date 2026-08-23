'use client';

import React, { useState } from 'react';
import { SkillCategoryWithSkills } from '@/types/database';
import {
  createSkillCategoryAction,
  updateSkillCategoryAction,
  deleteSkillCategoryAction,
  createSkillAction,
  deleteSkillAction,
  reorderSkillCategoriesAction,
  reorderSkillsAction,
} from '@/lib/admin-actions';
import { Plus, Code2 } from 'lucide-react';
import { reorderArray } from '@/utils/reorder';
import AdminStatusBanner, {
  AdminStatusState,
} from '@/components/admin/admin-status-banner';
import AdminPageHeader from '@/components/admin/admin-page-header';
import SkillCategoryForm from './skill-category-form';
import SkillCategoryCard from './skill-category-card';

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

  // Drag states for categories
  const [draggedCatIndex, setDraggedCatIndex] = useState<number | null>(null);
  const [dragOverCatIndex, setDragOverCatIndex] = useState<number | null>(null);

  // Drag states for skills within category
  const [draggedSkill, setDraggedSkill] = useState<{
    categoryId: number;
    index: number;
  } | null>(null);
  const [dragOverSkill, setDragOverSkill] = useState<{
    categoryId: number;
    index: number;
  } | null>(null);

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<AdminStatusState>({
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
      setStatus({ type: 'error', message: err.message || 'Failed to add.' });
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

  // Category drag handlers
  const handleCatDragStart = (e: React.DragEvent, index: number) => {
    setDraggedCatIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `cat:${index}`);
  };

  const handleCatDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    if (draggedCatIndex === null || draggedCatIndex === index) return;
    setDragOverCatIndex(index);
  };

  const handleCatDragEnd = () => {
    setDraggedCatIndex(null);
    setDragOverCatIndex(null);
  };

  const handleCatDrop = async (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedCatIndex === null || draggedCatIndex === targetIndex) {
      setDraggedCatIndex(null);
      setDragOverCatIndex(null);
      return;
    }

    const currentList = [...categories].sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );
    const updated = reorderArray(currentList, draggedCatIndex, targetIndex);

    setCategories(updated);
    setDraggedCatIndex(null);
    setDragOverCatIndex(null);
    setStatus({
      type: 'success',
      message: 'Categories reordered successfully.',
    });

    const res = await reorderSkillCategoriesAction(
      updated.map((c) => ({ id: c.id, sort_order: c.sort_order }))
    );
    if (!res.success) {
      setStatus({
        type: 'error',
        message: res.error || 'Failed to sync categories order.',
      });
    }
  };

  // Skill drag handlers within category
  const handleSkillDragStart = (
    e: React.DragEvent,
    categoryId: number,
    index: number
  ) => {
    e.stopPropagation();
    setDraggedSkill({ categoryId, index });
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', `skill:${categoryId}:${index}`);
  };

  const handleSkillDragOver = (
    e: React.DragEvent,
    categoryId: number,
    index: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    if (
      !draggedSkill ||
      draggedSkill.categoryId !== categoryId ||
      draggedSkill.index === index
    )
      return;
    setDragOverSkill({ categoryId, index });
  };

  const handleSkillDragEnd = (e: React.DragEvent) => {
    e.stopPropagation();
    setDraggedSkill(null);
    setDragOverSkill(null);
  };

  const handleSkillDrop = async (
    e: React.DragEvent,
    categoryId: number,
    targetIndex: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (
      !draggedSkill ||
      draggedSkill.categoryId !== categoryId ||
      draggedSkill.index === targetIndex
    ) {
      setDraggedSkill(null);
      setDragOverSkill(null);
      return;
    }

    const targetCategory = categories.find((c) => c.id === categoryId);
    if (!targetCategory) return;

    const currentSkills = [...targetCategory.skills].sort(
      (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
    );
    const updatedSkills = reorderArray(
      currentSkills,
      draggedSkill.index,
      targetIndex
    );

    setCategories((prev) =>
      prev.map((c) =>
        c.id === categoryId ? { ...c, skills: updatedSkills } : c
      )
    );
    setDraggedSkill(null);
    setDragOverSkill(null);
    setStatus({
      type: 'success',
      message: 'Skills reordered successfully.',
    });

    const res = await reorderSkillsAction(
      updatedSkills.map((s) => ({
        id: s.id,
        sort_order: s.sort_order || 0,
      }))
    );
    if (!res.success) {
      setStatus({
        type: 'error',
        message: res.error || 'Failed to sync skills order.',
      });
    }
  };

  const sortedCategories = [...categories].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  return (
    <div className="space-y-6">
      <AdminStatusBanner status={status} />

      <AdminPageHeader
        title="Manage Skills & Categories"
        description="Reorder categories and skills via drag and drop, or add and edit items."
        icon={Code2}
      >
        {!isCreatingCategory && editingCategory === null && (
          <button
            onClick={() => {
              setIsCreatingCategory(true);
              setCategoryName('');
              setCategoryOrder(categories.length + 1);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl main-gradient-1 text-white text-xs font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus size={15} />
            <span>Add Category</span>
          </button>
        )}
      </AdminPageHeader>

      {/* Category Create/Edit Form */}
      {(isCreatingCategory || editingCategory !== null) && (
        <SkillCategoryForm
          isCreating={isCreatingCategory}
          categoryName={categoryName}
          setCategoryName={setCategoryName}
          categoryOrder={categoryOrder}
          setCategoryOrder={setCategoryOrder}
          onSubmit={handleSaveCategory}
          onCancel={() => {
            setIsCreatingCategory(false);
            setEditingCategory(null);
          }}
          loading={loading}
        />
      )}

      {/* Categories & Skills Cards */}
      <div className="space-y-4">
        {sortedCategories.map((cat, catIndex) => {
          const isCatDragging = draggedCatIndex === catIndex;
          const isCatOver = dragOverCatIndex === catIndex;

          return (
            <SkillCategoryCard
              key={cat.id}
              category={cat}
              catIndex={catIndex}
              isCatDragging={isCatDragging}
              isCatOver={isCatOver}
              draggedSkill={draggedSkill}
              dragOverSkill={dragOverSkill}
              activeCategoryId={activeCategoryId}
              newSkillName={newSkillName}
              setNewSkillName={setNewSkillName}
              setActiveCategoryId={setActiveCategoryId}
              onCatDragStart={handleCatDragStart}
              onCatDragOver={handleCatDragOver}
              onCatDragEnd={handleCatDragEnd}
              onCatDrop={handleCatDrop}
              onSkillDragStart={handleSkillDragStart}
              onSkillDragOver={handleSkillDragOver}
              onSkillDragEnd={handleSkillDragEnd}
              onSkillDrop={handleSkillDrop}
              onEditCategory={(c) => {
                setEditingCategory(c.id);
                setCategoryName(c.name);
                setCategoryOrder(c.sort_order);
                setIsCreatingCategory(false);
              }}
              onDeleteCategory={handleDeleteCategory}
              onAddSkill={handleAddSkill}
              onDeleteSkill={handleDeleteSkill}
            />
          );
        })}
      </div>
    </div>
  );
}
