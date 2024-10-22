<script>
    // @ts-nocheck
    
        import { data_exchange } from '$lib/connect_to_BASE';
        import { onMount } from 'svelte';
        import { createEventDispatcher } from 'svelte';
        import { calculateUnixTimestamp } from '$lib/stores';
        import { getCurrentUnixTimestamp } from '$lib/stores';
    
        let trialName = '';
        let reportType = '';
        let fileName = '';
    
        let ReportCapabilities = "REPORT_GENERATOR_INSTANCE_INFO";
    
        let selectedData = {
            name: trialName,
            reportType: reportType,
            file: fileName
        }
    
        let isInputVisible = true;
        let reportResponse = null;
    
        // async function fetchData(){
        //     // Example data for dropdown list
        //     let response = await data_exchange(ReportCapabilities, "generateTrialReport", selectedData);
        //     console.log(response)
        //     dropdownList = response[0]
        //     console.log(dropdownList)
        // }
    
        const dispatch = createEventDispatcher();
    
        function handleClick() {
            dispatch('buttonClick', { message: 'Button clicked!' });
        }
    
        async function generateReport() {

            selectedData.name = trialName;
            selectedData.reportType = reportType;
            selectedData.file = fileName;
    
            let response = await data_exchange(ReportCapabilities, "generateTrialReport", selectedData);
            reportResponse = response[0];
            console.log(reportResponse)
            isInputVisible = false; // Hide the form
        }

    </script>
    
    <div class="main">
    
        <label for="name">Trial name:</label>
        <input type="text" id="name" bind:value={trialName} placeholder="Enter file name" />

        <label for="name">Type:</label>
        <input type="text" id="name" bind:value={reportType} placeholder="Enter file name" />
    

        <label for="name">File Name:</label>
        <input type="text" id="name" bind:value={fileName} placeholder="Enter file name" />
    
        <div class="button-container">
            <a href="#" class="button" on:click|preventDefault={() => generateReport()}>Generate</a>
            <a href="#" class="button" on:click|preventDefault={() => handleClick()}>Cancel</a>
        </div>
        
        {#if reportResponse}
            <div class="report-section">
                <h3>Report Results:</h3>
                <div class="report-container">
                    
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