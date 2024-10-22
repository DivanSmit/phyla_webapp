<script>
// @ts-nocheck
    import { newComponent } from "$lib/connect_to_BASE.js";
    import { createEventDispatcher } from 'svelte';
    import {onMount} from "svelte";
    import { get_data } from "$lib/connect_to_BASE.js";

    let processStepData = {
        processType: '',
        FSM: 'contracting_exe_FSM',
        duration: 0,
        description: '',
        truAction:'None',
        resources: []
    };

    let componentData = {
        capabilities: '',
        name: '',
        change: 0,
        port: 0
    };

    let componentList = [];
    let processStepType = "SPAWN_PS_INSTANCE";
    let response = {}
    let listOfCapabilities = []
    let actions = ['None','Move','Measure' , 'Store', 'Transform']

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('buttonClick', { message: 'Button clicked!' });
    }

    function addComponent() {
        componentList = [...componentList, { ...componentData }];
        componentData = {
            capabilities: '',
            name: '',
            change: 0,
            port: 0
        };
    }

    async function saveProcessStep() {
        handleClick();
        
        processStepData.resources = componentList;
        console.log("Process Step Data: ", processStepData);

        response = await newComponent(processStepType, processStepData)

    }

    async function fetchData(){
        let response = await get_data(processStepType,"ALL_CAP")
        listOfCapabilities = response[0]
        console.log(listOfCapabilities)
    }

    onMount(()=>{
        fetchData();
    })
</script>

<div class="form-container">
    <div class="form-title">Enter the Process Step Details:</div>

    <form>
        <div class="input-group">
            <label for="name">Process Step Name:</label>
            <input type="text" id="name" bind:value={processStepData.processType} placeholder="Enter process step name" />
        </div>
        <!-- <div class="input-group">
            <label for="FSM">FSM:</label>
            <input type="text" id="FSM" bind:value={processStepData.FSM} placeholder="Enter FSM" />
        </div> -->

        <div class="input-group">
            <label for="duration">Typical Duration:</label>
            <input type="number" id="duration" bind:value={processStepData.duration} placeholder="Enter duration" />
        </div>
        <div class="input-group">
            <label for="description">Description:</label>
            <textarea id="description" bind:value={processStepData.description} placeholder="Enter description"></textarea>
        </div>

        <div class="input-group">
            <label for="capabilities">TRU Action:</label>
            <select id="capabilities" bind:value={processStepData.truAction}>
                {#each actions as act}
                    <option value={act}>{act}</option>
                {/each}
            </select>
        </div>

        <div class="form-title">Resources</div>
        <div class="components-container">
            {#each componentList as component, index}
                <div class="component-card">
                    <div class="component-header">Resource {index + 1}</div>
                    <div class="component-body">
                        <p><strong>Capabilities:</strong> {component.capabilities}</p>
                        <p><strong>Name:</strong> {component.name}</p>
                        <p><strong>Change:</strong> {component.change}</p>
                        <p><strong>Port:</strong> {component.port}</p>
                        
                    </div>
                </div>
            {/each}
        </div>

        <div class="form-title">Add Resource</div>
        <div class="input-group">
            <label for="capabilities">Capabilities:</label>
            <select id="capabilities" bind:value={componentData.capabilities}>
                {#each listOfCapabilities as option}
                    <option value={option}>{option}</option>
                {/each}
            </select>
        </div>
        <div class="input-group">
            <label for="componentName">Resource Name (If specific is required):</label>
            <input type="text" id="componentName" bind:value={componentData.name} placeholder="Enter resource name" />
        </div>
        <div class="input-group">
            <label for="change">Change:</label>
            <input type="number" id="change" bind:value={componentData.change} placeholder="Enter change (positive or negative)" />
        </div>
        <div class="input-group">
            <label for="port">Port:</label>
            <input type="number" id="port" bind:value={componentData.port} placeholder="Enter port" />
        </div>
        <div class="button-group">
            <a href="#" class="button" on:click|preventDefault={addComponent}>Add Resource</a>
        </div>

        <div class="button-group">
            <a href="#" class="button" on:click|preventDefault={saveProcessStep}>Save</a>
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
    .input-group textarea {
        width: 80%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    .input-group textarea {
        height: 80px;
    }

    .components-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 10px;
        margin-bottom: 20px;
    }

    .component-card {
        width: 80%;
        padding: 10px;
        border: 1px solid #000;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .component-header {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 10px;
        color: #333;
        text-align: center;
    }

    .component-body p {
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
