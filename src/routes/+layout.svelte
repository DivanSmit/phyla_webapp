

<script>
// @ts-nocheck
    import { goto } from '$app/navigation';
    import { usernameStore } from '$lib/stores';
	import { userInteraction } from '$lib/connect_to_BASE';
    import { onMount } from 'svelte';
  
    let ifLoggedIn = false; // Assuming this controls whether user is logged in
    let username = '';
    let password = '';
    let userType = ''; // This will be set based on backend response
    let response = {}
    let showError = false;
  
    async function handleSubmit() {
        if(username == 'offline'){
            userType = 'facility_manager';
            updateNav();
            ifLoggedIn = true;
            console.log("First Username: ",username)
            usernameStore.set(username);
            goto('/');
        }else{

            response = await userInteraction(username, 'LOGIN', password)
            console.log(response)

            if (response[0].reply == 'OK') {
                userType = response[0].role;
                updateNav();
                ifLoggedIn = true;
                console.log("First Username: ",username)
                usernameStore.set(username);
                goto('/');
            }else{
                showError = true;
            }
        }
    }
  
    function logout() {
      ifLoggedIn = false;
      username = '';
      password = '';
      userType = '';
      goto('/');
      usernameStore.set("");

      // Redirect to login page or do any other cleanup

    }
  
    // Example navigation items based on user type
    let navItems = [];
  
    // Update navigation items based on userType
    function updateNav() {
      if (userType === 'facility_manager') {
        navItems = [
            {name: 'Home', url: '/' },
            {name: 'Resources', url:'/operators'},
            {name: 'Processes', url:'/processes'},
            {name: 'Schedule', url: '/currentUser' },
            {name: 'Report', url:'/report'}

        ];
      } else if (userType === 'operator') {
        navItems = [
            { name: 'Home', url: '/' },
            {name: 'Schedule', url:'/currentUser'}
        ];
      } else {
        navItems = [
          { name: 'Home', url: '/' }
        ];
      }
    }
  
    // Call updateNav on component mount and userType change
    onMount(updateNav);
  </script>

<style>
    /* Ensure the container class centers its contents vertically and horizontally */
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100vh;
        width: 100vw; /* Add full width for centering horizontally */
    }

    /* Form styling */
    .form {
        background-color: #91ce41;
        border: 1px solid #000; /* Add solid border definition */
        border-radius: 8px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        text-align: center;
        max-width: 400px; /* Add max-width to control form width */
        width: 100%; /* Ensure form takes full width up to max-width */
    }

    /* Input styling */
    .input {
        width: 90%; /* Adjusted to fit better within the form box */
        padding: 10px;
        margin: 10px 0;
        border: 1px solid #ccc;
        border-radius: 4px;
    }


    /* Button styling */
    .button-login {
        background-color: #007BFF;
        color: #fff; /* Change text color to white for better contrast */
        border: none; /* Remove double border */
        padding: 10px 20px;
        border-radius: 4px;
        cursor: pointer;
    }

    /* Navigation styling */
    nav {
        display: flex;
        background-color: #91ce41;
        color: black;
        transition: transform 0.2s, font-size 0.2s;
        height: 30px;
        width: 100%;
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

    li {
        margin-right: 20px;
        align-items: center;
    }

    h1 {
        margin: 0;
        font-size: 1.5em;
        font-weight: normal;
    }

    a {
        text-decoration: none;
        color: black;
        text-align: end;
    }

    footer {
        color: #000;
        padding: 10px 0;
        text-align: center;
    }

    main.home-container {
        background: linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), url('/hortgro-logo.jpg');
        background-size: auto 100%; /* Auto width, 100% height */
        background-position: left center; /* Align to the left */
        height: 95vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

</style>

{#if !ifLoggedIn}
    <main class="home-container">
        <div class="container">
            <div class="form">
                <h2>Login</h2>
                <input class="input" type="text" placeholder="Username" bind:value={username} />
                <input class="input" type="password" placeholder="Password" bind:value={password} />
                <button class="button-login" on:click={handleSubmit}>Login</button>
            </div>
            {#if showError}
                <p style="color: red;">Incorrect username or password.</p>
            {/if}
        </div>

        <footer>
            <p>&copy; 2024 Stellenbosch University</p>
        </footer>
    </main>

  
{:else}
    
  <nav>
    <h1>Hortgro Operation Interface</h1>
    <ul>
      {#each navItems as item}
        <li><a href={item.url}>{item.name}</a></li>
      {/each}   
      <li><button on:click={logout}>Logout</button></li>
    </ul>
  </nav>
  <main>
    <slot/>
  </main>
{/if}


