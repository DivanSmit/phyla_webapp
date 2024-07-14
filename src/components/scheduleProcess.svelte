<script>
// @ts-nocheck
    import { newComponent } from "$lib/connect_to_BASE.js";
    import { createEventDispatcher } from 'svelte';
    import {onMount} from "svelte";
    import { get_data } from "$lib/connect_to_BASE.js";

    let processTaskType = "SPAWN_PROCESS_TASK_INSTANCE";

    // Sample dropdown options for Child
    let listOfProcesses = [];
    let selectedPattern = {};

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('buttonClick', { message: 'Button clicked!' });
    }

    function handleSave() {
        dispatch('savePattern', { pattern: selectedPattern });
    }

    async function getProcessStructure() {
        handleClick();
        let response = await get_data(processTaskType,selectedPattern)
        selectedPattern = response[0]
        console.log(selectedPattern)
        handleSave()
    }

    async function fetchData(){
        let response = await get_data(processTaskType,"query_options")
        listOfProcesses = response[0]

    }

    onMount(()=>{
        fetchData();
    })
</script>

<div class="form-container">
    <div class="form-title">Select a process structure to choose from:</div>

    <form>
        <div class="input-group">
            <label for="capabilities">Available Processes:</label>
            <select id="capabilities" bind:value={selectedPattern}>
                {#each listOfProcesses as pattern}
                    <option value={pattern}>{pattern}</option>
                {/each}
            </select>
        </div>


        <div class="button-group">
            <a href="#" class="button" on:click|preventDefault={getProcessStructure}>Save</a>
            <a href="#" class="button" on:click|preventDefault={handleClick}>Cancel</a>
        </div>
    </form>
</div>


<style>
    .form-container {
        max-width: 800px;
        margin: auto;
        padding: 20px;
        border: 2px solid #000;
        border-radius: 10px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        background-color: #f8f9fa;
    }

    .form-title {
        text-align: center;
        font-size: 24px;
        margin-bottom: 20px;
        font-weight: bold;
        color: #333;
    }

    .input-group {
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .input-group label {
        margin-bottom: 5px;
        font-weight: bold;
        color: #333;
    }

    .input-group input,
    .input-group select {
        width: 80%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .form-answer-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .form-answer {
        width: 80%;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .form-answer-header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
        text-align: center;
    }

    .form-answer-body p {
        margin: 5px 0;
        color: #555;
    }

    .button-group {
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #91ce41;
        color: #000;
        border: 2px solid #000;
        border-radius: 50px;
        cursor: pointer;
        font-size: 18px;
        text-decoration: none;
        transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        text-align: center;
    }

    .button:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }
</style>
