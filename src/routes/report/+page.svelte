<script>
    // @ts-nocheck

    import Section1 from "../../components/reports_components/operator_performance.svelte";
    import Section2 from "../../components/reports_components/facility_room_data.svelte";
    import Section3 from "../../components/startFSETask.svelte";

    let isInputVisible = false;
    let button = '';

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
    <h1>Choose a Report Style to Generate</h1>
    <div class="button-container">
        <button class="button" on:click={(event) => showInput(event, 'section1')}>Operator Performance</button>
        <button class="button" on:click={(event) => showInput(event, 'section2')}>Room Data</button>
        <button class="button" on:click={(event) => showInput(event, 'section3')}>Past Processes</button>
    </div>

    {#if isInputVisible}
    <div class="section-container">
        {#if button === 'section1'}
            <Section1 on:buttonClick={(event) => showInput(event, 'section1')}/>
        {/if}
        {#if button === 'section2'}
            <Section2 on:buttonClick={(event) => showInput(event, 'section2')}/>
        {/if}
        {#if button === 'section3'}
            <Section3 />
        {/if}
    </div>
    {/if}


</div>
<style>
    .main {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .section-container {
        display: flex;
        justify-content: space-around;
        width: 100%;
        max-width: 800px;
        margin-top: 20px;
        padding: 20px;
        border: 3px solid #000;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        background-color: #f0f0f0;
    }

    .button-container {
        display: flex;
        justify-content: space-around;
        width: 100%;
        max-width: 800px;
        margin-bottom: 20px;
        border: 3px solid #000;
        border-radius: 10px;
    }

    .button {
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

    .button:hover {
        background-color: #6fa72c;
        transform: scale(1.1);
    }

</style>
