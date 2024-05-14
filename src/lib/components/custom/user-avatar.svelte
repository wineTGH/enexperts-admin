<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
    import * as Dropdown from '$lib/components/ui/dropdown-menu';
    import * as AlertDialog from "$lib/components/ui/alert-dialog";
    import { Button } from '$lib/components/ui/button';

    export let user: import("lucia").User;

    let openAlert: boolean = false;
</script>

<Dropdown.Root>
    <Dropdown.Trigger asChild let:builder>
        <Button variant="ghost" builders={[builder]} class="relative h-10 w-10 rounded-full">
            <Avatar.Root class="h-10 w-10">
                <Avatar.Fallback>{user.firstName.toUpperCase()[0] + user.lastName.toUpperCase()[0]}</Avatar.Fallback>
            </Avatar.Root>
        </Button>
    </Dropdown.Trigger>
    <Dropdown.Content class="w-56" align="end">
        <Dropdown.Label class="font-normal">
            <div class="flex flex-col space-y-1">
                <p class="text-sm font-medium leading-none">{`${user.firstName} ${user.lastName}`}</p>
                <p class="text-xs text-muted-foreground leading-none">{user.email}</p>
            </div>
        </Dropdown.Label>
        <Dropdown.Separator />
        <Dropdown.Group>
            <Dropdown.Item href="/settings" class="hover:cursor-pointer">
                Settings
            </Dropdown.Item>
                <Dropdown.Item on:click={() => {openAlert = true}} class="hover:cursor-pointer text-red-500">
                    Sign Out
                </Dropdown.Item>
        </Dropdown.Group>
    </Dropdown.Content>
</Dropdown.Root>

<AlertDialog.Root bind:open={openAlert}>
    <AlertDialog.Content>
        <AlertDialog.Header>
            <AlertDialog.Title>Are you sure?</AlertDialog.Title>
        </AlertDialog.Header>
        <AlertDialog.Footer>
            <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
            <form action="/signout" method="post">
                <Button type="submit" variant="destructive">Sign Out</Button>
            </form>
        </AlertDialog.Footer>
    </AlertDialog.Content>
</AlertDialog.Root>