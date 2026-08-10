'use client';

import React from 'react';
import { SkillCategoryWithSkills } from '@/types/database';
import { Edit2, Trash2, Tag, GripVertical, Plus, X } from 'lucide-react';

interface SkillCategoryCardProps {
  category: SkillCategoryWithSkills;
  catIndex: number;
  isCatDragging: boolean;
  isCatOver: boolean;
  draggedSkill: { categoryId: number; index: number } | null;
  dragOverSkill: { categoryId: number; index: number } | null;
  activeCategoryId: number | null;
  newSkillName: string;
  setNewSkillName: (_val: string) => void;
  setActiveCategoryId: (_val: number | null) => void;
  onCatDragStart: (_e: React.DragEvent, _index: number) => void;
  onCatDragOver: (_e: React.DragEvent, _index: number) => void;
  onCatDragEnd: () => void;
  onCatDrop: (_e: React.DragEvent, _index: number) => void;
  onSkillDragStart: (
    _e: React.DragEvent,
    _categoryId: number,
    _index: number
  ) => void;
  onSkillDragOver: (
    _e: React.DragEvent,
    _categoryId: number,
    _index: number
  ) => void;
  onSkillDragEnd: (_e: React.DragEvent) => void;
  onSkillDrop: (
    _e: React.DragEvent,
    _categoryId: number,
    _index: number
  ) => void;
  onEditCategory: (_cat: SkillCategoryWithSkills) => void;
  onDeleteCategory: (_id: number) => void;
  onAddSkill: (_categoryId: number) => void;
  onDeleteSkill: (_skillId: number, _categoryId: number) => void;
}

export default function SkillCategoryCard({
  category,
  catIndex,
  isCatDragging,
  isCatOver,
  draggedSkill,
  dragOverSkill,
  activeCategoryId,
  newSkillName,
  setNewSkillName,
  setActiveCategoryId,
  onCatDragStart,
  onCatDragOver,
  onCatDragEnd,
  onCatDrop,
  onSkillDragStart,
  onSkillDragOver,
  onSkillDragEnd,
  onSkillDrop,
  onEditCategory,
  onDeleteCategory,
  onAddSkill,
  onDeleteSkill,
}: SkillCategoryCardProps) {
  const sortedSkills = [...category.skills].sort(
    (a, b) => (a.sort_order || 0) - (b.sort_order || 0)
  );

  return (
    <div
      draggable
      onDragStart={(e) => onCatDragStart(e, catIndex)}
      onDragOver={(e) => onCatDragOver(e, catIndex)}
      onDragEnd={onCatDragEnd}
      onDrop={(e) => onCatDrop(e, catIndex)}
      className={`p-5 rounded-2xl bg-card border transition-all space-y-4 shadow-sm ${
        isCatDragging
          ? 'opacity-40 border-primary/40 bg-primary/5'
          : isCatOver
            ? 'border-primary border-t-2 bg-primary/10'
            : 'border-border'
      }`}
    >
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-2">
          <div className="cursor-grab active:cursor-grabbing text-muted-foreground/50 hover:text-foreground">
            <GripVertical size={16} />
          </div>
          <Tag size={16} className="text-primary" />
          <h3 className="text-base font-semibold font-poppins">
            {category.name}
          </h3>
          <span className="px-2 py-0.5 rounded-md bg-tertiary text-xs font-mono text-muted-foreground">
            Order: {category.sort_order}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onEditCategory(category)}
            className="p-1.5 rounded-lg text-primary hover:bg-primary/10 transition-colors"
            title="Edit Category"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDeleteCategory(category.id)}
            className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
            title="Delete Category"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      {/* Skills chips with drag reordering */}
      <div className="flex flex-wrap items-center gap-2">
        {sortedSkills.map((skill, skillIndex) => {
          const isSkillDragging =
            draggedSkill?.categoryId === category.id &&
            draggedSkill.index === skillIndex;
          const isSkillOver =
            dragOverSkill?.categoryId === category.id &&
            dragOverSkill.index === skillIndex;

          return (
            <div
              key={skill.id}
              draggable
              onDragStart={(e) => onSkillDragStart(e, category.id, skillIndex)}
              onDragOver={(e) => onSkillDragOver(e, category.id, skillIndex)}
              onDragEnd={onSkillDragEnd}
              onDrop={(e) => onSkillDrop(e, category.id, skillIndex)}
              className={`group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-tertiary border transition-all text-xs font-medium cursor-grab active:cursor-grabbing ${
                isSkillDragging
                  ? 'opacity-40 border-primary'
                  : isSkillOver
                    ? 'border-primary bg-primary/15 scale-105'
                    : 'border-border hover:border-primary/50'
              }`}
            >
              <GripVertical
                size={12}
                className="text-muted-foreground/40 group-hover:text-foreground"
              />
              <span>{skill.name}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteSkill(skill.id, category.id);
                }}
                className="opacity-40 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-opacity ml-1"
                title="Remove skill"
              >
                <X size={12} />
              </button>
            </div>
          );
        })}

        {/* Add skill inline */}
        {activeCategoryId === category.id ? (
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
                  onAddSkill(category.id);
                } else if (e.key === 'Escape') {
                  setActiveCategoryId(null);
                }
              }}
              className="px-3 py-1 text-xs rounded-xl bg-tertiary border border-primary outline-none"
            />
            <button
              type="button"
              onClick={() => onAddSkill(category.id)}
              className="px-3 py-1 rounded-xl main-gradient-1 text-white text-xs font-semibold"
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
              setActiveCategoryId(category.id);
              setNewSkillName('');
            }}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-dashed border-border hover:border-primary text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            <Plus size={13} />
            <span>Add Skill</span>
          </button>
        )}
      </div>
    </div>
  );
}
