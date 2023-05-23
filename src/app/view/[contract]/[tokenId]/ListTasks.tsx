'use client';

import { bingo_tasks } from '@prisma/client';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import dayjs from 'dayjs';

const ListTasks = ({ tasks }: { tasks: bingo_tasks[] | null }) => {
	if (!tasks) {
		return null;
	}

	return (
		<div className="text-white relative">
			<table className="nes-table is-bordered is-dark">
				<thead>
					<tr>
						<th className="text-white">Task</th>
						<th className="text-white">Completed</th>
						<th className="text-white">Last Checked</th>
					</tr>
				</thead>
				<tbody>
					{tasks.map((task) => (
						<tr key={task.bingo_task_id}>
							<td className="text-white capitalize text-xs">{task.task_name.replace('\\n', ' ')}</td>
							<td className="text-white flex justify-center">
								{task.task_status ? (
									<CheckIcon className="text-green-500" />
								) : (
									<Cross1Icon className="text-gray-200" />
								)}
							</td>
							<td className="text-white text-xs">
								{task.last_processed ? dayjs(task.last_processed).format('DD MMM YY hh:mm A') : null}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default ListTasks;
