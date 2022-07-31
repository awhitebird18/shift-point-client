export let employeeData = [
  {
    eeNum: 45,
    firstName: 'Kermit',
    lastName: 'the Frog',
    primaryEarning: 1,
    homeDepartment: 2,
    province: 'Manitoba',
    homePayRate: 16,
    positions: [
      {
        id: 1,
        name: 'Stage Hand',
        department: 2,
        positionRate: 20,
        earning: 1,
        start: '08:00 am',
        end: '04:00 pm',
      },
      {
        id: 2,
        name: 'Filling',
        department: null,
        positionRate: 20,
        earning: 1,
      },
      {
        id: 3,
        name: 'Packager',
        department: 1,
        positionRate: null,
        earning: 2,
      },
    ],
    timesheetConfig: {
      sort: 'eeNum',
      filters: {
        department: ['warehouse', 'office'],
      },
    },
  },
  {
    eeNum: 49,

    firstName: 'Pepe',
    lastName: 'King Prawn',
    primaryEarning: 1,
    homeDepartment: 1,
    province: 'Manitoba',
    homePayRate: 16,
    positions: [
      {
        id: 5,
        name: 'Evil Planner',
        department: 1,
        positionRate: null,
        earning: 1,
      },
      {
        id: 6,
        name: 'Disguise',
        department: 2,
        positionRate: 20,
        earning: 1,
      },
    ],

    timesheetConfig: {
      sort: 'eeNum',
      filters: {
        department: ['warehouse', 'office'],
      },
    },
  },
  {
    eeNum: 48,
    firstName: 'Constantine',
    lastName: 'the Frog',
    primaryEarning: 1,
    homeDepartment: 2,
    province: 'Ontario',
    homePayRate: 16,
    positions: [
      {
        id: 5,
        name: 'Evil Planner',
        department: 1,
        positionRate: null,
        earning: 1,
      },
      {
        id: 6,
        name: 'Disguise',
        department: 2,
        positionRate: 20,
        earning: 1,
      },
    ],
    timesheetConfig: {
      sort: 'eeNum',
      filters: {
        department: ['warehouse', 'office'],
      },
    },
  },
];
