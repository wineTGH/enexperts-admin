<script lang="ts">
	import { readable } from 'svelte/store';
	import UsersTable from '$lib/components/custom/table/users-table.svelte';

	// import type { PageData } from './$types';

	// export let data: PageData;

	const users = readable([
		{
			id: 1,
			username: 'test1',
			email: 'test1@me.com'
		},
		{
			id: 2,
			username: 'test2',
			email: 'test2@me.com'
		},
		{
			id: 3,
			username: 'test3',
			email: 'test3@me.com'
		}
	]);
</script>

<div class="container mx-auto py-10">
    <UsersTable users={users}/>
</div>
