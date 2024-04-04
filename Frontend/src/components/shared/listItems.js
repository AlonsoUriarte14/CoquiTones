import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeIcon from '@mui/icons-material/Home';
import MemoryIcon from '@mui/icons-material/Memory';
import InsightsIcon from '@mui/icons-material/Insights';
import GitHubIcon from '@mui/icons-material/GitHub';
import InfoIcon from '@mui/icons-material/Info';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
export const mainListItems = (
	<React.Fragment>
		<ListItemButton href='/'>
			<ListItemIcon>
				<HomeIcon />
			</ListItemIcon>
			<ListItemText primary="Home" />
		</ListItemButton>
		<ListItemButton href='/Dashboard'>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton href='/CDN'>
			<ListItemIcon>
				<MemoryIcon />
			</ListItemIcon>
			<ListItemText primary="Cluster Duck Network" />
		</ListItemButton>
		<ListItemButton href='/Classifier'>
			<ListItemIcon>
				<InsightsIcon />
			</ListItemIcon>
			<ListItemText primary="ML Analysis" />
		</ListItemButton>
		<ListItemButton href='/SpectralAnalysis'>
			<ListItemIcon>
				<VolumeUpIcon />
			</ListItemIcon>
			<ListItemText primary="Spectral Analysis " />
		</ListItemButton>
	</React.Fragment>
);

export const secondaryListItems = (
	<React.Fragment>

		<ListItemButton href='https://github.com/AlonsoUriarte14/CoquiTones.git'>
			<ListItemIcon>
				<GitHubIcon />
			</ListItemIcon>
			Source Code
		</ListItemButton>
		<ListItemButton href='/About'>
			<ListItemIcon>
				<InfoIcon />
			</ListItemIcon>
			<ListItemText primary="About" />
		</ListItemButton>
	</React.Fragment>
);
