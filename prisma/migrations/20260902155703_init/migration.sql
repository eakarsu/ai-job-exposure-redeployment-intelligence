-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MANAGER', 'ANALYST');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'ANALYST',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "actorName" TEXT,
    "action" TEXT NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" TEXT,
    "detail" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessUnit" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "division" TEXT NOT NULL,
    "headcount" INTEGER NOT NULL,
    "annualPayroll" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BusinessUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoleExposure" (
    "id" TEXT NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "headcount" INTEGER NOT NULL,
    "exposurePct" DOUBLE PRECISION NOT NULL,
    "horizon" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "trendDirection" TEXT NOT NULL,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RoleExposure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TaskProfile" (
    "id" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "roleRef" TEXT NOT NULL,
    "shareOfTime" DOUBLE PRECISION NOT NULL,
    "automatability" TEXT NOT NULL,
    "evidence" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TaskProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScenarioModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "horizon" TEXT NOT NULL,
    "assumptions" TEXT NOT NULL,
    "headcountDelta" DOUBLE PRECISION NOT NULL,
    "costDelta" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ScenarioModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RedeploymentOption" (
    "id" TEXT NOT NULL,
    "fromRole" TEXT NOT NULL,
    "toRole" TEXT NOT NULL,
    "headcount" INTEGER NOT NULL,
    "gapSkills" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "trainingCost" DOUBLE PRECISION NOT NULL,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RedeploymentOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VacancyMatch" (
    "id" TEXT NOT NULL,
    "vacancyTitle" TEXT NOT NULL,
    "candidateRef" TEXT NOT NULL,
    "matchScore" DOUBLE PRECISION NOT NULL,
    "requiredTraining" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "hiringManager" TEXT NOT NULL,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VacancyMatch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CostComparison" (
    "id" TEXT NOT NULL,
    "scenario" TEXT NOT NULL,
    "layoffCost" DOUBLE PRECISION NOT NULL,
    "redeployCost" DOUBLE PRECISION NOT NULL,
    "netSaving" DOUBLE PRECISION NOT NULL,
    "horizon" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CostComparison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommunicationPack" (
    "id" TEXT NOT NULL,
    "audience" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "keyMessages" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "issuedOn" TIMESTAMP(3),
    "owner" TEXT NOT NULL,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CommunicationPack_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AttritionPlan" (
    "id" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "naturalAttrition" INTEGER NOT NULL,
    "hiringFreeze" INTEGER NOT NULL,
    "backfillPolicy" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AttritionPlan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SkillCheckpoint" (
    "id" TEXT NOT NULL,
    "employeeRef" TEXT NOT NULL,
    "skill" TEXT NOT NULL,
    "targetLevel" TEXT NOT NULL,
    "currentLevel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "checkDate" TIMESTAMP(3),
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SkillCheckpoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ManagerAlert" (
    "id" TEXT NOT NULL,
    "manager" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "priority" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "sentAt" TIMESTAMP(3),
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ManagerAlert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProgramMetric" (
    "id" TEXT NOT NULL,
    "metric" TEXT NOT NULL,
    "period" TEXT NOT NULL,
    "baseline" DOUBLE PRECISION NOT NULL,
    "current" DOUBLE PRECISION NOT NULL,
    "target" DOUBLE PRECISION NOT NULL,
    "status" TEXT NOT NULL,
    "unitId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProgramMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "RoleExposure" ADD CONSTRAINT "RoleExposure_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TaskProfile" ADD CONSTRAINT "TaskProfile_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScenarioModel" ADD CONSTRAINT "ScenarioModel_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RedeploymentOption" ADD CONSTRAINT "RedeploymentOption_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacancyMatch" ADD CONSTRAINT "VacancyMatch_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CostComparison" ADD CONSTRAINT "CostComparison_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommunicationPack" ADD CONSTRAINT "CommunicationPack_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AttritionPlan" ADD CONSTRAINT "AttritionPlan_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillCheckpoint" ADD CONSTRAINT "SkillCheckpoint_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ManagerAlert" ADD CONSTRAINT "ManagerAlert_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgramMetric" ADD CONSTRAINT "ProgramMetric_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "BusinessUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
