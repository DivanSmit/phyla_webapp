<script>
// @ts-nocheck
    import { onMount } from 'svelte';
    import {spawnInstance} from "$lib/connect_to_BASE.js";

    let isDatarecieved = true;
    let selectedDate = getCurrentDate();
    let selectedTime = getCurrentTime();
    let unixTimestamp = null;
    let isInputVisible = false;

    let timeOptions = generateTimeOptions();

    let fseSpawnTag = "SPAWN_FSE_INSTANCE";
    let ftaMeasureSpawnTag = "";
    let moveFruitSpawnTag = "SPAWN_MOVE_FRUIT_INSTANCE";

    async function spawnTaskRequest(tag1 = "", tag2 = ""){
        
        let response = await spawnInstance(tag1, tag2);
        isDatarecieved = true;
    }

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
        showInput();
        calculateUnixTimestamp();
    
        spawnTaskRequest(fseSpawnTag,unixTimestamp);
    }

    function showInput(){
        if(isInputVisible){
            isInputVisible = false;
        }else{
            isInputVisible = true;
        }
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

    onMount(() => {
        // Your code to run after the component is mounted
        isDatarecieved = true;
    });

</script>

<style>
    .main{
        flex: 1;
        padding: 10px;
        border: 3px solid #000;
        margin: 10px;
        border-radius: 5px;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 500px;
    }
    .button {
        display: inline-block;
        padding: 15px 30px;
        margin: 10px;
        background-color: #91ce41;
        color: #000000;
        border: 2px solid #000;
        border-radius: 50px;
        cursor: pointer;
        font-size: 18px;
        text-decoration: none;
        transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        width: 150px;
        text-align: center;
    }
    .button:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

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
<div class="main">
    <div class="start-container">
        <a href="#" class="button" on:click={() =>spawnTaskRequest(moveFruitSpawnTag)}>Move Fruit</a>
        <a href="#" class="button" on:click={showInput}>Start FSE task</a>
    </div>


    <div>
        {#if isInputVisible}
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
                <a href="#" class="select-button" on:click={()=>calculateTaskTime()}>Start</a>
                <a href="#" class="select-button" on:click={()=>showInput()}>Cancel</a>
            </div>

        {/if}
    </div>
</div>

