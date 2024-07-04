<script>
// @ts-nocheck

    import ResourceColumn from "../../components/resourceColumn.svelte";
    import ProcessStepProperties from "../../components/processStep.svelte";
    import ProcessTaskProperties from '../../components/processTask.svelte';
    
    let isInputVisible = false;
    let button = '';

    function showInput(event, state = '') {
        event.preventDefault();

        if (isInputVisible && state === button) {
            isInputVisible = false;
            button = '';
        } else {
            isInputVisible = true;
            button = state;
        }
    }

</script>
    
<div class="two-column-layout">
    <div class="column">
        <ResourceColumn />
    </div>
    <div class="column data-column">
        <p class="mainText">Click on a button below:</p>
        <div class="button-container">
            <a href="#" class="button" on:click|preventDefault={(event) => showInput(event, 'processStep')}>Create Process Step</a>
            <a href="#" class="button" on:click|preventDefault={(event) => showInput(event, 'processTask')}>Create Process Task</a>
        </div>
    </div>

    {#if isInputVisible}
        <div class="column properties-column">
            {#if button === 'processStep'}
                <ProcessStepProperties on:buttonClick={showInput} />
            {:else if button === 'processTask'}
                <ProcessTaskProperties on:buttonClick={showInput} />
            {:else}
                <p>Invalid view</p>
            {/if}
        </div>
    {/if}
</div>
    
    <style>
    
        .button-container {
            display: flex;
            justify-content: center;
            align-items: center;
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
            width: 250px;
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
            flex: 2;
        }
    
        .properties-column{
            flex: 2;
        }
    
    </style>
    