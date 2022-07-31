// FUNCTION: Converts 24 hour to 12 hours
export function convertToHours12(dateObj) {
  if (!dateObj || !Object.prototype.toString.call(dateObj) === '[object Date]') {
    return;
  }

  let padHours = '';
  let padMinutes = '';

  dateObj.getHours() > 12
    ? (padHours = (dateObj.getHours() - 12).toString().padStart(2, '0'))
    : (padHours = dateObj.getHours().toString().padStart(2, '0'));

  if (dateObj.getMinutes() < 10) {
    padMinutes = dateObj.getMinutes().toString().padStart(2, '0');
  } else {
    padMinutes = dateObj.getMinutes().toString().padEnd(2, '0');
  }

  let time = `${padHours}:${padMinutes}`;

  time = dateObj.getHours() >= 12 ? `${time} pm` : `${time} am`;

  return time;
}

export function convertDatesToObj(entries) {
  // Convert times to date objects
  const timeRecords = entries.map((entry) => {
    entry.date = new Date(entry.date);
    //   entry.start = new Date(entry.start);

    //   if (entry.end) {
    //     entry.end = new Date(entry.end);
    //   }
    //   return entry;
  });

  return timeRecords;
}

function showFilters() {
  setFilterOpen((prev) => !prev);
}

function updateDateRange(evt) {
  const newDate = new Date(`${evt.target.value} 12:00 am`);

  setStartDate((prev) => {
    return { ...prev, [evt.target.name]: newDate };
  });
}

function convertToInputDate(dateObj) {
  return `${dateObj.getFullYear()}-${(dateObj.getMonth() + 1).toString().padStart(2, '0')}-${dateObj
    .getDate()
    .toString()
    .padStart(2, '0')}`;
}

export const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const earningCodes = [
  {
    name: 'Regular Hourly',
    earningRate: null,
    otEligible: true,
    earningId: 1,
  },
  {
    name: 'Overtime',
    earningRate: null,
    otEligible: false,
    earningId: 2,
  },
  {
    name: 'Doubletime',
    earningRate: null,
    otEligible: false,
    earningId: 3,
  },
  {
    name: 'Stat 1.0',
    earningRate: null,
    otEligible: false,
    earningId: 4,
  },
  {
    name: 'Stat 1.5',
    earningRate: null,
    otEligible: false,
    earningId: 5,
  },
  {
    name: 'Travel',
    earningRate: null,
    otEligible: false,
    earningId: 6,
  },
];
