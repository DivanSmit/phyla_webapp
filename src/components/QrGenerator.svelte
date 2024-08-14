<script>
    import { onMount } from 'svelte';
    import QRCode from 'qrcode';

    let qrString = '';
    let qrCodeDataURL = '';

    async function generateQRCode() {
        try {
            qrCodeDataURL = await QRCode.toDataURL(qrString);
        } catch (err) {
            console.error(err);
        }
    }

    function downloadQRCode() {
        const link = document.createElement('a');
        link.href = qrCodeDataURL;
        link.download = 'qrcode.png';
        link.click();
    }
</script>

<style>
    .qr-container {
        text-align: center;
        margin-top: 20px;
    }

    .qr-image {
        margin: 20px 0;
    }
</style>

<div class="qr-container">
    <h2>Generate QR Code</h2>
    <input type="text" bind:value={qrString} placeholder="Enter text for QR code" />
    <button on:click={generateQRCode}>Generate QR Code</button>

    {#if qrCodeDataURL}
        <div class="qr-image">
            <img src={qrCodeDataURL} alt="QR Code" />
        </div>
        <button on:click={downloadQRCode}>Download QR Code</button>
    {/if}
</div>