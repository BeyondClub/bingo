import { db } from '@/libs/db';

const getBingo = async (params: { contract: string; tokenId: string }) => {
	const { contract, tokenId } = params;

	const campaign = await db.campaigns.findFirst({
		where: {
			contract_address: contract,
		},
	});

	const tasks = await db.campaigns_tasks.findMany({
		where: {
			campaign_id: campaign?.campaign_id,
		},
	});

	return { tasks, campaign };
};

const page = async ({ params }: any) => {
	const bingo = await getBingo(params);

	return (
		<>
			<link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
			<div className="grid md:grid-cols-2 gap-5 press_start">
				<table>
					<thead>
						<tr>
							<th>Task</th>
							<th>Address</th>
						</tr>
					</thead>
					<tbody>
						{bingo.tasks.map((task) => {
							return (
								<tr className="border" key={task.campaign_task_id}>
									<td width={250}>
										<div className="text-xs w-90 " style={{ wordBreak: 'break-all' }}>
											{task.response_condition}
										</div>
									</td>
									<td>
										<img src={task.task_image} alt="" />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</>
	);
};

export default page;
