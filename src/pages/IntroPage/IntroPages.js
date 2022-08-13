import React from 'react';
import FooterIntroPage from './FooterIntroPage';
import IntergrationSection from './IntergrationSection';
import Navbar from './Navbar';
import WorkSection from './WorkSection';

export default function IntroPages() {
	return (
		<div>
			<Navbar />
			<WorkSection />
			{/* <IntergrationSection />
			<FooterIntroPage /> */}
		</div>
	);
}
