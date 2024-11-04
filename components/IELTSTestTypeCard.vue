<template>
    <Card class="hover:opacity-70">
        <div class="flex items-center justify-center m-10">
            <div class="flex flex-col items-center justify-center">
                <slot />
                <h1 class="text-xl ml-1"> {{ type }}</h1>
            </div>
        </div>
    </Card>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: true
        }
    }
}
</script>