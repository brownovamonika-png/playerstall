import type { LockerTemplate } from './types';

import modelS from '../data/locker-templates/model-s.json';
import modelL from '../data/locker-templates/model-l.json';
import modelZ from '../data/locker-templates/model-z.json';
import modelX from '../data/locker-templates/model-x.json';
import varsity from '../data/locker-templates/varsity.json';
import semiPro from '../data/locker-templates/semi-pro.json';
import pro from '../data/locker-templates/pro.json';
import stadium from '../data/locker-templates/stadium.json';

const templates: LockerTemplate[] = [
  modelS as LockerTemplate,
  modelL as LockerTemplate,
  modelZ as LockerTemplate,
  modelX as LockerTemplate,
  varsity as LockerTemplate,
  semiPro as LockerTemplate,
  pro as LockerTemplate,
  stadium as LockerTemplate,
];

const byId = new Map<string, LockerTemplate>(templates.map((t) => [t.templateId, t]));

export function getAllTemplates(): LockerTemplate[] {
  return templates;
}

export function getTemplate(templateId: string): LockerTemplate | undefined {
  return byId.get(templateId);
}
