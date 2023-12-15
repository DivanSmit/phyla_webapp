<script>
// @ts-nocheck

    import {spawnInstance} from "$lib/connect_to_BASE.js";
	import OperatorProperties from "../../components/operatorProperties.svelte";
    import ResourceColumn from "../../components/resourceColumn.svelte";
    
    let isInputVisible = false;
    let response = [];

    let operatorSpawnTag = "SPAWN_OPERATOR_INSTANCE";
    let operatorInfoTag = "OPERATOR_INSTANCE_INFO";
    let machineInfoTag = "FTA_INSTANCE_INFO";
    let machineSpawnTag = "SPAWN_FTA_MACHINE_INSTANCE";

    function showInput(){
        if(isInputVisible){
            isInputVisible = false;
        }else{
            isInputVisible = true;
        }
    }

    async function spawnInstanceRequest(tag1 = "", tag2 = "nothing"){
        isInputVisible =false;
        response = await spawnInstance(tag1,tag2);
    }

</script>

<div class="two-column-layout">
    <div class="column">
        <ResourceColumn />
    </div>
    <div class="column data-column">
        <p class="mainText">Click on a button below:</p>
        <div class="button-container">
            <a href="#" class="button" on:click={showInput}>Add Operator</a>
            <a href="#" class="button" on:click={() => spawnInstanceRequest(machineSpawnTag)}>Add Machine</a>
            <a href="#" class="button" >Add Room</a>
            <a href="#" class="button" >Add Fruit</a>
        </div>
        
    </div>

    
    {#if isInputVisible}
        <div class="column properties-column">
            <OperatorProperties on:buttonClick={showInput}/>
        </div>

    {/if}
</div>

<style>

    .button-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 10px;
        margin: 20px;
    }

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

    .mainText{
        text-align: center;
        margin-top: 10px;
        margin-bottom: 20px;
        font-size: 30px;
    }

    .two-column-layout {
        display: flex;
    }

    .column {
        flex: 1;
        padding: 10px;
        border: 3px solid #000;
        margin: 10px;
        border-radius: 5px;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }

    .data-column {
        flex: 4;
    }

    .properties-column{
        flex: 1.5;
    }


</style>