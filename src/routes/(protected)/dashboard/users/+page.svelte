<script lang="ts">
	import { readable } from 'svelte/store';
	import UsersTable from '$lib/components/custom/table/users-table.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="container mx-auto py-10">
    <UsersTable users={readable(data.users)}/>
</div>
