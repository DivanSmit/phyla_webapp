<script>
// @ts-nocheck

    import {onMount} from "svelte";
    import { get_data } from "$lib/connect_to_BASE.js";
    import { unixToGMTPlus2 } from "$lib/stores";

    export let items = [{
      name: "Label Fruit",
      status: "Complete",
      time: 1724927846880 
    },{
      name: "Measure Fruit 1",
      status: "Complete",
      time: 1724927947611
    },{
      name: "maintenance_202",
      status: "Complete",
      time: 1724928191975
    },{
      name: "Measure Fruit 2",
      status: "Complete",
      time: 1724928318255
    },
    {
      name: "Move Fruit",
      status: "Complete",
      time: 1724928440892
    }]; // List of objects to populate the table
  
    // Each item in the list should have 'name', 'status', and 'time' properties.

    async function fetchData(){
        let reply = await get_data("ACTIVITY_INSTANCE","INFO")
        if(reply == null){
            items = []
        }else{
            items = reply
        }
        console.log(reply)
    }

    onMount(()=>{
        fetchData();
    })
  </script>
  
  <style>
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 20px 0;
    }
  
    th, td {
      padding: 10px;
      border: 1px solid #ddd;
      text-align: left;
    }
  
    th {
      background-color: #f2f2f2;
    }
  </style>
  
{#if items.length > 0}
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Status</th>
        <th>Last Recorded Time</th>
      </tr>
    </thead>
    <tbody>
      {#each items as item}
        <tr>
          <td>{item.name}</td>
          <td>{item.status}</td>
          <td>{unixToGMTPlus2(item.time)}</td>
        </tr>
      {/each}
    </tbody>
  </table>
{:else}
  <div class="no-data">No data available</div>
{/if}