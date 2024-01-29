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
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ScheduleTwoToneIcon from '@mui/icons-material/ScheduleTwoTone';

export const mainNavbarItems  = [
    {
        id: 0,
        icon: <CalendarTodayIcon />,
        label: 'Perfect Attendance',
        route: 'perfectAttendance',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 1,
        icon: <EmojiPeopleIcon />,
        label: 'Hired',
        route: 'hired',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 2,
        icon: <HailIcon />,
        label: 'Resigned',
        route: 'resigned',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 3,
        icon: <HomeWorkIcon />,
        label: 'WFH',
        route: 'wfh',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 4,
        icon: <AssignmentLateIcon />,
        label: 'Late Filing of OT',
        route: 'lf_of_ot',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 5,
        icon: <AssignmentLateIcon />,
        label: 'Late Filing of CS',
        route: 'lf_of_cs',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 6,
        icon: <DataArrayIcon />,
        label: 'No Logs',
        route: 'noLogs',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 7,
        icon: <CalendarMonthIcon />,
        label: 'Month End OT',
        route: 'monthEndOt',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 8,
        icon: <DateRangeIcon />,
        label: 'Year Report',
        route: 'yearReport',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 9,
        icon: <DateRangeIcon />,
        label: 'Monthly Extraction',
        route: 'monthlyExtraction',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 10,
        icon: <ErrorOutlineIcon />,
        label: 'Error Timesheet',
        route: 'errorTimesheet',
        roles: ['Administrator']
    },
    {
        id: 11,
        icon: <ErrorOutlineIcon />,
        label: 'UnderTime',
        route: 'underTimesheet',
        roles: ['Administrator']
    },
    {
        id: 12,
        icon: <ErrorOutlineIcon />,
        label: 'Late Timesheet',
        route: 'lateTimesheet',
        roles: ['Administrator']
    },
    {
        id: 13,
        icon: <ScheduleTwoToneIcon />,
        label: 'Weekly Schedule',
        route: 'WeeklySchedule',
        roles: ['Administrator', 'Time_Keeper']
    },
    {
        id: 14,
        icon: <ExitToAppIcon />,
        label: 'SignOut',
        route: 'signOut',
        roles: ['Administrator', 'Time_Keeper']
    },
    
]