<script>
    import background from "$lib/assets/images/signin-background.jpg?enhanced";
</script>

<main class="grid place-items-center lg:place-items-stretch lg:grid-cols-2 lg:grid-rows-3 h-screen">
    
    <section class="row-span-3 bg-gradient-to-t from-black to-transparent hidden lg:block">
        <p class="absolute text-white text-lg bottom-0 m-3">
            Photo by
            <a class="font-bold underline" href="https://unsplash.com/@accrualbowtie?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Ryan Wallace
            </a>
            on
            <a class="font-bold underline" href="https://unsplash.com/photos/alphabet-learning-toy-on-gray-apparel-azA1hLbjBBo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">
                Unsplash
            </a>
        </p>
        <enhanced:img src={background} class="h-full object-cover relative -z-10" alt="Wooden letters of english alphabet" />
    </section>

    <section class="row-span-3 flex flex-col justify-center items-center gap-6">
        <slot />
    </section>
</main>
