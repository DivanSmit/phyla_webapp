<script>
    import {spawnInstance} from "$lib/connect_to_BASE.js";
    import { createEventDispatcher } from 'svelte';
    import {generateRoom} from "$lib/supplementary_functions.js";

    let response = [];
    let inputData = {
        name: '',
        type: '',
        size: ['','','']
    };

    let types = ['Cold Storage Room', 'Controlled Atmosphere Room','Storage Room','Rearing Room','Facility Room'];

    var myKeys = {
        'Cold Storage Room': 'cold_storage_room', 
        'Controlled Atmosphere Room': 'ca_room',
        'Storage Room': 'storage_room',
        'Rearing Room': 'rearing_room',
        'Facility Room': 'facility_room'
    };

    let facilityRoomSpawn = "SPAWN_FACILITY_ROOM_INSTANCE";

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('buttonClick', { message: 'Button clicked!' });
    }

    async function spawnInstanceRequest(){
        handleClick();
        inputData.type = myKeys[inputData.type];
        let data = JSON.stringify(inputData);
        // TODO add checks to ensure that all the data is correct

        response = await spawnInstance(facilityRoomSpawn,data);

    }

    function autoInput(){
        inputData = generateRoom();
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
        <label for="input1">W(m):</label>
        <input class="input-size" bind:value={inputData.size[0]} on:input={() => validateInput(inputData.size[0])}>

        <label for="input2">L(m):</label>
        <input class="input-size" bind:value={inputData.size[1]} on:input={() => validateInput(inputData.size[1])}>

        <label for="input3">H(m):</label>
        <input class="input-size" bind:value={inputData.size[2]} on:input={() => validateInput(inputData.size[2])}>
    </div>
    <div class="button-container">
        <a href="#" class="select-button" on:click={() => spawnInstanceRequest()}>Save</a>
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
        width: 30px;
    }
</style>