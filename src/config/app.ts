export interface PageConfig {
  label: string;
  href: string;
  description: string;
  entities: string[];
  workflows: string[];
}

export interface EntityConfig {
  name: string;
  label: string;
  fields: Array<{ name: string; kind: "string" | "number" | "boolean" | "date" }>;
}

export interface WorkflowConfig {
  slug: string;
  title: string;
  description: string;
  prompt: string;
  fields: string[];
}

export const appConfig = {
  slug: "ai-job-exposure-redeployment-intelligence",
  title: "Job Exposure & Redeployment",
  tagline: "Automation exposure analysis with redeployment-first planning",
  accent: "orange",
};

export const pages: PageConfig[] = [
  {
    label: "Exposure",
    href: "/exposure",
    description: "Role exposure and task profiles.",
    entities: ["RoleExposure", "TaskProfile", "BusinessUnit"],
    workflows: ["exposure-score"],
  },
  {
    label: "Scenarios",
    href: "/scenarios",
    description: "Three- and five-year workforce scenarios.",
    entities: ["ScenarioModel", "CostComparison", "AttritionPlan"],
    workflows: ["scenario-run"],
  },
  {
    label: "Redeployment",
    href: "/redeployment",
    description: "Redeployment options and vacancy matching.",
    entities: ["RedeploymentOption", "VacancyMatch", "SkillCheckpoint"],
    workflows: ["redeployment-match"],
  },
  {
    label: "Communication",
    href: "/communication",
    description: "Comms packs, manager alerts, program metrics.",
    entities: ["CommunicationPack", "ManagerAlert", "ProgramMetric"],
    workflows: [],
  },
];

export const entities: Record<string, EntityConfig> = {
  BusinessUnit: {
    name: "BusinessUnit",
    label: "Business Unit",
    fields: [{ name: "name", kind: "string" }, { name: "division", kind: "string" }, { name: "headcount", kind: "number" }, { name: "annualPayroll", kind: "number" }, { name: "status", kind: "string" }, { name: "location", kind: "string" }],
  },
  RoleExposure: {
    name: "RoleExposure",
    label: "Role Exposure",
    fields: [{ name: "roleTitle", kind: "string" }, { name: "headcount", kind: "number" }, { name: "exposurePct", kind: "number" }, { name: "horizon", kind: "string" }, { name: "status", kind: "string" }, { name: "trendDirection", kind: "string" }],
  },
  TaskProfile: {
    name: "TaskProfile",
    label: "Task Profile",
    fields: [{ name: "task", kind: "string" }, { name: "roleRef", kind: "string" }, { name: "shareOfTime", kind: "number" }, { name: "automatability", kind: "string" }, { name: "evidence", kind: "string" }, { name: "status", kind: "string" }],
  },
  ScenarioModel: {
    name: "ScenarioModel",
    label: "Scenario Model",
    fields: [{ name: "name", kind: "string" }, { name: "horizon", kind: "string" }, { name: "assumptions", kind: "string" }, { name: "headcountDelta", kind: "number" }, { name: "costDelta", kind: "number" }, { name: "status", kind: "string" }],
  },
  RedeploymentOption: {
    name: "RedeploymentOption",
    label: "Redeployment Option",
    fields: [{ name: "fromRole", kind: "string" }, { name: "toRole", kind: "string" }, { name: "headcount", kind: "number" }, { name: "gapSkills", kind: "string" }, { name: "status", kind: "string" }, { name: "trainingCost", kind: "number" }],
  },
  VacancyMatch: {
    name: "VacancyMatch",
    label: "Vacancy Match",
    fields: [{ name: "vacancyTitle", kind: "string" }, { name: "candidateRef", kind: "string" }, { name: "matchScore", kind: "number" }, { name: "requiredTraining", kind: "string" }, { name: "status", kind: "string" }, { name: "hiringManager", kind: "string" }],
  },
  CostComparison: {
    name: "CostComparison",
    label: "Cost Comparison",
    fields: [{ name: "scenario", kind: "string" }, { name: "layoffCost", kind: "number" }, { name: "redeployCost", kind: "number" }, { name: "netSaving", kind: "number" }, { name: "horizon", kind: "string" }, { name: "status", kind: "string" }],
  },
  CommunicationPack: {
    name: "CommunicationPack",
    label: "Communication Pack",
    fields: [{ name: "audience", kind: "string" }, { name: "title", kind: "string" }, { name: "keyMessages", kind: "string" }, { name: "status", kind: "string" }, { name: "issuedOn", kind: "date" }, { name: "owner", kind: "string" }],
  },
  AttritionPlan: {
    name: "AttritionPlan",
    label: "Attrition Plan",
    fields: [{ name: "period", kind: "string" }, { name: "naturalAttrition", kind: "number" }, { name: "hiringFreeze", kind: "number" }, { name: "backfillPolicy", kind: "string" }, { name: "status", kind: "string" }, { name: "notes", kind: "string" }],
  },
  SkillCheckpoint: {
    name: "SkillCheckpoint",
    label: "Skill Checkpoint",
    fields: [{ name: "employeeRef", kind: "string" }, { name: "skill", kind: "string" }, { name: "targetLevel", kind: "string" }, { name: "currentLevel", kind: "string" }, { name: "status", kind: "string" }, { name: "checkDate", kind: "date" }],
  },
  ManagerAlert: {
    name: "ManagerAlert",
    label: "Manager Alert",
    fields: [{ name: "manager", kind: "string" }, { name: "subject", kind: "string" }, { name: "priority", kind: "string" }, { name: "message", kind: "string" }, { name: "status", kind: "string" }, { name: "sentAt", kind: "date" }],
  },
  ProgramMetric: {
    name: "ProgramMetric",
    label: "Program Metric",
    fields: [{ name: "metric", kind: "string" }, { name: "period", kind: "string" }, { name: "baseline", kind: "number" }, { name: "current", kind: "number" }, { name: "target", kind: "number" }, { name: "status", kind: "string" }],
  },
};

export const workflows: WorkflowConfig[] = [
  {
    slug: "exposure-score",
    title: "Draft: Exposure Scorer",
    description: "Score a role's automation exposure.",
    prompt: "You are a labor-market analyst. Score the role's automation exposure from task composition; identify which tasks drive risk and which remain human-only.",
    fields: ["role", "tasks", "headcount", "industry"],
  },
  {
    slug: "scenario-run",
    title: "Draft: Scenario Modeler",
    description: "Model a three- or five-year workforce scenario.",
    prompt: "Explain a scenario using explicit headcount, attrition, salary, severance and training assumptions. Use saved deterministic results for totals; list missing inputs instead of inventing financial estimates.",
    fields: ["horizon", "assumptions", "currentHeadcount", "attritionRate"],
  },
  {
    slug: "redeployment-match",
    title: "Draft: Redeployment Matcher",
    description: "Match at-risk employees to internal vacancies.",
    prompt: "You are an internal-mobility specialist. Match the at-risk employee to suitable vacancies, listing gap skills and training plans.",
    fields: ["employeeProfile", "openVacancies", "constraints"],
  },
];

export function findPage(href: string): PageConfig | undefined {
  return pages.find((p) => p.href === href);
}
