<nav>
    <h1>Hortgro Operation Interface</h1>
    <ul>
        <li>
            <a href="/">Home</a>
        </li>
        <li>
            <a href="/operators">Resources</a>
        </li>
        <li>
            <a href="/tasks">Tasks</a>
        </li>
        <li>
            <a href="/currentUser">User</a>
        </li>
        <li>
            <a href="/calendar">Calendar</a>
        </li>

    </ul>
</nav>

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
    h1{
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
</style>
<slot/>

<footer>
    <p>&copy; 2024 Stellenbosch University</p>
</footer>