<script>
// @ts-nocheck
    import { newComponent } from "$lib/connect_to_BASE.js";
    import { createEventDispatcher } from 'svelte';
    import {onMount} from "svelte";
    import { get_data } from "$lib/connect_to_BASE.js";

    let processTaskData = {
        name: '',
        children: []
    };

    let formAnswerList = [];
    let processStepType = "SPAWN_PS_INSTANCE";
    let processTaskType = "SPAWN_PROCESS_TASK_INSTANCE";

    // Sample dropdown options for Child
    let listOfProcessSteps = [];

    let formData = {
        child: '',
        predecessor: 0,
        startTime: 0
    };

    function addChild() {
        formAnswerList = [...formAnswerList, { ...formData }];
        formData = {
            child: '',
            predecessor: 0
        };
    }

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('buttonClick', { message: 'Button clicked!' });
    }

    async function saveProcessTask() {
        handleClick();
        
        processTaskData.children = formAnswerList;
        let response = await newComponent(processTaskType, processTaskData)

    }


    async function fetchData(){
        let response = await get_data(processTaskType,"All_Processes")
        listOfProcessSteps = response[0]
        console.log(listOfProcessSteps)
    }

    onMount(()=>{
        fetchData();
    })
</script>

<div class="form-container">
    <div class="form-title">Enter the Process Task Details:</div>

    <form>
        <div class="input-group">
            <label for="name">Process Task Name:</label>
            <input type="text" id="name" bind:value={processTaskData.name} placeholder="Enter process task name" />
        </div>
    </form>

    <div class="form-title">Form Answers</div>
    <div class="form-answer-container">
        {#each formAnswerList as answer, index}
            <div class="form-answer">
                <div class="form-answer-header">Form Answer {index + 1}</div>
                <div class="form-answer-body">
                    <p><strong>Child:</strong> {answer.child}</p>
                    <p><strong>Predecessor:</strong> {answer.predecessor}</p>
                </div>
            </div>
        {/each}
    </div>

    <div class="form-title">Add Form Answer</div>
    <div class="input-group">
        <label for="child">Child:</label>
        <select id="child" bind:value={formData.child}>
            {#each listOfProcessSteps as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>
    <div class="input-group">
        <label for="predecessor">Predecessor:</label>
        <input type="number" id="predecessor" bind:value={formData.predecessor} placeholder="Enter predecessor" />
    </div>
    <div class="button-group">
        <a href="#" class="button" on:click|preventDefault={addChild}>Add Child</a>
    </div>

    <div class="button-group">
        <a href="#" class="button" on:click|preventDefault={saveProcessTask}>Save</a>
    </div>
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
