<script>
    import {spawnInstance} from "$lib/connect_to_BASE.js";
    import { createEventDispatcher } from 'svelte';
    import {generateMachine} from "$lib/supplementary_functions.js";

    let machineSpawnTag = "SPAWN_FTA_MACHINE_INSTANCE";

    let response = [];
    let inputData = {
        name: '',
        type: ''
    };

    let keyValues = {

        "FTA Machine": machineSpawnTag,
    };

    let types = ['FTA Machine'];


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
        inputData = generateMachine();
    }

</script>

<div class="button-container">
    Enter the details below:
</div>

<form>

    <div class="button-container">
        <label for="name">Name:</label>
        <input type="text" id="name" bind:value={inputData.name} placeholder="Enter the name" />
    </div>
    <div class="button-container">
        <label for="name">Port:</label>
        <input type="text" id="name" bind:value={inputData.name} placeholder="Enter TCP port" />
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
        <a href="#" class="select-button" on:click={()=> spawnInstanceRequest(inputData.type)}>Save</a>
        <a href="#" class="select-button" on:click={()=> handleClick()}>Cancel</a>
        <!-- <a href="#" class="select-button" on:click={()=> autoInput()}>Auto Gen</a> -->

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