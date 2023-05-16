-- Create campaigns table
CREATE TABLE campaigns (
campaign_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
name TEXT NOT NULL,
network NUMERIC NOT NULL DEFAULT 137,
symbol TEXT NOT NULL,
description TEXT,
price NUMERIC DEFAULT 0,
currency TEXT DEFAULT NULL,
size NUMERIC NOT NULL DEFAULT 5,
start_at TIMESTAMPTZ,
end_at TIMESTAMPTZ,
mint_limit NUMERIC NOT NULL DEFAULT 1,
bingo_size NUMERIC NOT NULL DEFAULT 5,
each_bingo NUMERIC NOT NULL DEFAULT 1,
each_completion NUMERIC NOT NULL DEFAULT 1
);

-- Create campaigns_tasks table
CREATE TABLE campaigns_tasks (
campaign_task_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
campaign_id UUID NOT NULL,
task_type TEXT NOT NULL,
task_config JSONB DEFAULT '{}',
FOREIGN KEY (campaign_id) REFERENCES campaigns (campaign_id)
);

-- Create bingo table
CREATE TABLE bingo (
bingo_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
wallet_address TEXT NOT NULL,
token_id NUMERIC NOT NULL,
score NUMERIC NOT NULL DEFAULT 0,
image TEXT,
campaign_id UUID NOT NULL,
FOREIGN KEY (campaign_id) REFERENCES campaigns (campaign_id)
);

-- Create bingo_tasks table
CREATE TABLE bingo_tasks (
bingo_task_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
bingo_id UUID NOT NULL,
grid_number NUMERIC NOT NULL,
task_name TEXT NOT NULL,
task_status BOOLEAN NOT NULL DEFAULT false,
FOREIGN KEY (bingo_id) REFERENCES bingo (bingo_id)
);
