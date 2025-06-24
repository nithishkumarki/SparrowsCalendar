import React, { useState ,useCallback} from 'react';
import { Plus, Clock, X } from 'lucide-react';
import Navbar from '../components/navbar';
import CalendarGrid from '../components/calendargrid';

const SAMPLE_EVENTS =  [
  {
    id: 1,
    title: "Scrum Meeting",
    date: "2025-06-04",
    startTime: "09:00",
    endTime: "10:00",
    color: "#3b82f6"
  },
  {
    id: 2,
    title: "Code Review",
    date: "2025-06-23",
    startTime: "14:30",
    endTime: "15:30",
    color: "#ef4444"
  },
  {
    id: 3,
    title: "Celebration Party",
    date: "2025-06-18",
    startTime: "10:00",
    endTime: "11:30",
    color: "#10b981"
  },
  {
    id: 4,
    title: "New Project",
    date: "2025-06-26",
    startTime: "16:00",
    endTime: "17:00",
    color: "#f59e0b"
  },
  {
    id: 5,
    title: "Team Sync",
    date: "2025-06-13",
    startTime: "13:00",
    endTime: "15:00",
    color: "#8b5cf6"
  },
  {
    id: 6,
    title: "CodeZam",
    date: "2025-06-13",
    startTime: "12:00",
    endTime: "13:00",
    color: "#06b6d4"
  }
];

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const EVENT_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
  '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#6366f1'
];

const SparrowLogo = ({ className = "w-8 h-8" }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 10c-8 0-15 3-20 8l-5-3c-2-1-4 0-5 2s0 4 2 5l3 2c-2 4-3 8-3 12 0 15 8 28 20 35v20c0 2 2 4 4 4h4c2 0 4-2 4-4V72c12-7 20-20 20-35 0-4-1-8-3-12l3-2c2-1 3-3 2-5s-3-3-5-2l-5 3c-5-5-12-8-20-8zm-8 25c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm16 0c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm-8 10c1 0 2 1 2 2s-1 2-2 2-2-1-2-2 1-2 2-2z"/>
    <path d="M35 20c-3 2-5 5-6 8l-8-5c-1-1-3 0-3 2s1 2 2 2l6 4c0 1 0 2 0 3 0 8 4 15 10 19v-8c-3-2-5-6-5-10 0-2 1-4 2-6l2-9z"/>
    <path d="M65 20l2 9c1 2 2 4 2 6 0 4-2 8-5 10v8c6-4 10-11 10-19 0-1 0-2 0-3l6-4c1 0 2-1 2-2s-2-3-3-2l-8 5c-1-3-3-6-6-8z"/>
  </svg>
);

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(SAMPLE_EVENTS);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    startTime: '',
    endTime: '',
    color: EVENT_COLORS[0]
  });

  const today = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = firstDay.getDay();
  const totalDays = lastDay.getDate();

  const prevMonthDays = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    prevMonthDays.push(new Date(year, month, -i).getDate());
  }

  const currentMonthDays = Array.from({ length: totalDays }, (_, i) => i + 1);

  const nextMonthDays = Array.from(
    { length: 42 - (prevMonthDays.length + currentMonthDays.length) },
    (_, i) => i + 1
  );

  const navigateMonth = (dir) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + dir);
      return newDate;
    });
  };

  const formatDate = (y, m, d) =>
    `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;

  const getEventsForDate = (dateStr) =>
    events.filter(event => event.date === dateStr);

  const isToday = (day) =>
    today.getDate() === day &&
    today.getMonth() === month &&
    today.getFullYear() === year;

  const handleDateClick = (day, isCurrentMonth) => {
    if (!isCurrentMonth) return;
    const dateStr = formatDate(year, month, day);
    setSelectedDate(dateStr);
    setShowEventModal(true);
    setShowAddEventForm(false);
  };

  const handleAddEvent = () => setShowAddEventForm(true);

  const handleSaveEvent = () => {
    if (!newEvent.title.trim() || !newEvent.startTime || !newEvent.endTime) {
      alert('Please fill in all required fields');
      return;
    }

    if (newEvent.startTime >= newEvent.endTime) {
      alert('End time must be after start time');
      return;
    }

    const eventToAdd = {
      id: Date.now(),
      title: newEvent.title.trim(),
      date: selectedDate,
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      color: newEvent.color
    };

    setEvents(prev => [...prev, eventToAdd]);
    setNewEvent({
      title: '',
      startTime: '',
      endTime: '',
      color: EVENT_COLORS[0]
    });
    setShowAddEventForm(false);
  };

  const handleCancelAddEvent = () => {
    setShowAddEventForm(false);
    setNewEvent({
      title: '',
      startTime: '',
      endTime: '',
      color: EVENT_COLORS[0]
    });
  };

  const handleDeleteEvent = (id) => {
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  const AddEventForm = () => {
  const handleTitleChange = useCallback((e) => {
    setNewEvent(prev => ({ ...prev, title: e.target.value }));
  }, []);

  const handleStartTimeChange = useCallback((e) => {
    setNewEvent(prev => ({ ...prev, startTime: e.target.value }));
  }, []);

  const handleEndTimeChange = useCallback((e) => {
    setNewEvent(prev => ({ ...prev, endTime: e.target.value }));
  }, []);

  const handleColorChange = useCallback((color) => {
    setNewEvent(prev => ({ ...prev, color }));
  }, []);

  return (
    <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
      <h4 className="font-semibold text-green-900 mb-3">Add New Event</h4>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">Event Title *</label>
          <input
            type="text"
            value={newEvent.title}
            onChange={handleTitleChange}
            autoFocus
            className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            placeholder="Enter event title"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">Start Time *</label>
            <input
              type="time"
              value={newEvent.startTime}
              onChange={handleStartTimeChange}
              className="w-full px-3 py-2 border border-green-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-800 mb-1">End Time *</label>
            <input
              type="time"
              value={newEvent.endTime}
              onChange={handleEndTimeChange}
              className="w-full px-3 py-2 border border-green-300 rounded-md"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-green-800 mb-1">Color</label>
          <div className="flex space-x-2">
            {EVENT_COLORS.map(color => (
              <button
                key={color}
                type="button"
                onClick={() => handleColorChange(color)}
                className={`w-6 h-6 rounded-full border-2 ${
                  newEvent.color === color ? 'border-green-800' : 'border-green-300'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            onClick={handleSaveEvent}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Save Event
          </button>
          <button
            onClick={handleCancelAddEvent}
            className="flex-1 bg-green-200 text-green-800 py-2 px-4 rounded-md hover:bg-green-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

  const EventModal = () => {
    if (!showEventModal || !selectedDate) return null;

    const dateEvents = getEventsForDate(selectedDate);
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-US', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-96 overflow-y-auto">
          <div className="sticky top-0 bg-white p-4 border-b">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-900">{formattedDate}</h3>
              <button onClick={() => setShowEventModal(false)} className="text-gray-500 hover:text-gray-700 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-4">
            {!showAddEventForm && (
              <button
                onClick={handleAddEvent}
                className="w-full mb-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Event</span>
              </button>
            )}
            {showAddEventForm && <AddEventForm />}
            {dateEvents.length > 0 ? (
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Scheduled Events</h4>
                {dateEvents.map(event => (
                  <div key={event.id} className="border-l-4 pl-3 py-2 bg-gray-50 rounded-r-md group" style={{ borderColor: event.color }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900">{event.title}</h5>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <Clock className="w-4 h-4 mr-1" />
                          {event.startTime} - {event.endTime}
                        </div>
                      </div>
                      <button onClick={() => handleDeleteEvent(event.id)} className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 p-1">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : !showAddEventForm && (
              <p className="text-gray-500 text-center py-4">No events scheduled for this date</p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-400 via-green-400 to-teal-500 p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-600/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 opacity-10">
          <div className="w-full h-full bg-green-800/20 rounded-full transform translate-x-1/2 translate-y-1/2"></div>
        </div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 opacity-5">
          <div className="w-full h-full bg-teal-800/20 rounded-full"></div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto relative">
        <Navbar
          month={month}
          year={year}
          MONTHS={MONTHS}
          onPrev={() => navigateMonth(-1)}
          onNext={() => navigateMonth(1)}
          SparrowLogo={SparrowLogo}
        />
        <CalendarGrid
          prevMonthDays={prevMonthDays}
          currentMonthDays={currentMonthDays}
          nextMonthDays={nextMonthDays}
          formatDate={formatDate}
          getEventsForDate={getEventsForDate}
          handleDateClick={handleDateClick}
          isToday={isToday}
          year={year}
          month={month}
        />
      </div>
      <EventModal />
    </div>
  );
}

export default Calendar;
