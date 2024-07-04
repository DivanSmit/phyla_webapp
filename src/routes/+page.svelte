
<style>
  nav{
        display: flex;
        background-color: #91ce41;
        color: black;
        transition: transform 0.2s, font-size 0.2s;
        height: 30px;
        
    }
    nav:hover {
        transform: translateY(5px); /* Drop down by 5 pixels on hover */
        font-size: 1.1em; /* Increase the font size */
        text-align: center;  
    }

    ul {
        display: flex;
        margin: 4px;
        margin-left: auto;
        list-style: none;
    }
    li{
        margin-right: 20px;
        align-items: center;
    
    }
    h2{
        margin: 0;
        font-size: 1.5em;
        font-weight: normal;
    }
    a{
        text-decoration: none;
        color: black;
        text-align:end;

    }
    footer {
        color: #000;
        padding: 10px 0;
        text-align: center;
    }

    h1{
      text-align: center;
      font-size: 70px;
    }
    main{
      height: 600px;
    }
    main.home-container {
      background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/hortgro-logo.jpg');
      background-size: auto 100%; /* Auto width, 100% height */
      background-position: left center; /* Align to the left */
      height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
</style>

<main class="home-container">
  <h1>Welcome</h1>
</main>