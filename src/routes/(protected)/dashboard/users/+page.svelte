<script lang="ts">
	import { writable } from 'svelte/store';
	import type { PageData } from './$types';
	
	import UsersTable from '$lib/components/custom/table/users-table.svelte';
	
	export let data: PageData;
</script>

<div class="container mx-auto py-10">
    <UsersTable 
		users={writable(data.users)}
	/>
</div>