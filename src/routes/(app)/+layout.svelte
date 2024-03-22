<script>
	import Button from '$lib/components/ui/button/button.svelte';
	export let data;
</script>

<header class="flex justify-between gap-4 p-3 border-b border-border sticky top-0 w-full mb-3">
	<nav class="flex text-center items-center gap-4">
		<a href="/dashboard" class="transition-colors hover:text-foreground/80 text-foreground">Dashboard</a>
	</nav>
	<div class="flex gap-3 items-center text-center">
		{#if !data.user}
			<a href="/signin" class="transition-colors hover:text-foreground/80 text-foreground">Sign In</a>
			<Button href="/signup">Sign Up</Button>
		{:else}
			<form method="post" action="/signout">
				<button class="transition-colors hover:text-foreground/80 text-foreground">Sign Out</button>
			</form>
		{/if}
	</div>
</header>

<main class="container">
	<slot />
</main>
