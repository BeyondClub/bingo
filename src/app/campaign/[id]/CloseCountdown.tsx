'use client';

import Countdown from 'react-countdown';

const lite_renderer = ({ days, hours, minutes, seconds, completed, layout }: any) => {
	if (completed) {
		return <div>Campaign expired</div>;
	} else {
		return (
			<>
				{days > 0 ? `${days}d ` : ''}

				{hours > 0 ? `${hours}h ` : ''}

				{`${minutes}m `}

				{`${seconds}s `}
			</>
		);
	}
};

const CountDownData = ({ value, label }: any) => {
	if (['days', 'hours'].includes(label) && value == 0) return null;

	return (
		<div>
			<b>{value}</b>
			<p>{label}</p>
		</div>
	);
};

const details_renderer = ({ days, hours, minutes, seconds, completed, layout }: any) => {
	if (completed) {
		return <div>Campaign expired</div>;
	} else {
		return (
			<div className="grid grid-cols-4 gap-5">
				<CountDownData value={days} label={days > 1 ? 'Days' : 'Day'} />
				<CountDownData value={hours} label={hours > 1 ? 'Hrs' : 'Hr'} />
				<CountDownData value={minutes} label={'Min'} />
				<CountDownData value={seconds} label={'Sec'} />
			</div>
		);
	}
};

const CloseCountdown = ({ date, layout = 'details' }: { date?: string | undefined | Date; layout?: string }) => {
	return <Countdown date={date!} renderer={layout === 'details' ? details_renderer : lite_renderer} />;
};

export default CloseCountdown;
