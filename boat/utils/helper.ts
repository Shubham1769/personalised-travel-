import moment from 'moment';

export const getIntervals = (from: Date, to: Date, interval: string) => {
  if (moment(from).diff(moment(to)) > 0) return;
  const date = moment(from);
  const timeStamps = [];
  let start: moment.Moment, end: moment.Moment;

  switch (interval) {
    case '1 month': {
      while (date.diff(moment(to)) < 0) {
        start = moment(date).date(1);
        date.add(1, 'month');
        end = moment(date).date(1);
        timeStamps.push({ start, end });
      }
      break;
    }
    case '1 year': {
      while (date.diff(moment(to)) < 0) {
        start = moment(date).month(1).date(1);
        date.add(1, 'year');
        end = moment(date).month(1).date(1);
        timeStamps.push({ start, end });
      }
      break;
    }
    case '1 week': {
      while (date.diff(moment(to)) < 0) {
        start = moment(date).day(1);
        date.add(1, 'week');
        end = moment(date).day(1);
        timeStamps.push({ start, end });
      }
      break;
    }
    case '3 month': {
      while (date.diff(moment(to)) < 0) {
        start = moment(date).startOf('quarter');
        date.add(1, 'quarter');
        end = moment(date).startOf('quarter');
        timeStamps.push({ start, end });
      }
    }
    case '1 day': {
      while (date.diff(moment(to)) < 0) {
        start = moment(date);
        date.add(1, 'day');
        end = moment(date);
        timeStamps.push({ start, end });
      }
      break;
    }
    default: {
      timeStamps.push({ start: moment(date), end: moment(to) });
    }
  }
  return timeStamps;
};

export const getTotalWorkingDays = (intervalStart: Date, intervalEnd: Date) => {
  if (moment(intervalStart).diff(moment(intervalEnd)) > 0) return 0;
  // get no of weekends in the interval
  const totalDays = Math.ceil(
    moment(intervalEnd).endOf('day').diff(moment(intervalStart).startOf('day'), 'days', true),
  );
  let noOfWeekends = 0;
  const currentDay = moment(intervalStart).clone();
  while (currentDay.isBefore(intervalEnd)) {
    if (currentDay.isoWeekday() === 6 || currentDay.isoWeekday() === 7) {
      noOfWeekends++;
    }
    currentDay.add(1, 'day');
  }

  return totalDays - noOfWeekends;
};
