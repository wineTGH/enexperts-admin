<script lang="ts">
    import type { PageData } from './$types';
	import { Line } from 'svelte-chartjs';
    
    export let data: PageData;

    let chartData = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: "My First dataset",
                data: [10, 20, 30, 40, 50, 60, 70],
            }
        ]
    }

    function appendData() {
        
        chartData.labels = [...chartData.labels, 'August'],
        chartData.datasets[0].data = [...chartData.datasets[0].data, 80]
    }
</script>

<Line data={chartData} />