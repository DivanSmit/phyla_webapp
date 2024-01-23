<script>
  // Sample events
  let events = [
    { date: new Date(2024, 0, 16), time: "10:00 AM", title: "Meeting 1" },
    { date: new Date(2024, 0, 17), time: "02:30 PM", title: "Event 2" },
    { date: new Date(2024, 0, 18), time: "08:00 AM", title: "Task 3" },
  ];

  function getCurrentWeekDates() {
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of the current week

    const weekDates = Array.from({ length: 7 }, (_, index) => {
      const currentDate = new Date(startOfWeek);
      currentDate.setDate(startOfWeek.getDate() + index);
      return currentDate;
    });

    return weekDates;
  }

  // Function to add an event
  function addEvent() {
    const dateInput = prompt("Enter event date (YYYY-MM-DD):");
    const time = prompt("Enter event time (e.g., 10:00 AM):");
    const title = prompt("Enter event title:");

    if (dateInput && time && title) {
      const [year, month, day] = dateInput.split("-").map(Number);

      const eventDate = new Date(year, month - 1, day);
      eventDate.setHours(Number(time.split(":")[0]));
      eventDate.setMinutes(Number(time.split(":")[1].split(" ")[0]));

      // Initialize events array if it's not already initialized
      events = events || [];

      // Use set function to update the reactive state
      events = [...events, { date: eventDate, time, title }];
      $: events = events; // This triggers a reactivity update
    }
  }

    // Function to check if two dates are on the same day
  function isSameDay(date1, date2) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }
</script>

<div class="calendar">
  <!-- Display all days of the week -->
  {#each getCurrentWeekDates() as date (index)}
    <div class="day">
      <div class="events">
        <!-- Display existing events for the current day -->
        {#each events.filter(event => isSameDay(event.date, date)) as { time, title }}
          <div class="event">
            {title} - {time}
          </div>
        {/each}
        <!-- Button to add a new event manually for the current day -->
        <button on:click={() => addEvent()}>+ Add Event</button>
      </div>
      <div>{date.toDateString()}</div>
    </div>
  {/each}
</div>

<style>
  .calendar {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
    margin: 20px;
  }

  .day {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    background-color: #f9f9f9;
  }

  .events {
    margin-top: 10px;
  }

  .event {
    background-color: #4CAF50;
    color: white;
    padding: 5px;
    margin: 2px;
    cursor: pointer;
    border-radius: 3px;
  }
</style>


