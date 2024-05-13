<script lang="ts">
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';

	import { Button } from '$lib/components/ui/button';
	import { createEventDispatcher } from 'svelte';
  
	export let id: string;

	const dispatch = createEventDispatcher();

	const openAlert = () => {
		dispatch('delete', {
			id: id
		})
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="ghost" builders={[builder]} size="icon" class="relative h-8 w-8 p-0">
			<span class="sr-only">Open menu</span>
			<Ellipsis class="h-4 w-4" />
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.Label>Actions</DropdownMenu.Label>
			<DropdownMenu.Item
				on:click={() => navigator.clipboard.writeText(id)}
				class="hover:cursor-pointer"
			>
				Copy user's ID
			</DropdownMenu.Item>
			<DropdownMenu.Item href={`/dashboard/users/${id}`} class="hover:cursor-pointer">
				View user
			</DropdownMenu.Item>
		</DropdownMenu.Group>
		<DropdownMenu.Separator />
		<DropdownMenu.Item on:click={openAlert} class="hover:cursor-pointer text-red-500">
			Delete user
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>
