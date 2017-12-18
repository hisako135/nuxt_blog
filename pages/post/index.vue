<template>
  <div class="section">
    <div class="columns is-multiline">
      <div class="column is-half" v-for="post in posts">
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
            <nuxt-link :to="{ name: 'post-slug', params: { slug: post.fields.slug }}" class="card-footer-item">
              Read More
            </nuxt-link>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()
  export default {
    head: {
      title: 'Post'
    },
    data () {
      return {
        posts: []
      }
    },
    asyncData ({ env }) {
      return client.getEntries({
        // fetch all blog posts sorted by creation date
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        order: '-sys.createdAt'
      }).then(entries => {
        return {
          posts: entries.items
        }
      }).catch(console.error)
    }
  }
</script>