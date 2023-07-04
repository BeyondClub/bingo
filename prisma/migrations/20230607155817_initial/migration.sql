-- CreateTable
CREATE TABLE "bingo" (
    "bingo_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "wallet_address" TEXT NOT NULL,
    "token_id" DECIMAL NOT NULL,
    "score" DECIMAL NOT NULL DEFAULT 0,
    "image" TEXT,
    "campaign_id" UUID NOT NULL,
    "redraw" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "bingo_pkey" PRIMARY KEY ("bingo_id")
);

-- CreateTable
CREATE TABLE "bingo_tasks" (
    "bingo_task_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "bingo_id" UUID NOT NULL,
    "grid_number" DECIMAL NOT NULL,
    "task_name" TEXT,
    "task_status" BOOLEAN NOT NULL DEFAULT false,
    "campaign_task_id" UUID NOT NULL,
    "last_processed" TIMESTAMP(6),
    "paused_verification" BOOLEAN DEFAULT false,

    CONSTRAINT "bingo_tasks_pkey" PRIMARY KEY ("bingo_task_id")
);

-- CreateTable
CREATE TABLE "campaigns" (
    "campaign_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "network" DECIMAL NOT NULL DEFAULT 137,
    "symbol" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL DEFAULT 0,
    "currency" TEXT,
    "size" DECIMAL NOT NULL DEFAULT 5,
    "start_at" TIMESTAMPTZ(6),
    "end_at" TIMESTAMPTZ(6),
    "mint_limit" DECIMAL NOT NULL DEFAULT 1,
    "bingo_size" DECIMAL NOT NULL DEFAULT 5,
    "each_bingo" DECIMAL NOT NULL DEFAULT 1,
    "each_completion" DECIMAL NOT NULL DEFAULT 1,
    "contract_address" TEXT,
    "reset_on_transfer" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "campaigns_pkey" PRIMARY KEY ("campaign_id")
);

-- CreateTable
CREATE TABLE "campaigns_tasks" (
    "campaign_task_id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "campaign_id" UUID NOT NULL,
    "task_type" TEXT NOT NULL,
    "api_url" TEXT,
    "api_method" TEXT DEFAULT 'POST',
    "headers" TEXT,
    "req_body" TEXT,
    "response_variable" TEXT,
    "response_condition" TEXT,
    "response_value" TEXT,

    CONSTRAINT "campaigns_tasks_pkey" PRIMARY KEY ("campaign_task_id")
);

-- AddForeignKey
ALTER TABLE "bingo" ADD CONSTRAINT "bingo_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("campaign_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "bingo_tasks" ADD CONSTRAINT "bingo_tasks_bingo_id_fkey" FOREIGN KEY ("bingo_id") REFERENCES "bingo"("bingo_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "campaigns_tasks" ADD CONSTRAINT "campaigns_tasks_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "campaigns"("campaign_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
