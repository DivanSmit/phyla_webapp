<script>
// @ts-nocheck

    import { onMount, onDestroy } from 'svelte';
    import { Html5Qrcode } from 'html5-qrcode';

    let scanCompleted = false;
    let decodedText = '';
    let html5QrCode;
    let errorMessage = '';

    onMount(() => {
        startScan();
    });

    onDestroy(() => {
        stopScan();
    });

    function startScan() {
        html5QrCode = new Html5Qrcode("reader");

        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        html5QrCode.start(
            { facingMode: "environment" },
            config,
            onScanSuccess,
            onScanError
        ).catch(err => {
            errorMessage = 'Failed to start QR scanner: ' + err;
            console.error(errorMessage);
        });
    }

    function stopScan() {
        if (html5QrCode) {
            html5QrCode.stop().catch(err => console.error('Failed to stop QR scanner', err));
        }
    }

    function onScanSuccess(decodedTextResult) {
        decodedText = decodedTextResult;
        console.log(`Code scanned: ${decodedText}`);
        scanCompleted = true;

        stopScan();
    }

    function onScanError(err) {
        if (err.name === 'NotFoundException') {
            errorMessage = 'No QR code found. Please ensure the QR code is in the frame and try again.';
        } else {
            errorMessage = `Error scanning: ${err.message}`;
        }
        console.log(errorMessage);
    }

    function startNewScan() {
        scanCompleted = false;
        decodedText = '';
        errorMessage = '';
        startScan();
    }
</script>

{#if !scanCompleted}
    <div id="reader" style="width: 500px; height: 500px;"></div>
    {#if errorMessage}
        <p style="color: red;">{errorMessage}</p>
    {/if}
    <button on:click={startNewScan}>Start New Scan</button>
{:else}
    <p>Scan complete! Code: {decodedText}</p>
    <button on:click={startNewScan}>Scan Again</button>
{/if}
