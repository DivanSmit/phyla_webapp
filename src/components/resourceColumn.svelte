<script>
// @ts-nocheck


    import {onMount} from "svelte";
    import { get_data } from "$lib/connect_to_BASE.js";

    let operatorInfoTag = "OPERATOR_INSTANCE_INFO";
    let machineInfoTag = "FTA_INSTANCE_INFO";
    let roomInfoTag = "FACILITY_ROOM_INSTANCE_INFO";

    let listOfTags= [operatorInfoTag,machineInfoTag,roomInfoTag];
    let listOfData = [];
    /**
	 * @type {string | any[]}
	 */
    let operatorData = [];
    /**
	 * @type {any[]}
	 */
    let machineData = [];
    // @ts-ignore
    let roomdata = [];

    async function fetchData(){
        let len = listOfTags.length;
        listOfData = [];

        for (let i = 0; i < len; i++) {
            const currentItem = listOfTags[i];
            const responseList = await get_data(currentItem);
            listOfData.push(responseList);
        }

        operatorData = listOfData[0];
        machineData = listOfData[1];
        roomdata = listOfData[2];
    }

    onMount(()=>{
        fetchData();
    })
</script>

<div class="container">

    <a href="#" class="button" on:click={fetchData}>Refresh</a>
    <div class="header">
        <h1>Operators</h1>
    </div>

    <div class="column-blocks">
        <div class="operator-container">

            {#if operatorData.length > 0}
                <div class="data-container">
                    {#each operatorData as item}
                        <div class="block">
                            <p>{item.name}</p>
                        </div>
                    {/each}
                </div>
            {:else}
                <p>No operators</p>
            {/if}
        </div>
    </div>

    <div class="header">
        <h1>Machines</h1>
    </div>

    <div class="column-blocks">
        <div class="operator-container">

            {#if machineData.length > 0}
                <div class="data-container">
                    {#each machineData as item}
                        <div class="block">
                            <p>{item.name}</p>
                        </div>
                    {/each}
                </div>
            {:else}
                <p>No machines</p>
            {/if}
        </div>
    </div>

    <div class="header">
        <h1>Rooms</h1>
    </div>

    <div class="column-blocks">
        <div class="operator-container">

            {#if roomdata.length > 0}
                <div class="data-container">
                    {#each roomdata as item}
                        <div class="block">
                            <p>{item.name}</p>
                        </div>
                    {/each}
                </div>
            {:else}
                <p>No rooms</p>
            {/if}
        </div>
    </div>
</div>

<style>
    .button {
        display: inline-block;
        padding: 15px 30px;
        margin: 10px;
        background-color: #91ce41;
        color: #000000;
        border: 2px solid #000;
        border-radius: 50px;
        cursor: pointer;
        font-size: 18px;
        text-decoration: none;
        transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        width: 150px;
        text-align: center;
    }

    .button:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
    }

    .operator-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

    .data-container {
        display: flex;
        flex-direction: column;
        align-items:center;
        width: 220px;
    }

    .container {
        text-align: center;
    }

    .header {
        background-color: #181818;
        color: #fff;
        padding: 5px;
        text-align: center;
    }

    .column-blocks{
        display: flex;
        flex-direction: column;
        padding: 10px;
    }
    .block {
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        flex: 1; /* Each block takes an equal portion of the row */
        text-align: left;
        width: 200px;
        font-size: 20px;
        padding-left: 10px;
    }
</style>