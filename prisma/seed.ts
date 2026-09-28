// Seed script — creates demo users and realistic domain records.
import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const phones = ["(415) 555-0132", "(212) 555-0187", "(312) 555-0149", "(617) 555-0110"];
const cities = ["Chicago, IL", "Austin, TX", "Boston, MA", "Denver, CO", "Seattle, WA"];

function pick<T>(arr: T[], i: number): T { return arr[i % arr.length]; }
function amount(i: number, base = 1000): number { return Math.round((base + ((i * 7919) % 900) * base) * 100) / 100; }
function daysAgo(i: number, spread = 180): Date { return new Date(Date.now() - ((i * 37) % spread) * 86400000); }

async function main() {
  const database = new URL(process.env.DATABASE_URL || "").pathname.slice(1);
  if (process.env.NODE_ENV === "production" || process.env.ALLOW_DEMO_SEED !== "true" || !/^(demo_|inspection_test_)/.test(database)) throw new Error("Demo seeding requires ALLOW_DEMO_SEED=true and a dedicated demo_ or inspection_test_ database");
  if (!process.env.DEMO_PASSWORD || process.env.DEMO_PASSWORD.length < 16) throw new Error("Set DEMO_PASSWORD to at least 16 characters");
  const passwordHash = await bcrypt.hash(process.env.DEMO_PASSWORD!, 12);
  const demoUsers: Array<[string, string, Role]> = [
    ["admin@ai-job-exposure-redeployment-intelligence.local", "Demo Admin", "ADMIN"],
    ["manager@ai-job-exposure-redeployment-intelligence.local", "Demo Manager", "MANAGER"],
    ["analyst@ai-job-exposure-redeployment-intelligence.local", "Demo Analyst", "ANALYST"],
  ];
  for (const [email, name, role] of demoUsers) {
    await prisma.user.upsert({ where: { email }, update: {}, create: { email, name, role, passwordHash } });
  }

  const STATUSES_BusinessUnit = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.businessUnit.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.businessUnit.create({
      data: {
      name: `Name ${String(i + 1).padStart(3, "0")}`,
      division: `Division ${String(i + 1).padStart(3, "0")}`,
      headcount: 5 + ((i * 13) % 95),
      annualPayroll: amount(i, 250),
      status: pick(STATUSES_BusinessUnit, i),
      location: `Location ${String(i + 1).padStart(3, "0")}`
      },
    });
  }

  const businessUnitRefs = await prisma.businessUnit.findMany({ select: { id: true } });

  const STATUSES_RoleExposure = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.roleExposure.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.roleExposure.create({
      data: {
      roleTitle: `RoleTitle ${String(i + 1).padStart(3, "0")}`,
      headcount: 5 + ((i * 13) % 95),
      exposurePct: amount(i, 250),
      horizon: `Horizon ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_RoleExposure, i),
      trendDirection: `TrendDirection ${String(i + 1).padStart(3, "0")}`,
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_TaskProfile = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.taskProfile.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.taskProfile.create({
      data: {
      task: `Task ${String(i + 1).padStart(3, "0")}`,
      roleRef: `RoleRef ${String(i + 1).padStart(3, "0")}`,
      shareOfTime: amount(i, 250),
      automatability: `Automatability ${String(i + 1).padStart(3, "0")}`,
      evidence: `Evidence ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_TaskProfile, i),
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_ScenarioModel = ["DRAFT", "ACTIVE", "ADOPTED"];
  await prisma.scenarioModel.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.scenarioModel.create({
      data: {
      name: `Name ${String(i + 1).padStart(3, "0")}`,
      horizon: `Horizon ${String(i + 1).padStart(3, "0")}`,
      assumptions: `Assumptions ${String(i + 1).padStart(3, "0")}`,
      headcountDelta: amount(i, 250),
      costDelta: amount(i, 250),
      status: pick(STATUSES_ScenarioModel, i),
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_RedeploymentOption = ["IDENTIFIED", "FEASIBLE", "OFFERED", "PLACED"];
  await prisma.redeploymentOption.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.redeploymentOption.create({
      data: {
      fromRole: `FromRole ${String(i + 1).padStart(3, "0")}`,
      toRole: `ToRole ${String(i + 1).padStart(3, "0")}`,
      headcount: 5 + ((i * 13) % 95),
      gapSkills: `GapSkills ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_RedeploymentOption, i),
      trainingCost: amount(i, 250),
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_VacancyMatch = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.vacancyMatch.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.vacancyMatch.create({
      data: {
      vacancyTitle: `VacancyTitle ${String(i + 1).padStart(3, "0")}`,
      candidateRef: `CandidateRef ${String(i + 1).padStart(3, "0")}`,
      matchScore: amount(i, 250),
      requiredTraining: `RequiredTraining ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_VacancyMatch, i),
      hiringManager: `HiringManager ${String(i + 1).padStart(3, "0")}`,
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_CostComparison = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.costComparison.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.costComparison.create({
      data: {
      scenario: `Scenario ${String(i + 1).padStart(3, "0")}`,
      layoffCost: amount(i, 250),
      redeployCost: amount(i, 250),
      netSaving: amount(i, 250),
      horizon: `Horizon ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_CostComparison, i),
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_CommunicationPack = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.communicationPack.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.communicationPack.create({
      data: {
      audience: `Audience ${String(i + 1).padStart(3, "0")}`,
      title: `Title ${String(i + 1).padStart(3, "0")}`,
      keyMessages: `KeyMessages ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_CommunicationPack, i),
      issuedOn: daysAgo(i),
      owner: `Owner ${String(i + 1).padStart(3, "0")}`,
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_AttritionPlan = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.attritionPlan.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.attritionPlan.create({
      data: {
      period: `Period ${String(i + 1).padStart(3, "0")}`,
      naturalAttrition: 5 + ((i * 13) % 95),
      hiringFreeze: 5 + ((i * 13) % 95),
      backfillPolicy: `BackfillPolicy ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_AttritionPlan, i),
      notes: `Notes ${String(i + 1).padStart(3, "0")}`,
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_SkillCheckpoint = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.skillCheckpoint.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.skillCheckpoint.create({
      data: {
      employeeRef: `EmployeeRef ${String(i + 1).padStart(3, "0")}`,
      skill: `Skill ${String(i + 1).padStart(3, "0")}`,
      targetLevel: `TargetLevel ${String(i + 1).padStart(3, "0")}`,
      currentLevel: `CurrentLevel ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_SkillCheckpoint, i),
      checkDate: daysAgo(i),
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_ManagerAlert = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.managerAlert.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.managerAlert.create({
      data: {
      manager: `Manager ${String(i + 1).padStart(3, "0")}`,
      subject: `Subject ${String(i + 1).padStart(3, "0")}`,
      priority: `Priority ${String(i + 1).padStart(3, "0")}`,
      message: `Message ${String(i + 1).padStart(3, "0")}`,
      status: pick(STATUSES_ManagerAlert, i),
      sentAt: daysAgo(i),
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  const STATUSES_ProgramMetric = ["OPEN", "IN_REVIEW", "APPROVED", "CLOSED"];
  await prisma.programMetric.deleteMany();
  for (let i = 0; i < 25; i++) {
    await prisma.programMetric.create({
      data: {
      metric: `Metric ${String(i + 1).padStart(3, "0")}`,
      period: `Period ${String(i + 1).padStart(3, "0")}`,
      baseline: amount(i, 250),
      current: amount(i, 250),
      target: amount(i, 250),
      status: pick(STATUSES_ProgramMetric, i),
      unit: { connect: { id: businessUnitRefs[i % businessUnitRefs.length].id } }
      },
    });
  }

  await prisma.auditLog.create({ data: { actorName: "Seeder", action: "SEED", entity: "system", detail: "Demo dataset created" } });

  console.log("Seeded demo users and domain records.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(async () => { await prisma.$disconnect(); });
