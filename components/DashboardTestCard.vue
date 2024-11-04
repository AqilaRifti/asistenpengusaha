<script>
export default {
    props: {
        to: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        picture: {
            type: String
        }
    }
}
</script>

<template>
    <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-m font-medium">
               <label>{{ title }}</label>
            </CardTitle>
            <slot />
        </CardHeader>
        <hr class="mb-2">
        <CardContent>
            <img :src="picture" alt="" class="w-[80vw] h-[100px]" />
        </CardContent>
        <hr class="mb-4">
        <CardFooter>
            <NuxtLink :to="to">
                <Button variant="secondary">
                    <p>Take Test</p>
                    <LucideChevronsRight />
                </Button>
            </NuxtLink>
        </CardFooter>
    </Card>
</template>