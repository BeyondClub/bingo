'use client';

import ModalPortal from '@/components/Modal/Modal';
import { addNumberSuffix } from '@/libs/util';

const MintSuccessModal = ({
	title,
	open,
	onClose,
	position,
	collectible_url,
	campaign_name,
	message,
	disableReload = false,
}: {
	title?: string | null | React.ReactNode;
	open: boolean;
	onClose?: any;
	position?: number | null;
	collectible_url?: string;
	campaign_name?: string;
	message?: string | null;
	disableReload?: boolean;
}) => {
	return (
		<>
			<ModalPortal
				opened={open}
				onClose={() => {
					if (!disableReload) {
						window.location.reload();
					}
					onClose();
				}}
				title=""
				radius={'lg'}
				className="relative"
			>
				<div>
					<img src={collectible_url} className="rounded-lg" alt="" />
				</div>

				<h3 className="font-medium text-center text-xl mt-5">{title ? title : 'CONGRATULATIONS!'}</h3>

				<p className="text-center my-2">
					{message ? (
						message
					) : (
						<>
							You are the {position ? addNumberSuffix(position) : ''} holder of {campaign_name}! 🤙
						</>
					)}
				</p>
			</ModalPortal>
		</>
	);
};

export default MintSuccessModal;
