'use client';

import useWindowSize from '@/hooks/use-window-size';
import { Modal, ModalProps } from '@mantine/core';
import { Drawer } from 'vaul';

const ModalPortal = (props: ModalProps) => {
	const { isMobile } = useWindowSize();

	if (isMobile) {
		return (
			<Drawer.Root
				open={props.opened}
				onOpenChange={(open) => {
					if (!props.opened) {
						props.onClose();
					}
				}}
				shouldScaleBackground
			>
				<Drawer.Overlay className="fixed inset-0 z-40 bg-gray-100 bg-opacity-10 backdrop-blur" />
				<Drawer.Portal>
					<Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 rounded-t-[10px] border-t border-gray-200 bg-white">
						<div className="mx-auto my-3 h-1 w-12 rounded-full bg-gray-300" />
						{props.children}
					</Drawer.Content>
					<Drawer.Overlay />
				</Drawer.Portal>
			</Drawer.Root>
		);
	}

	return (
		<Modal opened={props.opened} onClose={props.onClose} title={props.title} radius={'lg'}>
			{props.children}
		</Modal>
	);
};

export default ModalPortal;
