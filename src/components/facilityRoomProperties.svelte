<script>
    import {spawnInstance} from "$lib/connect_to_BASE.js";
    import { createEventDispatcher } from 'svelte';
    import {generateInput} from "$lib/supplementary_functions.js";

    let response = [];
    let inputData = {
        name: '',
        type: '',
        size: ['','','']
    };

    let types = ['Cold Storage Room', 'Controlled Atmosphere Room','Storage Room','Rearing Room','Facility Room'];

let facilityRoomSpawn = "SPAWN_FACILITY_ROOM_INSTANCE";

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('buttonClick', { message: 'Button clicked!' });
    }

    async function spawnInstanceRequest(tag1 = ""){
        handleClick();
        let data = JSON.stringify(inputData);
        // TODO add checks to ensure that all the data is correct
        response = await spawnInstance(tag1,data);
    }

    function autoInput(){
        inputData = generateInput();
    }

    function validateInput(value = '0') {
        const floatValue = parseFloat(value);

        if (isNaN(floatValue) || floatValue <= 0) {
            alert(`Please enter a valid positive real number.`);
        }
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
        <label for="role">Type:</label>
        <select id="role" bind:value={inputData.type}>
            {#each types as type}
              <option value={type}>{type}</option>
            {/each}
        </select>
    </div>
    <div class="button-container">
        <label for="input1">Number 1:</label>
        <input class="input-size" bind:value={inputData.size[0]} on:input={() => validateInput(inputData.size[0])}>

        <label for="input2">Number 2:</label>
        <input class="input-size" bind:value={inputData.size[1]} on:input={() => validateInput(inputData.size[1])}>

        <label for="input3">Number 3:</label>
        <input class="input-size" bind:value={inputData.size[2]} on:input={() => validateInput(inputData.size[2])}>
    </div>
    <div class="button-container">
        <a href="#" class="select-button" on:click={() => spawnInstanceRequest(facilityRoomSpawn)}>Save</a>
        <a href="#" class="select-button" on:click={() =>handleClick()}>Cancel</a>
        <a href="#" class="select-button" on:click={() =>autoInput()}>Auto Gen</a>

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
    .input-size {
        width: 80px;
        margin-right: 10px;
    }
</style>