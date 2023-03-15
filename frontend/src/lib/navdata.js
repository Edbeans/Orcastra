import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import BarChartIcon from '@mui/icons-material/BarChart';
import SettingsIcon from '@mui/icons-material/Settings';
import CreateIcon from '@mui/icons-material/Create';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import { useSelector } from 'react-redux';
import React from 'react'

export const navData = [
    {
        id: 0,
        icon: <HomeIcon />,
        text: "Feed",
        link: "/"
    },
    {
        id: 1,
        icon: <BarChartIcon />,
        text: "investments",
        link: "/"
    },
    {
        id: 2,
        icon: <CreateIcon />,
        text: "Create an idea",
        link: "/ideas/new"
    },
    {
        id: 3,
        icon: <ViewCarouselIcon />,
        text: "Your ideas",
        link: "/"
    },
    {
        id: 4,
        icon: <SettingsIcon />,
        text: "Settings",
        link: "/"
    }
]