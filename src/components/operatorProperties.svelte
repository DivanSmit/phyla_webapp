<script>
    import {spawnInstance} from "$lib/connect_to_BASE.js";
    import { createEventDispatcher } from 'svelte';
    import {generateInput} from "$lib/supplementary_functions.js";

    let response = [];
    let inputData = {
        name: '',
        surname: '',
        password: '',
        role: 'Operator',
        workerID: '',
        lunchTime: '13:00'
    };

    let roles = ['Operator', 'Facility Manager'];
    let times = generateTimeList();

    function generateTimeList() {
        const timeList = [];
        const startTime = 8 * 60; // 8:00 converted to minutes
        const endTime = 17 * 60; // 17:00 converted to minutes
        const interval = 15; // 15-minute interval

        for (let minutes = startTime; minutes <= endTime; minutes += interval) {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;

            // Format the time as HH:mm
            const formattedTime = `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
            
            timeList.push(formattedTime);
        }

        return timeList;
    }

    let operatorSpawnTag = "SPAWN_OPERATOR_INSTANCE";

    let keyValues = {
        "Operator": operatorSpawnTag,
        "Facility Manager": null
    };

     const dispatch = createEventDispatcher();

     function handleClick() {
        dispatch('buttonClick', { message: 'Button clicked!' });
    }

    async function spawnInstanceRequest(tag1 = ""){
        handleClick();
        let data = JSON.stringify(inputData);
        // TODO add checks to ensure that all the data is correct
        // @ts-ignore
        let request = keyValues[tag1];
        if(request==undefined){
            alert('Undefined Type!')
        }else{
            response = await spawnInstance(request,data);
        }
    }

    function autoInput(){
        inputData = generateInput();
    }

</script>

<div class="button-container">
    Enter the details below:
</div>

<form>

    <div class="button-container">
        <label for="name">Name:</label>
        <input type="text" id="name" bind:value={inputData.name} placeholder="Enter your name" />
    </div>
    <div class="button-container">
        <label for="surname">Surname:</label>
        <input type="text" id="surname" bind:value={inputData.surname} placeholder="Enter your surname" />
    </div>
    <div class="button-container">
        <label for="password">Password:</label>
        <input type="password" id="password" bind:value={inputData.password} placeholder="Enter your password" />
    </div>
    <div class="button-container">
        <label for="id">ID:</label>
        <input type="text" id="id" bind:value={inputData.workerID} placeholder="Enter your ID" />
    </div>
    <div class="button-container">
        <label for="role">Role:</label>
        <select id="role" bind:value={inputData.role}>
            {#each roles as role}
              <option value={role}>{role}</option>
            {/each}
        </select>
    </div>
    <div class="button-container">
        <label for="title">Lunch:</label>
        <select id="title" bind:value={inputData.lunchTime}>
            {#each times as time}
                <option value={time}>{time}</option>
            {/each}
        </select>
    </div>
    <div class="button-container">
        <a href="#" class="select-button" on:click={()=> spawnInstanceRequest(inputData.role)}>Save</a>
        <a href="#" class="select-button" on:click={()=> handleClick()}>Cancel</a>
        <a href="#" class="select-button" on:click={()=> autoInput()}>Auto Gen</a>

    </div>
</form>

<style>
    .button-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 20px;
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
    }
</style>