<template>
  <article class="browser-window">
    <section class="browser-header"></section>
    <section class="browser-content">
      <slot></slot>
    </section>
  </article>
</template>

<style>
.browser-window {
  margin-top: 5rem;
  margin-bottom: 3rem;
  width: 84vw;
  border: 2px solid #ebbdbd;
  border-radius: 10px;
  background-color: white;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
    rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
    rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
}

.browser-header {
  background-color: #f9f9f9;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f9f9f9;
  border-radius: 10px 10px 0 0;
}

.browser-buttons {
  display: flex;
  gap: 8px;
}

.browser-button {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgb(255, 95, 87);
  display: inline-block;
  cursor: pointer;
}

.browser-button.minimize {
  background-color: rgb(254, 186, 46);
}

.browser-button.zoom {
  background-color: rgb(40, 200, 46);
}

.browser-content {
  overflow: auto;
}
</style>
