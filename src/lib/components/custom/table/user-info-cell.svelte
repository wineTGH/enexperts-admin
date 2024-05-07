<script lang="ts">
    export let firstName: string;
    export let lastName: string;
    export let username: string;
    export let id: string;
</script>


<a href="/dashboard/users/{id}" class="space-y-1">
    <p class="text-sm font-medium">{firstName} {lastName}</p>
    <p class="text-sm text-muted-foreground">{username}</p>
</a>