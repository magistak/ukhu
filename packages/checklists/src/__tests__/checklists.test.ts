import { describe, expect, it } from 'vitest';
import {
  instantiateChecklist,
  toggleChecklistItem,
  checklistCompletion,
  type ChecklistTemplate
} from '@ukhu/checklists';

const template: ChecklistTemplate = {
  id: 'template-1',
  locale: 'en',
  title: 'Test',
  summary: 'Summary',
  items: [
    { id: 'one', label: 'First', required: true },
    { id: 'two', label: 'Second', required: false }
  ]
};

describe('checklists helpers', () => {
  it('instantiates checklist with default progress', () => {
    const checklist = instantiateChecklist(template);
    expect(checklist.progress).toEqual({ one: false, two: false });
  });

  it('toggles item state and computes completion', () => {
    const checklist = instantiateChecklist(template);
    const updated = toggleChecklistItem(checklist, 'one', true);
    expect(updated.progress.one).toBe(true);
    expect(checklistCompletion(updated)).toBe(50);
  });
});
