<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
};
</script>

<template>
  <article>
    <Card class="border-primary hover:bg-secondary">
      <CardHeader>
        <Alert>
            <slot class="h-4 w-4" />
            <AlertTitle><h2 class="text-xl font-bold inter-font">{{ title }}</h2></AlertTitle>
        </Alert>
      </CardHeader>
      <CardFooter>
        <Button> Ambil </Button>
      </CardFooter>
    </Card>
  </article>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
.inter-font {
  font-family: "Inter", serif;
  font-optical-sizing: auto;
}
</style>