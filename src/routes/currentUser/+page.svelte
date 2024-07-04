<script>
    // @ts-nocheck
    
        import { onMount } from "svelte";
        import { getuserData } from "$lib/connect_to_BASE.js";
        import { userInteraction } from "$lib/connect_to_BASE.js";
    
        let username = '';
        let password = '';
        let ifLogedIn = false;
        let taskStatus = [];
        let taskData = [''];
        let taskIDs = [''];
        let taskTime = [''];
        let taskNames = [''];
        let selectedItem = '';
        let shoppingList = [];
        let dropdownItems = ['Apple', 'Banana', 'Orange', 'Grapes', 'Mango'];
    
        function handleSubmit() {
            // You can implement the login logic here
            if (password === '') {
                ifLogedIn = true;
                getTaskData();
            } else {
                alert('Login failed');
            }
        }
    
        const handleTask = async (index = 0, state = "StartTask") => {
            taskStatus = await userInteraction(username, state, taskIDs[index]);
        };
    
        const getTaskData = async () => {
            taskData = await getuserData(username, "TASKSID");
            console.log(taskData)
            // @ts-ignore
            taskIDs = taskData[0].id;
            // @ts-ignore
            taskTime = taskData[0].time;
            // @ts-ignore
            taskNames = taskData[0].names;
        }
    
        function convertDateString(dateString = '') {
    
            var parts = dateString.split("-");
            var day = parseInt(parts[0], 10);
            var month = parseInt(parts[1], 10);
            var year = parseInt(parts[2], 10);
    
            var convertedDate = new Date(year, month - 1, day);
    
            var formattedDate = convertedDate.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
            });
    
            return formattedDate;
        }
    
        function addItemToList() {
            if (selectedItem && !shoppingList.includes(selectedItem)) {
                shoppingList = [...shoppingList, selectedItem];
            }
        }
    
</script>
    
    {#if !ifLogedIn}
        <div class="container">
            <div class="form">
                <h2>Login</h2>
                <input class="input" type="text" placeholder="Username" bind:value={username} />
                <!-- <input class="input" type="password" placeholder="Password" bind:value={password} /> -->
                <button class="button-login" on:click={handleSubmit}>Login</button>
            </div>
        </div>
    {:else}
        <div class="button-logout">
            <button on:click={() => ifLogedIn = false}>Log Out</button>
        </div>
        <h2>Welcome {username}</h2>
        <div class="element-list">
    
            {#if !taskTime.length || taskTime[0] == ''}
                <div class="element-row">No Tasks</div>
            {:else}
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
            {/if}
    
            <div class="shopping-section">
                <h3>Shopping List</h3>
                <div class="dropdown">
                    <select bind:value={selectedItem}>
                        <option value="" disabled selected>Select an item</option>
                        {#each dropdownItems as item}
                            <option value={item}>{item}</option>
                        {/each}
                    </select>
                    <button on:click={addItemToList}>Add to List</button>
                </div>
                <ul>
                    {#each shoppingList as item}
                        <li>{item}</li>
                    {/each}
                </ul>
            </div>
        </div>
    {/if}
    
<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
    }

    .form {
        background-color: #91ce41;
        border: 1px;
        border-color: #000;
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        text-align: center;
    }

    .input {
        width: 100%;
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .button-login {
        background-color: #007BFF;
        color: #000000;
        border: 1px solid black;
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .button-logout {
        display: flex;
        justify-content: right;
        margin: 6px;
    }

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

    .shopping-section {
        margin-top: 20px;
        width: 100%;
    }

    .dropdown {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
    }

    .dropdown select {
        width: calc(100% - 110px);
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .dropdown button {
        padding: 10px 20px;
        margin-left: 10px;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-bottom: 5px;
        background-color: #f9f9f9;
    }
</style>
