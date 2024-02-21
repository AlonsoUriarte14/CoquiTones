import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';

export const mainListItems = (
	<React.Fragment>
		<ListItemButton>
			<ListItemIcon>
				<DashboardIcon />
			</ListItemIcon>
			<ListItemText primary="Dashboard" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<ShoppingCartIcon />
			</ListItemIcon>
			<ListItemText primary="Cluster Duck Network" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<PeopleIcon />
			</ListItemIcon>
			<ListItemText primary="Machine Learning Model Analysis" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<BarChartIcon />
			</ListItemIcon>
			<ListItemText primary="Spectral Analysis " />
		</ListItemButton>
	</React.Fragment>
);

export const secondaryListItems = (
	<React.Fragment>

		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="About" />
		</ListItemButton>
		<ListItemButton>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="Source Code" />
		</ListItemButton>
	</React.Fragment>
);
