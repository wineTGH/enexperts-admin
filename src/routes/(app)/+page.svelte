<script lang="ts">
    import Button from '$lib/components/ui/button/button.svelte';
    import SampleScreenshot from "$lib/assets/images/sample-screenshot.png?enhanced";

    export let data;
</script>

<section class="w-full grid grid-cols-2 gap-6 items-center justify-between">
    <div class="flex flex-col gap-4">
        <h1 class="text-3xl font-bold leading-tight tracking-tighter md:text-5xl">
            Welcome{data.user?.firstName? " back" : ""} to <span class="underline text-primary">enxeperts</span>!
        </h1>
        <p class="text-muted-foreground text-pretty max-w-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Nihil dolor cupiditate quia pariatur ad doloribus nesciunt enim quae, 
            quam tenetur explicabo in placeat quisquam natus obcaecati. 
            Sunt veniam omnis voluptates?
        </p>
        {#if !data.user}
            <div class="flex gap-4 items-center text-center">
                <a href="/signin" class="transition-colors hover:text-foreground/80 text-foreground">Sign In</a>
                <Button href="/signup">Sign Up</Button>
            </div>
        {:else}
            <Button href="/dashboard" class="w-fit">To Dashboard</Button>
        {/if}
    </div>
    <div class="h-full">
        <enhanced:img src={SampleScreenshot} alt="Screenshot of user's page from dashboard" />
        <small class="italic text-muted-foreground">
            Example of a dashboard interface. Should be changed when a better design is available.
        </small>
    </div>
</section>