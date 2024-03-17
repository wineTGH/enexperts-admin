<script lang="ts">
    export let data;
</script>

<section class="w-full gap-2 grid place-items-center">
    <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]">
        Welcome {data.user?.firstName || ""} to the "enexperts"<br />
        dashboard page
    </h1>
    <p class="max-w-[750px] text-center text-lg sm:text-xl text-balance text-muted-foreground">Please Log In or make new account</p>
</section>