<script>
    // @ts-nocheck
    
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { Html5Qrcode } from 'html5-qrcode';
    
    const dispatch = createEventDispatcher();
    let html5QrCode;
    let readerElement;
    
    onMount(() => {
        console.log("QrScanner mounted"); // Debug: Log when the component is mounted
        startScan();
    });
    
    onDestroy(() => {
        console.log("QrScanner destroyed"); // Debug: Log when the component is destroyed
        stopScan();
    });
    
    function startScan() {
        if (readerElement) {
            console.log("Starting QR scan"); // Debug: Log when starting the scan
            html5QrCode = new Html5Qrcode(readerElement.id); // Pass the ID string, not the element itself
    
            const config = { fps: 10, qrbox: { width: 250, height: 250 } };
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
    }
    
    function onScanSuccess(decodedTextResult) {
        console.log("QR Code scanned successfully"); // Debug: Log successful scan
        stopScan();
        dispatch('scanSuccess', decodedTextResult);
    }
    
    </script>
    
    <style>
        #reader {
            width: 100%;
            max-width: 500px;
            height: 400px;
            border: 1px solid black;
        }
    </style>
    
    <div id="reader" bind:this={readerElement}></div>
    