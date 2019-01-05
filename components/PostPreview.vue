<template>
  <section class="section container">
    <h1 class="title has-text-centered">
      Recent Posts
    </h1>
    <div class="columns is-multiline">
      <div class="column is-half" v-for="post in posts" :key="post.id">
        <div class="card">
          <header class="card-header">
            <p class="card-header-title">
              {{ post.fields.title }}
            </p>
          </header>
          <div class="card-content">
            <div class="content">
              {{ post.fields.description }}
              <br>
              <small>{{ ( new Date(post.fields.publishDate)).toDateString() }}</small>
            </div>
          </div>
          <footer class="card-footer">
            <nuxt-link :to="{ name: 'posts-slug', params: { slug: post.fields.slug }}" class="card-footer-item">
              Read More
            </nuxt-link>
          </footer>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    props: ['posts']
  }
</script>