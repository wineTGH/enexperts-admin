<script lang="ts">
	import type { PageData } from "./$types";
    
    export let data: PageData;

    const {editUser} = data;
</script>

<div class="container mx-auto py-10">
    <h1 class="text-3xl font-bold">Edit {editUser?.username}</h1>
</div>

<form class="container mx-auto py-10" method="POST" action="?/editUser">
    <input type="hidden" name="id" value={editUser?.id} />
    <input type="text" name="username" value={editUser?.username} />
    <input type="email" name="email" value={editUser?.email} />
    <input type="text" name="lastName" value={editUser?.lastName} />
    <input type="text" name="firstName" value={editUser?.firstName} />
    <input type="submit" value="Save" />
</form>
