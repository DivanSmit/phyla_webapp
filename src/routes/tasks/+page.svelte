<script>
// @ts-nocheck

    import StartFseTask from "../../components/startFSETask.svelte";
    import StartMoveFruit from "../../components/startMoveFruit.svelte";
    
    let isInputVisible = false;
    let button = 'moveFruit';

    function showInput(event, state = '') {
        event.preventDefault();

        if (isInputVisible && state === button) {
            isInputVisible = false;
        } else {
            isInputVisible = true;
        }

        button = state;
    }  

</script>

<div class="main">

    <div class="two-column-layout">

        <div class="column data-column">
            <p class="mainText">Click on a button below:</p>
            <div class="button-container">
                <a href="#" class="button" on:click|preventDefault={(event) => showInput(event, 'moveFruit')}>Move Fruit</a>
                <a href="#" class="button" on:click|preventDefault={(event) => showInput(event, 'FSETask')}>Fruit Sample Evaluation</a>
            </div>
        </div>
    
        {#if isInputVisible}
            <div class="column properties-column">
                {#if button === 'moveFruit'}
                    <StartMoveFruit on:buttonClick={(event) => showInput(event, 'moveFruit')} />
                {:else if button === 'FSETask'}
                    <StartFseTask on:buttonClick={(event) => showInput(event, 'FSETask')} />
                {:else}
                    <p>Invalid view</p>
                {/if}
            </div>
        {/if}
      
    </div>
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

