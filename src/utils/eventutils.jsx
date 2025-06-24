export const getEventsForDate = (events, dateStr) => {
  return events.filter(event => event.date === dateStr);
};

export const hasEventConflict = (event1, event2) => {
  if (event1.date !== event2.date) return false;
  
  const start1 = timeToMinutes(event1.startTime);
  const end1 = timeToMinutes(event1.endTime);
  const start2 = timeToMinutes(event2.startTime);
  const end2 = timeToMinutes(event2.endTime);
  
  return (start1 < end2 && start2 < end1);
};

export const timeToMinutes = (timeStr) => {
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

export const sortEventsByTime = (events) => {
  return events.sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
};