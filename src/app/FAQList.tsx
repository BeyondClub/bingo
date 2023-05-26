'use client';

import { Accordion } from '@mantine/core';

const FAQData = [
	{
		question: 'How can I reset my password?',
		answer: 'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.',
	},
	{
		question: 'Option 2',
		answer: 'It can’t help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren’t many people or Pokémon.It was born from sludge on the ocean floor. In a sterile environment, the germs within its body can’t multiply, and it dies.It has no eyeballs, so it can’t see. It checks its surroundings via the ultrasonic waves it emits from its mouth.',
	},
];

const FAQList = () => {
	return (
		<>
			<Accordion variant="separated">
				{FAQData.map((faq) => (
					<Accordion.Item
						value={faq.question}
						key={faq.question}
						className="bg-gray-900 text-gray-100 faq_item"
						style={{
							background: '#22252a',
							color: '#fff',
							border: '0px',
						}}
					>
						<Accordion.Control className="bg-gray-800">{faq.question}</Accordion.Control>
						<Accordion.Panel
							style={{
								background: '#131619',
							}}
						>
							{faq.answer}
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</>
	);
};

export default FAQList;
