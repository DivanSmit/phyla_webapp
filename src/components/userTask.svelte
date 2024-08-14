<script>
// @ts-nocheck

    import { createEventDispatcher } from 'svelte';
    import QrScanner from './qrscanner.svelte';
    import { userInteraction, getuserData} from '$lib/connect_to_BASE.js';


    const dispatch = createEventDispatcher();
    export let largeTaskObject = {};
    let taskName = largeTaskObject.name || 'No Task Name';
    let taskTime = new Date(largeTaskObject.time || 0).toLocaleString() || 'No Start Time';
    let taskDescription = largeTaskObject.description || 'No Description';
    let taskDuration = largeTaskObject.duration ? `${(largeTaskObject.duration / 60000).toFixed(2)} mins` : 'No Duration';
    let taskAction = largeTaskObject.truAction || 'No Action';
    let taskProcessType = largeTaskObject.processType || 'No Process Type';
    let sector = largeTaskObject.sector || 'S';
    let id = largeTaskObject.id || '';
    let username = largeTaskObject.operator || '';

    const handleTask = async (state = "StartTask") => {
        taskStatus = await userInteraction(username, state, id);
    };

    const confirmWIthBase = async (event) =>{
        let value = event.detail;
        console.log('Received event: ',value);
        const response = await userInteraction(username, 'TRU', {id:id, tru:value})
    }
</script>

<div class="task-container">
    <div class="task-header">
        <div class="task-name">{taskName}</div>
        <div class="task-time">{taskTime}</div>
    </div>
    <div class="task-content">
        <div class="task-desc">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label>Description:</label>
            <textarea readonly>{taskDescription}</textarea>
            <QrScanner on:QRValue={confirmWIthBase} />
        </div>

        <div class="task-info">
            <div class="input-field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>TRU Action:</label>
                <input type="text" value={taskAction} readonly />
            </div>
            <div class="input-field">
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label>Task Type:</label>
                <input type="text" value={taskProcessType} readonly />
            </div>
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <div class="input-field">
                <label>Estimated Duration:</label>
                <input type="text" value={taskDuration} readonly />
            </div>
        </div>
    </div>
    <div class="buttons">
        <button on:click={() => handleTask("StartTask")}>Start Task</button>
        <button on:click={() => handleTask("EndTask")}>End Task</button>
        <button on:click={() => handleTask("CancelTask")}>Cancel Task</button>
    </div>
</div>

<style>
    .task-container {
        border: 2px solid black;
        border-radius: 8px;
        padding: 16px;
        margin: 16px 0;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .task-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 16px;
    }

    .task-name {
        font-weight: bold;
        font-size: 1.2em;
        text-align: left;
    }

    .task-time {
        font-size: 1em;
        text-align: right;
    }

    .task-content {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
    }

    .task-desc {
        flex: 2;
    }

    .task-desc label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .task-desc textarea {
        width: 100%;
        height: 60px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: none;
        box-sizing: border-box;
    }

    .task-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .input-field {
        margin-bottom: 10px;
    }

    .input-field label {
        display: block;
        font-weight: bold;
        margin-bottom: 5px;
    }

    .input-field input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .buttons {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
    }

    button {
        padding: 10px 20px;
        background-color: #007BFF;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 0 5px;
        flex: 1;
        max-width: 120px;
    }

    button:hover {
        background-color: #0056b3;
    }

    button:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
</style>