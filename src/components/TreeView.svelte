<!-- TreeView.svelte -->
<script>
    // @ts-nocheck

    import TreeNode from './TreeView.svelte';

    export let node;
    export let depth = 0;

    let childComponentRef = [];
    let name = '';
    let processID = generateUniqueId();
    let selectedDate = getCurrentDate();
    let selectedTime = getCurrentTime();
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

    let timeOptions = generateTimeOptions();

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

        if(customDateTime){
            nodeInformation.startTime = calculateUnixTimestamp();
        }

        return nodeInformation;
    }

    function toggleDateTime() {
        customDateTime = !customDateTime;
    }

    function getCurrentDate() {
        return new Date().toISOString().split('T')[0];
    }

    function getCurrentTime() {
        const currentDateTime = new Date();
        const hours = currentDateTime.getHours().toString().padStart(2, '0');
        const minutes = currentDateTime.getMinutes().toString().padStart(2, '0');
        return hours + ':' + minutes; // Simple string concatenation
    }

    function generateTimeOptions() {
        const options = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 15) {
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');
                options.push(formattedHour + ':' + formattedMinute);
            }
        }
        return options;
    }

    function calculateUnixTimestamp() {
        const [year, month, day] = selectedDate.split('-').map(Number);
        const [hours, minutes] = selectedTime.split(':').map(Number);

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
            <div class="input-group">
                <label for="name">Name:</label>
                <input type="text" id="name" bind:value={name} placeholder="Enter custom name" />
            </div>

            <div class="id-box" on:click={() => copyToClipboard(processID)}>
                {processID}
            </div>

            <div class="input-container">
                <label for="predecessor">Predecessor ID:</label>
                <input type="text" id="predecessor" bind:value={selectedPredecessor} placeholder="Enter predecessor ID" />
            </div>

            <div class="input-group">
                <label>Custom Start Time:</label>
                <input type="checkbox" on:change={toggleDateTime} />
                <label>(Default is parent manages time)</label>
            </div>

            {#if customDateTime}
                <div class="input-container">
                    <label for="date">Date:</label>
                    <input type="date" id="date" bind:value={selectedDate} />
                </div>
                <div class="input-container">
                    <label for="time">Time:</label>
                    <select id="time" bind:value={selectedTime}>
                        {#each timeOptions as timeOption}
                            <option value={timeOption}>{timeOption}</option>
                        {/each}
                    </select>
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
        border: 1px solid #ccc;
        border-radius: 4px;
        padding: 5px 10px;
        cursor: pointer;
        user-select: none; /* Prevent text selection on click */
        background-color: #f9f9f9;
        transition: background-color 0.3s ease;
        font-family: monospace; /* Ensure consistent font for ID display */
        color: #333;
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
        padding: 10px 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .node-content {
        display: flex;
        flex-direction: column;
        gap: 10px;
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
        gap: 5px;
    }

    .input-group label {
        font-size: 0.9em;
        color: #666;
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
    }

    input[type="checkbox"] {
        margin-left: 5px;
    }
</style>
