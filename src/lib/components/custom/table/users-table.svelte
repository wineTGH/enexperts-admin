<script lang="ts">
	import { createTable, createRender, Render, Subscribe } from 'svelte-headless-table';
	import * as Table from '$lib/components/ui/table';
	import { writable, type Writable } from 'svelte/store';
	import UsersActionsCell from '$lib/components/custom/table/users-actions-cell.svelte';
	import UsersInfoCell from './user-info-cell.svelte';
	import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Button } from '$lib/components/ui/button';
	import { enhance } from '$app/forms';

	export let users: Writable<import('lucia').User[]> = writable<import('lucia').User[]>([]);

	let openAlert: boolean = false;
	let userId: string | null = null;

	const table = createTable(users);

	const columns = table.createColumns([
		table.column({
			accessor: ({ username, firstName, lastName, id }) => {
				return { firstName, lastName, username, id };
			},
			header: 'User',
			cell: ({ value }) => {
				return createRender(UsersInfoCell, { ...value });
			}
		}),
		table.column({
			accessor: 'email',
			header: 'Email'
		}),
		table.column({
			accessor: 'role',
			header: 'Role'
		}),
		table.column({
			accessor: ({ id }) => id,
			header: '',
			cell: ({ value }) => {
				return createRender(UsersActionsCell, { id: value }).on(
					'delete', (_) => {
						openAlert = true;
						userId = value;
					}
				);
			}
		})
	]);

	const { headerRows, pageRows, tableAttrs, tableBodyAttrs } = table.createViewModel(columns);
</script>

<header class="">
	
</header>
<section class="rounded-md border">
	<Table.Root {...$tableAttrs}>
		<Table.Header>
			{#each $headerRows as headerRow}
				<Subscribe rowAttrs={headerRow.attrs()}>
					<Table.Row>
						{#each headerRow.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs props={cell.props()}>
								<Table.Head {...attrs}>
									<Render of={cell.render()} />
								</Table.Head>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Header>

		<Table.Body {...$tableBodyAttrs}>
			{#each $pageRows as row (row.id)}
				<Subscribe rowAttrs={row.attrs()} let:rowAttrs>
					<Table.Row {...rowAttrs}>
						{#each row.cells as cell (cell.id)}
							<Subscribe attrs={cell.attrs()} let:attrs>
								<Table.Cell {...attrs}>
									<Render of={cell.render()} />
								</Table.Cell>
							</Subscribe>
						{/each}
					</Table.Row>
				</Subscribe>
			{/each}
		</Table.Body>
	</Table.Root>
</section>

<AlertDialog.Root bind:open={openAlert}>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <form action="?/deleteUser" method="post" use:enhance>
                <input type="hidden" name="id" bind:value={userId}>
				<Button type="submit" variant="destructive">Delete</Button>
            </form>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>