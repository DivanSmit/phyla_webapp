<script>
// @ts-nocheck

	import { data_exchange } from '$lib/connect_to_BASE';
    import { onMount } from 'svelte';
    import { createEventDispatcher } from 'svelte';
    import { calculateUnixTimestamp } from '$lib/stores';
    import { getCurrentUnixTimestamp } from '$lib/stores';

    let dropdownList = [];
    let selectedOption = '';
    let startDate = '';
    let endDate = '';
    let startTime = '';
    let endTime = '';
    let selectAllData = false;
    let exportFile = false;
    let fileName = '';

    let ReportCapabilities = "REPORT_GENERATOR_INSTANCE_INFO";
    let OperatorCapabilities = "OPERATOR_INSTANCE_INFO";
    let OperatorType = "SPAWN_OPERATOR_INSTANCE";

    let selectedData = {
        selected: '',
        type: OperatorType,
        allData: true,
        startTime: getCurrentUnixTimestamp(),
        endTime: getCurrentUnixTimestamp(),
        exportFile: exportFile,
        fileName: fileName,
    }

    let isInputVisible = true;
    let reportResponse = null;

    async function fetchData(){
        // Example data for dropdown list
        let response = await data_exchange(ReportCapabilities, "RequestForList", OperatorCapabilities);
        console.log(response)
        dropdownList = response[0]
        console.log(dropdownList)
    }

    const dispatch = createEventDispatcher();

    function handleClick() {
        dispatch('buttonClick', { message: 'Button clicked!' });
    }

    async function generateReport() {
        // Create an object to send to backend
        selectedData.allData = selectAllData;
        if(selectAllData == false){
            selectedData.startTime = calculateUnixTimestamp(startDate, startTime)-7200000;
            selectedData.endTime = calculateUnixTimestamp(endDate, endTime)-7200000;
        }

        selectedData.selected = selectedOption;
        selectedData.fileName=fileName;
        selectedData.exportFile = exportFile;

        let response = await data_exchange(ReportCapabilities, "generateReport", selectedData);
        reportResponse = response[0];
        isInputVisible = false; // Hide the form
    }

    onMount(()=>{
        fetchData();
    })
</script>

<div class="main">
    <div class="dropdown-container">
        <label for="dropdown">Select an option:</label>
        <select id="dropdown" bind:value={selectedOption}>
            <option value="" disabled selected>Select an option</option>
            {#each dropdownList as option}
                <option value={option}>{option}</option>
            {/each}
        </select>
    </div>

    <div class="boolean-container">
        <input type="checkbox" id="select-all" bind:checked={selectAllData} />
        <label for="select-all">Select All Operators</label>
    </div>    

    {#if !selectAllData}
        <div class="date-time-container">
            <div class="date-time-group">
                <h3>Start Date and Time</h3>
                <div class="input-group">
                    <input type="date" id="start-date" bind:value={startDate} />
                    <input type="time" id="start-time" bind:value={startTime} />
                </div>

                <h3>End Date and Time</h3>
                <div class="input-group">
                    <input type="date" id="end-date" bind:value={endDate} />
                    <input type="time" id="end-time" bind:value={endTime} />
                </div>
            </div>
        </div>
    {/if}

    <div class="boolean-container">
        <input type="checkbox" id="select-all" bind:checked={exportFile} />
        <label for="select-all">Select All Data</label>

        {#if exportFile}
            <label for="name">File Name:</label>
            <input type="text" id="name" bind:value={fileName} placeholder="Enter file name" />
        {/if}
    </div>  

    <div class="button-container">
        <a href="#" class="button" on:click|preventDefault={() => generateReport()}>Generate</a>
        <a href="#" class="button" on:click|preventDefault={() => handleClick()}>Cancel</a>
    </div>
    
    {#if reportResponse}
        <div class="report-section">
            <h3>Report Results:</h3>
            <div class="report-container">
                {#each reportResponse as report}
                    <div class="report-card">
                        <h4>Operator Performance</h4>
                        <p class="name">Name: {report.name}</p>
                        <p class="total-hours">Total Hours worked: {report.total.toFixed(2)} hours</p>
                        <p class="efficiency">Average Efficiency: {report.efficiency.toFixed(2)}%</p>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>

<style>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
    }

    .dropdown-container, .boolean-container, .button-container, .date-time-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }

    .dropdown-container label,
    .boolean-container label {
        margin-bottom: 5px;
        font-weight: bold;
    }

    .dropdown-container select {
        margin: 10px;
        padding: 10px;
        border: 2px solid #000;
        border-radius: 5px;
        font-size: 16px;
    }

    .boolean-container {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
    }

    .boolean-container input[type="checkbox"] {
        margin-right: 10px;
        width: 20px;
        height: 20px;
    }

    .date-time-container {
        width: 100%;
        max-width: 600px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    .date-time-group {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 10px;
    }

    .date-time-group h3 {
        margin-bottom: 10px;
    }

    .input-group {
        display: flex;
        gap: 10px;
    }

    .input-group label {
        margin: 0;
        font-weight: bold;
    }

    .input-group input {
        padding: 10px;
        border: 2px solid #000;
        border-radius: 5px;
        font-size: 16px;
    }

    .button-container {
        display: flex;
        gap: 10px;
    }

    .button-container .button {
        padding: 10px 20px;
        margin: 10px;
        background-color: #91ce41;
        color: #000000;
        border: 2px solid #000;
        border-radius: 50px;
        cursor: pointer;
        font-size: 16px;
        text-decoration: none;
        transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
    }

    .button-container .button:hover {
        background-color: #6fa72c;
        transform: scale(1.1);
    }

    .report-section {
        margin-top: 40px;
        padding-top: 20px;
        border-top: 2px solid #ccc;
        width: 100%;
        max-width: 600px;
    }

    .report-container {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        margin-top: 20px;
        padding: 20px;
        border: 2px solid #000;
        border-radius: 5px;
        background-color: #f9f9f9;
        width: 100%;
        max-width: 600px;
    }

    .report-card {
        background-color: #f9f9f9;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        padding: 20px;
        width: 300px;
        flex: 1 1 300px;
    }

    .report-card h4 {
        margin-top: 0;
    }

    .report-card p {
        margin: 5px 0;
    }

    .report-card .name {
        font-weight: bold;
        color: #333;
    }

    .report-card .total-hours, .report-card .efficiency {
        color: #555;
    }
</style>