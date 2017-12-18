<template>
  <section>
    <header class="header">
      <img
        :src="post.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
        :srcset="`${post.fields.heroImage.fields.file.url}?w=350&h=87&fit=fill 350w, ${post.fields.heroImage.fields.file.url}?w=1000&h=250&fit=fill 1000w, ${post.fields.heroImage.fields.file.url}?w=2000&h=500&fit=fill 2000w`"
        size="100vw"
        :alt="post.fields.heroImage.fields.description"
      >
    </header>
    <article class="section">
      <div class="headline">
        <time class="tiny">{{ ( new Date(post.fields.publishDate)).toDateString() }}</time>
        <h1>{{ post.fields.title }}</h1>
      </div>
      <div>
        <vue-markdown>{{ post.fields.body }}</vue-markdown>
      </div>
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <nuxt-link active-class="is-active" to="" class="pagination-previous">Previous</nuxt-link>
        <nuxt-link class="pagination-next" to="">Next page</nuxt-link>
      </nav>
    </article>

  </section>
</template>

<script>
  import VueMarkdown from 'vue-markdown'
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()
  export default {
    head () {
      return {
        title: this.post.fields.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.post.fields.description
          }
        ]
      }
    },
    data () {
      return {
        post: []
      }
    },
    components: {
      VueMarkdown
    },
    asyncData ({ env, params }) {
      return client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        'fields.slug': params.slug
      }).then(entries => {
        return {
          post: entries.items[0]
        }
      }).catch(console.error)
    }
  }
</script>
