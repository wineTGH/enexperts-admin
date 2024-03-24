<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
    import * as Dropdown from '$lib/components/ui/dropdown-menu';
    import { Button } from '$lib/components/ui/button';

    export let user: import("lucia").User;
</script>

<Dropdown.Root>
    <Dropdown.Trigger asChild let:builder>
        <Button variant="ghost" builders={[builder]} class="relative h-10 w-10 rounded-full">
            <Avatar.Root class="h-10 w-10">
                <Avatar.Image src="/missingo" alt={user.username} />
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
            <Dropdown.Item href="/me" class="hover:cursor-pointer">
                Settings
            </Dropdown.Item>
            <Dropdown.Item href="/signout" class="hover:cursor-pointer text-red-500">
                Sign Out
            </Dropdown.Item>
        </Dropdown.Group>
    </Dropdown.Content>
</Dropdown.Root>