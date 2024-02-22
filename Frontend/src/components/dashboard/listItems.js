import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MemoryIcon from '@mui/icons-material/Memory';
import InsightsIcon from '@mui/icons-material/Insights';
import Link from '@mui/material/Link';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
export const mainListItems = (
	<React.Fragment>
		<ListItemButton>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton >
			<ListItemIcon>
				<MemoryIcon />
			</ListItemIcon>
			<ListItemText primary="Cluster Duck Network" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<InsightsIcon />
			</ListItemIcon>
			<ListItemText primary="ML Analysis" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<VolumeUpIcon />
			</ListItemIcon>
			<ListItemText primary="Spectral Analysis " />
		</ListItemButton>
	</React.Fragment>
);

export const secondaryListItems = (
	<React.Fragment>

		<ListItemButton>
			<ListItemIcon>
				<GitHubIcon />
			</ListItemIcon>
			<Link color="inherit" href="https://github.com/AlonsoUriarte14/CoquiTones.git">
				<ListItemText primary="Source Code" />
			</Link>
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<InfoIcon />
			</ListItemIcon>
			<ListItemText primary="About" />
		</ListItemButton>
	</React.Fragment>
);
