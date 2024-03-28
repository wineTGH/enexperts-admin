<script lang="ts">
    import NavLink from "$lib/components/custom/nav-link.svelte";
import UserAvatar from "$lib/components/custom/user-avatar.svelte";
    export let data;
</script>

<header class="flex justify-between gap-4 p-3 border-b border-border sticky top-0 w-full mb-3">
    <nav class="flex text-center items-center gap-4">
        <NavLink href="/dashboard">Dashboard</NavLink>
        <NavLink href="/dashboard/users">Users</NavLink>
        <NavLink href="/dashboard/media">Media</NavLink>
    </nav>
    {#if data.user}
        <UserAvatar user={data.user}/>
    {/if}
</header>
<slot />