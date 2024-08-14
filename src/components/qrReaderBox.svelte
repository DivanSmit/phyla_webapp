<script>
    // @ts-nocheck
    
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { Html5Qrcode } from 'html5-qrcode';
    
    const dispatch = createEventDispatcher();
    let html5QrCode;
    let readerElement;
    let oldText = {};
    
    onMount(() => {
        console.log("QrScanner mounted"); // Debug: Log when the component is mounted
        startScan();
    });
    
    onDestroy(() => {
        console.log("QrScanner destroyed"); // Debug: Log when the component is destroyed
        stopScan()
    });
    
    function startScan() {
        if (readerElement) {
            console.log("Starting QR scan"); // Debug: Log when starting the scan
            html5QrCode = new Html5Qrcode(readerElement.id); // Pass the ID string, not the element itself
    
            const config = { fps: 10, qrbox: { width: 250, height: 100 } };
            html5QrCode.start(
                { facingMode: "environment" },
                config,
                onScanSuccess
            ).catch(err => {
                dispatch('scanError', { message: 'Failed to start QR scanner: ' + err });
                console.error('Failed to start QR scanner:', err); // Debug: Log any errors during start
            });
        } else {
            dispatch('scanError', { message: 'QR code reader element not found.' });
            console.error('QR code reader element not found.'); // Debug: Log if the reader element is not found
        }
    }
    
    function stopScan() {
        if (html5QrCode) {
            console.log("Stopping QR scan"); // Debug: Log when stopping the scan
            html5QrCode.stop().catch(err => console.error('Failed to stop QR scanner:', err));
            html5QrCode = null;
        }
        dispatch('scanEnd', '');
    }
    
    function onScanSuccess(decodedTextResult) {
        if(oldText != decodedTextResult){
            console.log("QR Code scanned successfully"); // Debug: Log successful scan
            dispatch('scanSuccess', decodedTextResult);
            oldText = decodedTextResult;
        }

    }
    
    </script>
    
    <div id="reader" bind:this={readerElement}></div>

    <div class="button-container">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a href="#" class="button" on:click|preventDefault={(event) => stopScan()}>Complete Scanning</a>
    </div>

    
<style>

    #reader {
        width: 100%;
        max-width: 300px;
        height: 220px;
        border: 1px solid black;
    }
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
    