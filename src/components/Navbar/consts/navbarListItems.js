import React from "react";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import HailIcon from '@mui/icons-material/Hail';
import AssignmentLateIcon from '@mui/icons-material/AssignmentLate';
import DataArrayIcon from '@mui/icons-material/DataArray';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import DateRangeIcon from '@mui/icons-material/DateRange';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const mainNavbarItems  = [
    {
        id: 0,
        icon: <CalendarTodayIcon />,
        label: 'Perfect Attendance',
        route: 'perfectAttendance',
    },
    {
        id: 1,
        icon: <EmojiPeopleIcon />,
        label: 'Hired',
        route: 'hired',
    },
    {
        id: 2,
        icon: <HailIcon />,
        label: 'Resigned',
        route: 'resigned',
    },
    {
        id: 3,
        icon: <HomeWorkIcon />,
        label: 'WFH',
        route: 'wfh',
    },
    {
        id: 4,
        icon: <AssignmentLateIcon />,
        label: 'Late Filing of OT',
        route: 'lf_of_ot',
    },
    {
        id: 5,
        icon: <AssignmentLateIcon />,
        label: 'Late Filing of CS',
        route: 'lf_of_cs',
    },
    {
        id: 6,
        icon: <DataArrayIcon />,
        label: 'No Logs',
        route: 'noLogs',
    },
    {
        id: 7,
        icon: <CalendarMonthIcon />,
        label: 'Month End OT',
        route: 'monthEndOt',
    },
    {
        id: 8,
        icon: <DateRangeIcon />,
        label: 'Year Report',
        route: 'yearReport',
    },
    {
        id: 9,
        icon: <DateRangeIcon />,
        label: 'Monthly Extraction',
        route: 'monthlyExtraction',
    },
    {
        id: 10,
        icon: <ExitToAppIcon />,
        label: 'SignOut',
        route: 'signOut',
    },
]