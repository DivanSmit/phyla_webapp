<script>
    import {spawnInstance} from "$lib/connect_to_BASE.js";
    import { createEventDispatcher } from 'svelte';

    let selectedDate = getCurrentDate();
    let selectedTime = getCurrentTime();
    let unixTimestamp = 0;

    let inputData = {
        time: 0
    }

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('buttonClick', { message: 'Button clicked!' });
    }

    let timeOptions = generateTimeOptions();

    let fseSpawnTag = "SPAWN_FSE_INSTANCE";

    function getCurrentDate() {
        const currentDate = new Date().toISOString().split('T')[0];
        return currentDate;
    }

    function getCurrentTime() {
        const currentDateTime = new Date();
        const hours = currentDateTime.getHours().toString().padStart(2, '0');
        const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    function calculateTaskTime(){
        handleClick();
        calculateUnixTimestamp();
        inputData.time = unixTimestamp;
        let data = JSON.stringify(inputData);
        spawnInstance(fseSpawnTag,data);
    }

    function generateTimeOptions() {
      const options = [];
      for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const formattedHour = hour.toString().padStart(2, '0');
          const formattedMinute = minute.toString().padStart(2, '0');
          options.push(`${formattedHour}:${formattedMinute}`);
        }
      }
      return options;
    }

    function calculateUnixTimestamp() {
        let selectedDateTime = new Date(`${selectedDate}T${selectedTime}`);
        unixTimestamp = selectedDateTime.getTime(); // Convert milliseconds to seconds
        console.log(unixTimestamp);
    }

</script>

<h3 class="start-container">FSE Start Time</h3>

<div class="start-container">

    <div class="input-container">
        <label for="date">Date:</label>
        <input type="date" id="date" bind:value={selectedDate} />
    </div>
    <div class="input-container">
        <label for="time">Time:</label>
        <select id="time" bind:value={selectedTime}>
            {#each timeOptions as timeOption}
            <option value={timeOption}>{timeOption}</option>
            {/each}
        </select>
    </div>

</div>
<div class="start-container">
    <a href="#" class="select-button" on:click={()=> calculateTaskTime()}>Start</a>
    <a href="#" class="select-button" on:click={()=> handleClick()}>Cancel</a>
</div>

<style>

    .start-container {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .select-button{
        display: inline-block;
        background-color: #e0e0e0;
        color: #000000;
        border: 1px solid #000;
        cursor: pointer;
        text-decoration: none;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        width: 50px;
        text-align: center;
        margin: 5px;
    }

    .input-container{
        margin: 10px;
    }
</style>