import React from 'react';
import sparrow from '../asserts/sparrow.png';
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const CalendarGrid = ({
  prevMonthDays,
  currentMonthDays,
  nextMonthDays,
  formatDate,
  getEventsForDate,
  handleDateClick,
  isToday,
  year,
  month
}) => {
  const EventDot = ({ color }) => (
    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
  );

  return (
    <div
      className="relative rounded-lg shadow-lg overflow-hidden border border-white/20 min-h-[600px]"
      style={{
        backgroundImage: 'url("/sparrow.png")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'contain',
      }}
    >
             <img
    src={sparrow}
    alt=""
    className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-100"
    style={{ zIndex: 1 }}
  />
             <img
    src={sparrow}
    alt=""
    className="absolute left-0 top-1/4 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-100"
    style={{ zIndex: 1 }}
  />
             <img
    src={sparrow}
    alt=""
    className="absolute left-0 bottom-2 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-100"
    style={{ zIndex: 1 }}
  />
             <img
    src={sparrow}
    alt=""
    className="absolute right-0 bottom-2/3 -translate-y-1/2 w-48 h-48 pointer-events-none opacity-100"
    style={{ zIndex: 1 }}
  />
             <img
    src={sparrow}
    alt=""
    className="absolute right-0 bottom-3  w-48 h-48 pointer-events-none opacity-100"
    style={{ zIndex: 1 }}
  />

      <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-0"></div>

     
      <div className="relative z-10 grid grid-cols-7 bg-green-50 border-b">
        {DAYS.map(day => (
          <div
            key={day}
            className="p-4 text-center font-semibold text-green-800 border-r last:border-r-0"
          >
            {day}
          </div>
        ))}
      </div>

  
      <div className="relative z-10 grid grid-cols-7">
      
        {prevMonthDays.map(day => (
          <div
            key={`prev-${day}`}
            className="h-32 border-r last:border-r-0 border-b bg-gray-50/50 hover:bg-gray-100/70 transition-colors"
          >
            <div className="p-2 text-gray-400 text-sm">{day}</div>
          </div>
        ))}

        {currentMonthDays.map(day => {
          const dateStr = formatDate(year, month, day);
          const dayEvents = getEventsForDate(dateStr);
          const isTodayDate = isToday(day);

          return (
            <div
              key={day}
              className="h-32 border-r last:border-r-0 border-b bg-white/80 hover:bg-green-100/60 cursor-pointer transition-colors duration-200"
              onClick={() => handleDateClick(day, true)}
            >
              <div className="p-2 h-full flex flex-col">
                <div
                  className={`text-sm font-medium mb-1 ${
                    isTodayDate
                      ? 'bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                      : 'text-gray-900'
                  }`}
                >
                  {day}
                </div>

                <div className="flex-1 space-y-1 overflow-hidden">
                  {dayEvents.slice(0, 3).map(event => (
                    <div
                      key={event.id}
                      className="text-xs p-1 rounded truncate text-white font-medium"
                      style={{ backgroundColor: event.color }}
                    >
                      {event.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className="text-xs text-gray-500 font-medium">
                      +{dayEvents.length - 3} more
                    </div>
                  )}
                </div>

                {dayEvents.length > 0 && (
                  <div className="flex space-x-1 mt-1 md:hidden">
                    {dayEvents.slice(0, 3).map(event => (
                      <EventDot key={event.id} color={event.color} />
                    ))}
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{dayEvents.length - 3}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}

  
        {nextMonthDays.map(day => (
          <div
            key={`next-${day}`}
            className="h-32 border-r last:border-r-0 border-b bg-gray-50/50 hover:bg-gray-100/70 transition-colors"
          >
            <div className="p-2 text-gray-400 text-sm">{day}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;
