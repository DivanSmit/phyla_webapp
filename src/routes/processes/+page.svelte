<script>
    // @ts-nocheck
    
    import ResourceColumn from "../../components/resourceColumn.svelte";
    import ProcessStepProperties from "../../components/processStep.svelte";
    import ProcessTaskProperties from '../../components/processTask.svelte';
    import ScheduleProcessProperties from '../../components/scheduleProcess.svelte';
    import TreeView from "../../components/TreeView.svelte";
    import { spawnInstance } from "$lib/connect_to_BASE";
    
    let isInputVisible = false;
    let button = '';
    let showTreeConfig = false;
    let selectedPattern = {};
    let processTaskType = "SPAWN_PROCESS_TASK_INSTANCE";
    
    function showInput(event, state = '') {
        event.preventDefault();

        if (isInputVisible && state === button) {
            isInputVisible = false;
            showTreeConfig = false;
        } else {
            isInputVisible = true;
        }

        button = state;
    
    }
    
    let childComponentRef;

    function handlePatternSelect(event) {
        selectedPattern = event.detail.pattern;
        showTreeConfig = true;
        console.log("Show Tree: ",showTreeConfig)
    }
    
    async function scheduleProcess() {
        showTreeConfig = false
        const valueFromChild = childComponentRef.getValue();
        let response = await spawnInstance(processTaskType, valueFromChild)
        console.log(valueFromChild);
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
                <a href="#" class="button" on:click|preventDefault={(event) => showInput(event, 'processTask')}>Create Process</a>
                <a href="#" class="button" on:click|preventDefault={(event) => showInput(event, 'scheduleProcess')}>Schedule Process</a>
            </div>

            {#if showTreeConfig}
                <main>
                    <h1>Configure Process Structure</h1>
                    <TreeView bind:this={childComponentRef} node={selectedPattern}/>
                    <button class="button" on:click={scheduleProcess}>Schedule Process</button>
                    <button class="button" on:click={()=> showTreeConfig=false}>Cancel Scheduling</button>

                </main>
            {/if}
        </div>
    
        {#if isInputVisible}
            <div class="column properties-column">
                {#if button === 'processStep'}
                    <ProcessStepProperties on:buttonClick={(event) => showInput(event, 'processStep')}/>
                {:else if button === 'processTask'}
                    <ProcessTaskProperties on:buttonClick={(event) => showInput(event, 'processTask')} />
                {:else if button === 'scheduleProcess'}
                <ScheduleProcessProperties 
                    on:buttonClick={(event) => showInput(event, 'scheduleProcess')} 
                    on:savePattern={handlePatternSelect} />
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
        flex-wrap: wrap;
    }
    
    .button {
        display: inline-block;
        padding: 15px 30px;
        margin: 10px;
        background-color: #91ce41;
        color: #000;
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
    
    .mainText {
        text-align: center;
        margin: 10px 0 20px;
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
    }
    
    .data-column, .properties-column {
        flex: 4;
    }

    </style>
    