import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';

function preventDefault(event) {
	event.preventDefault();
}

export default function Deposits() {
	return (
		<React.Fragment>
			<Title>Latest Heartbeats</Title>
			<Typography component="p" variant="h4">
				From Node ID
			</Typography>
			<Typography color="text.secondary" sx={{ flex: 1 }}>
				on Date
			</Typography>
			<div>
				<Link color="primary" href="#" onClick={preventDefault}>
					View Heartbeat
				</Link>
			</div>
		</React.Fragment>
	);
}
