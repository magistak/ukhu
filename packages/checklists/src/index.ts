import { z } from 'zod';

export const ChecklistItemSchema = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string().optional(),
  required: z.boolean().default(false)
});

export type ChecklistItem = z.infer<typeof ChecklistItemSchema>;

export const ChecklistTemplateSchema = z.object({
  id: z.string(),
  locale: z.string(),
  title: z.string(),
  summary: z.string().optional(),
  updatedAt: z.string().optional(),
  items: z.array(ChecklistItemSchema)
});

export type ChecklistTemplate = z.infer<typeof ChecklistTemplateSchema>;

export const ChecklistInstanceSchema = ChecklistTemplateSchema.extend({
  progress: z.record(z.string(), z.boolean()).default({})
});

export type ChecklistInstance = z.infer<typeof ChecklistInstanceSchema>;

export function instantiateChecklist(
  template: ChecklistTemplate,
  initialProgress?: Partial<Record<string, boolean>>
): ChecklistInstance {
  const progress: Record<string, boolean> = {};
  for (const item of template.items) {
    progress[item.id] = Boolean(initialProgress?.[item.id]);
  }
  return {
    ...template,
    progress
  };
}

export function toggleChecklistItem(
  checklist: ChecklistInstance,
  itemId: string,
  completed: boolean
): ChecklistInstance {
  if (!checklist.items.some((item) => item.id === itemId)) {
    return checklist;
  }

  return {
    ...checklist,
    progress: {
      ...checklist.progress,
      [itemId]: completed
    }
  };
}

export function computeChecklistStats(checklist: ChecklistInstance): {
  total: number;
  completed: number;
  requiredTotal: number;
  requiredCompleted: number;
} {
  const total = checklist.items.length;
  let completed = 0;
  let requiredTotal = 0;
  let requiredCompleted = 0;

  for (const item of checklist.items) {
    const done = Boolean(checklist.progress[item.id]);
    if (done) {
      completed += 1;
    }

    if (item.required) {
      requiredTotal += 1;
      if (done) {
        requiredCompleted += 1;
      }
    }
  }

  return { total, completed, requiredTotal, requiredCompleted };
}

export function checklistCompletion(checklist: ChecklistInstance): number {
  const { total, completed } = computeChecklistStats(checklist);
  if (total === 0) {
    return 0;
  }
  return Math.round((completed / total) * 100);
}
