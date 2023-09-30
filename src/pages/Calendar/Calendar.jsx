import { CalendarToolbar } from "../../components/calendar/calendar-toolbar";
import Header from "../../components/Header";
import React, { useRef, useState, useCallback, useMemo } from "react";
import { useEffect } from "react";
import Calendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import timeGridPlugin from "@fullcalendar/timegrid";
import timelinePlugin from "@fullcalendar/timeline";
import { CalendarContainer } from "../../components/calendar/calendar-container";
import "../../styles/calendar.scss";
import { useDispatch, useSelector } from "react-redux";
import { getCalendarBooking } from "../../features/book/bookingSlide";
import { useDialog } from "../../components/calendar/use-dialog";
import CalendarEventDialog from "../../components/calendar/calendar-event-dialog";
import authService from "../../features/auth/authService";
import { useStateContext } from "../../contexts/ContextProvider";

const useEvents = (garage) => {
  const user = authService.getCurrentUser();
  const role = user?.roleName;
  // console.log(garage);
  const dispatch = useDispatch();

  const events = useSelector((state) => state.booking.bookings);
  const handleEventsGet = useCallback(() => {
    role === "Admin"
      ? garage === 0
        ? dispatch(getCalendarBooking())
        : dispatch(getCalendarBooking(garage))
      : dispatch(getCalendarBooking(user?.garageId));
  }, [dispatch, garage, role, user]);

  useEffect(
    () => {
      handleEventsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [garage, user?.garageId]
  );

  return events;
};
const useCurrentEvent = (events, dialogData) => {
  return useMemo(() => {
    if (!dialogData) {
      return undefined;
    }
    return events.find((event) => event?.id.toString() === dialogData.eventId);
  }, [dialogData, events]);
};
const Calendars = () => {

  useEffect(() => {
    document.title = "Lịch đặt hàng";
  }, []);

  const {
    setScreenSize,
    screenSize,
  } = useStateContext();

  const [date, setDate] = useState(new Date());
  const calendarRef = useRef(null);
  const [mdUp, setMdUp] = useState(900);
  const [garage, setGarage] = useState(0);
  const events = useEvents(garage);
  const [view, setView] = useState(mdUp ? "timeGridDay" : "dayGridMonth");
  const updateDialog = useDialog();
  const viewEvent = useCurrentEvent(events, updateDialog.data);

  // set view calendar
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();
    
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  console.log(screenSize);
  const handleScreenResize = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();
      const newView = screenSize > 1000 ? "dayGridMonth" : "timeGridDay";

      calendarApi.changeView(newView);
      setView(newView);
    }
  }, [calendarRef, screenSize]);

  useEffect(
    () => {
      handleScreenResize();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [screenSize]
  );

  // end set view
  const handleEventSelect = useCallback(
    (arg) => {
      updateDialog.handleOpen({
        eventId: arg.event.id,
      });
    },
    [updateDialog]
  );

  const handleDateNext = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.next();
      setDate(calendarApi.getDate());
    }
  }, []);
  const handleDatePrev = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.prev();
      setDate(calendarApi.getDate());
    }
  }, []);
  const handleViewChange = useCallback((view) => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.changeView(view);
      setView(view);
    }
  }, []);

  const handleDateToday = useCallback(() => {
    const calendarEl = calendarRef.current;

    if (calendarEl) {
      const calendarApi = calendarEl.getApi();

      calendarApi.today();
      setDate(calendarApi.getDate());
    }
  }, []);

  return (
    <>
      <div className="min-[620px]:pt-24 min-[620px]:px-8">
        <Header
          icon="https://firebasestorage.googleapis.com/v0/b/book-2223b.appspot.com/o/Calendar.png?alt=media&token=df907171-6f6d-4138-b8d9-afba39965514"
          size={40}
          alt="all"
          title="Lịch chi tiết tất cả đơn hàng"
        />

        <div className="m-3">
          <CalendarToolbar
            date={date}
            view={view}
            garage={setGarage}
            onDateNext={handleDateNext}
            onDatePrev={handleDatePrev}
            onDateToday={handleDateToday}
            onViewChange={handleViewChange}
          />

          <div className="card m-4">
            <CalendarContainer className="fix-calendar">
              <Calendar
                displayEventTime
                allDayMaintainDuration
                dayMaxEventRows={3}
                droppable
                eventTextColor="#ffffff"
                // eventColor="#378006"
                // eventBackgroundColor="#f00"
                // editable
                events={events}
                eventDisplay="block"
                eventClick={handleEventSelect}
                // eventDrop={handleEventDrop}
                // eventResize={handleEventResize}
                even
                eventResizableFromStart
                headerToolbar={false}
                height={800}
                initialDate={date}
                initialView={view}
                plugins={[
                  dayGridPlugin,
                  interactionPlugin,
                  listPlugin,
                  timeGridPlugin,
                  timelinePlugin,
                ]}
                ref={calendarRef}
                rerenderDelay={10}
                // select={handleRangeSelect}
                selectable
                weekends
              />
            </CalendarContainer>
          </div>
        </div>
      </div>
      <CalendarEventDialog
        event={viewEvent}
        onClose={updateDialog.handleClose}
        open={updateDialog.open}
      />
    </>
  );
};

export default Calendars;
