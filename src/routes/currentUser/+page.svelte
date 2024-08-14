<script>
    // @ts-nocheck
    
        import { onMount, onDestroy } from 'svelte';
        import { userInteraction, getuserData} from '$lib/connect_to_BASE.js';
        import { usernameStore } from '$lib/stores';
        import QrScanner from '../../components/qrscanner.svelte';
        import QrGenerator from '../../components/QrGenerator.svelte';
        import TaskComponent from '../../components/userTask.svelte';

        let taskData = [];
        let username = '';

        const unsubscribe = usernameStore.subscribe(value => {
            username = value;
            console.log("Username: ",username)
        });

        onMount(async () => {
            const response = await getuserData(username, "TASKSID"); // Example of using username in data fetching
            taskData = response[0]
            console.log(taskData)
        });

        onDestroy(() => {
            unsubscribe(); // Clean up subscription to usernameStore to avoid memory leaks
        });
    
</script>
    
<h2>Welcome {username}</h2>
<div class="element-list">

    {#if taskData.length == 0}
        <div class="element-row">No Tasks</div>
    {:else}
        {#each taskData as task}
            <TaskComponent largeTaskObject={task}/>
        {/each}
    {/if}


    <QrGenerator />
</div>

<style>

    .element-list {
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 600px;
        margin: 0 auto;
    }

    .element-row {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 20px;
        border: 2px solid #000000;
        margin: 10px 0;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-sizing: border-box;
    }

    .column {
        width: 100%;
        box-sizing: border-box;
    }

    .task-name {
        font-weight: bold;
        font-size: 1.2em;
        margin-bottom: 10px;
        text-align: center;
    }

    .task-time {
        font-size: 1em;
        margin-bottom: 10px;
        text-align: center;
    }

    .task-desc {
        width: 100%;
        margin-bottom: 10px;
    }

    .task-desc textarea {
        width: calc(100% - 20px);
        height: 60px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        resize: none;
        box-sizing: border-box;
    }

    .input-field {
        width: 100%;
        margin-bottom: 10px;
    }

    .input-field input {
        width: calc(100% - 20px);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    .buttons {
        display: flex;
        justify-content: center;
    }

    button {
        padding: 10px 20px;
        background-color: #007BFF;
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin: 2px;
        width: 100px;
    }

    button:hover {
        background-color: #0056b3;
    }
</style>

    <!-- 

        
        {#each taskTime as item, index (item)}
            {#if new Date(item) <= new Date()}
                <div class="element-row">
                    <div class="column task-name">{taskNames[index]}</div>
                    <div class="column task-time">{item}</div>
                    <div class="column task-desc">
                        <textarea placeholder="Task description"></textarea>
                    </div>
                    <div class="column input-field">
                        <input type="text" placeholder="Input value" />
                    </div>
                    <div class="buttons">
                        <button on:click={() => handleTask(index, "StartTask")}>Start Task</button>
                        <button on:click={() => handleTask(index, "EndTask")}>End Task</button>
                    </div>
                </div>
            {/if}
        {/each}
    {/if} -->

