<script>
    // @ts-nocheck
    
    import QrReaderBox from "./qrReaderBox.svelte"; // Import the child QR scanner component
    
    let scanCompleted = true;
    let decodedText = '';
    let showScanner = true;
    
    // Handle successful scan
    function handleScanSuccess(event) {
        decodedText = event.detail;
        scanCompleted = true;
        showScanner = false; // Hide scanner after successful scan
    }
    
    
    // Start a new scan
    function startNewScan() {
        scanCompleted = false;
        decodedText = '';
        showScanner = true;
    }
    </script>
    
    {#if !scanCompleted}
        {#if showScanner}
            <QrReaderBox on:scanSuccess={handleScanSuccess} />
        {/if}
        <div class="button-container">

        </div>
    {:else}
        <div class="button-container">
            <a href="#" class="button" on:click|preventDefault={(event) => startNewScan()}>Scan QR Code</a>
        </div>
    {/if}

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

    </style>