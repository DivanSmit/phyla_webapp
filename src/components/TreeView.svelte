<script>
    // @ts-nocheck

    import TreeNode from './TreeView.svelte';

    export let node;
    export let depth = 0;

    let childComponentRef = [];
    let name = '';
    let processID = generateUniqueId();
    let selectedDate = getCurrentDate();
    let selectedHour = getCurrentHour();
    let selectedMinute = getCurrentMinute();
    let customDateTime = false;
    let selectedPredecessor = '';

    let nodeInformation = {
        processType: node.processType,
        name: '',
        processID: '',
        startTime: 0,
        customTime: customDateTime,
        predecessor: 0,
        children: []
    };

    let hourOptions = generateHourOptions();
    let minuteOptions = generateMinuteOptions();

    export function getValue() {
        let valueFromChild = [];

        if (Array.isArray(node.children)) {
            for (let i = 0; i < childComponentRef.length; i++) {
                valueFromChild.push(childComponentRef[i].getValue());
            }
            nodeInformation.children = valueFromChild;
        }

        nodeInformation.name = name;
        nodeInformation.customTime = customDateTime;
        nodeInformation.predecessor = selectedPredecessor;
        nodeInformation.processID = processID;

        if (customDateTime) {
            nodeInformation.startTime = calculateUnixTimestamp()-7200000;
        }

        return nodeInformation;
    }

    function toggleDateTime() {
        customDateTime = !customDateTime;
    }

    function getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }

    function getCurrentHour() {
        return new Date().getHours().toString().padStart(2, '0');
    }

    function getCurrentMinute() {
        return new Date().getMinutes().toString().padStart(2, '0');
    }

    function generateHourOptions() {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            options.push(hour.toString().padStart(2, '0'));
        }
        return options;
    }

    function generateMinuteOptions() {
        const options = [];
        for (let minute = 0; minute < 60; minute++) {
            options.push(minute.toString().padStart(2, '0'));
        }
        return options;
    }

    function calculateUnixTimestamp() {
        const [year, month, day] = selectedDate.split('-').map(Number);
        const hours = parseInt(selectedHour, 10);
        const minutes = parseInt(selectedMinute, 10);

        // Create a Date object in UTC
        let selectedDateTime = new Date(Date.UTC(year, month - 1, day, hours, minutes)); 

        return selectedDateTime.getTime(); 
    }

    function generateUniqueId() {
        return Math.random().toString(36).substr(2, 9); // Generates a random alphanumeric string
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text)
            .then(() => {
                console.log('Copied to clipboard:', text);
                // Optionally show a message or update UI on successful copy
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                // Handle errors or provide feedback to the user
            });
    }
</script>


<ul>
    <li class="node" style="margin-left: {depth * 20}px;">
        <div class="node-content">
            <div class="node-header">{node.processType}</div>
            
            <div class="name-id-container">
                <div class="input-field">
                    <label for="name">Name:</label>
                    <input type="text" id="name" bind:value={name} placeholder="Enter custom name" />
                </div>
            
                <!-- svelte-ignore a11y-click-events-have-key-events -->
                <!-- svelte-ignore a11y-no-static-element-interactions -->
                <div class="id-box" on:click={() => copyToClipboard(processID)}>
                    {processID}
                </div>
            </div>

            <div class="input-container">
                <label for="predecessor">Predecessor ID:</label>
                <input type="text" id="predecessor" bind:value={selectedPredecessor} placeholder="Enter predecessor ID" />
            </div>

            <div class="input-group">
                <label for="custom-time">Custom Start Time:</label>
                <input type="checkbox" id="custom-time" on:change={toggleDateTime} />
                <label for="custom-time">Default is parent manages time</label>
            </div>            

            {#if customDateTime}
                <div class="input-container">
                    <label for="date">Date:</label>
                    <input type="date" id="date" class="date-input" bind:value={selectedDate} />
                </div>
                <div class="input-container">
                    <label for="time">Time:</label>
                    <div class="time-selection">
                        <select id="hour" bind:value={selectedHour}>
                            {#each hourOptions as hourOption}
                                <option value={hourOption}>{hourOption}</option>
                            {/each}
                        </select>
                        <span>:</span>
                        <select id="minute" bind:value={selectedMinute}>
                            {#each minuteOptions as minuteOption}
                                <option value={minuteOption}>{minuteOption}</option>
                            {/each}
                        </select>
                    </div>
                </div>
            {/if}

            {#if node.children && node.children.length > 0}
                <ul>
                    {#each node.children as child, index}
                        <li class="child-node">
                            <TreeNode bind:this={childComponentRef[index]} node={child} depth={depth + 1} />
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </li>
</ul>


<style>
    .id-box {
        display: inline-block;
        border: 2px solid black;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        user-select: none; /* Prevent text selection on click */
        background-color: #f9f9f9;
        transition: background-color 0.3s ease;
        font-family: monospace; /* Ensure consistent font for ID display */
        background-color: #a5a5a5;
        width: 150px; /* Adjust width as needed */
        text-align: center;
        }

        .id-box:hover {
        background-color: #e9e9e9;
        }

        ul {
        list-style-type: none;
        padding-left: 0;
        margin: 0;
        }

        .node {
        margin: 10px 0;
        padding: 10px 10px;
        border: 1px solid #424242;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .node-content {
        display: flex;
        flex-direction: column;
        gap: 5px;
        }

        .node-header {
        font-weight: bold;
        font-size: 1.1em;
        color: #333;
        margin-bottom: 5px;
        }

        .input-group {
        display: flex;
        align-items: center;
        gap: 10px; /* Adjust gap as needed */
        margin-bottom: 10px;
        }

        .input-group label {
        font-size: 0.9em;
        color: #666;
        }

        .input-group input[type="checkbox"] {
        margin-right: 10px; /* Space between checkbox and label */
        }

        .input-container {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-top: 10px;
        }

        .child-node {
        margin-top: 10px;
        padding-left: 20px;
        border-left: 2px solid #ddd;
        }

        .child-node:hover {
        background-color: #f0f0f0;
        border-left-color: #333;
        }

        input[type="text"],
        input[type="date"],
        select {
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 0.9em;
        max-width: 150px;
        }

        input[type="checkbox"] {
        margin-left: 5px;
        }

        .time-selection {
        display: flex;
        align-items: center;
        gap: 5px;
        }

        .time-selection select {
        width: 60px; /* Adjust the width as needed */
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 0.9em;
        }

        .time-selection span {
        font-size: 1.2em;
        color: #333;
        }

        .date-input {
        width: 200px; /* Adjust the width as needed */
        }

        .name-id-container {
        display: flex;
        align-items: center;
        gap: 10px;
        }

        .input-field {
        flex: 1;
        }

        .input-field input {
        width: 100%;
        }

</style>