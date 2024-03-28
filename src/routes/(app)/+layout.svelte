<script>
	import UserAvatar from '$lib/components/custom/user-avatar.svelte';
import Button from '$lib/components/ui/button/button.svelte';
	export let data;
</script>

<div class="flex flex-col h-screen">
	<header class="flex justify-between gap-4 p-3 border-b border-border sticky top-0 w-full mb-3">
		<nav class="flex text-center items-center gap-4">
			<a href="/dashboard" class="transition-colors hover:text-foreground/80 text-foreground">Dashboard</a>
		</nav>
		{#if !data.user}
			<div class="flex gap-3 items-center text-center">
				<a href="/signin" class="transition-colors hover:text-foreground/80 text-foreground">Sign In</a>
				<Button href="/signup">Sign Up</Button>
			</div>
		{:else}
			<UserAvatar user={data.user}/>
		{/if}
	</header>
	
	<main class="container">
		<slot />
	</main>
	
	
	<footer class="flex justify-between items-baseline p-3 mt-auto border-t">
		<p>© Anatoly "wineT" Bogomolov</p>
		<nav class="flex gap-4">
			<a class="transition-colors text-foreground hover:text-foreground/80 hover:underline" href="https://mastodon.ml/@winet">Mastodon</a>
			<a class="transition-colors text-foreground hover:text-foreground/80 hover:underline" href="https://t.me/AnatolyFL">Telegram</a>
			<a class="transition-colors text-foreground hover:text-foreground/80 hover:underline" href="/about">About</a>
			<a class="transition-colors text-foreground hover:text-foreground/80 hover:underline" href="/legal">Legal</a>
		</nav>
	</footer>

</div>