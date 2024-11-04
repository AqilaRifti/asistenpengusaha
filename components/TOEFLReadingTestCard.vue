<script>
export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
  },
};
</script>

<template>
  <Card>
    <CardHeader
      class="flex flex-row items-center justify-between space-y-0 pb-2"
    >
      <CardTitle class="flex items-center">
        <LucideBookOpenText class="w-5 mr-1" />
        <label class="antialiased font-sans font-bold text-xl">{{
          title
        }}</label>
      </CardTitle>
      <slot />
    </CardHeader>
    <hr class="mb-2" />
    <CardContent>
      <p>{{ description }}</p>
    </CardContent>
    <hr class="mb-4" />
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
