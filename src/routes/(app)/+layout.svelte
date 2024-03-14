<script>
	import Button from '$lib/components/ui/button/button.svelte';
</script>

<header class="flex justify-between gap-4 p-3 border-b border-border sticky top-0 w-full mb-3">
	<nav class="flex text-center items-center gap-4">
		<a href="/#" class="transition-colors hover:text-foreground/80 text-foreground">Lorem</a>
		<a href="/#" class="transition-colors hover:text-foreground/80 text-foreground">Ipsum</a>
		<a href="/#" class="transition-colors hover:text-foreground/80 text-foreground">Dolar</a>
	</nav>
	<div class="flex gap-3 items-center text-center">
		<a href="/signin" class="transition-colors hover:text-foreground/80 text-foreground">Sign In</a>
		<Button href="/signup">Sign Up</Button>
	</div>	
</header>

<main class="container">
	<slot />
</main>
