<template>
  <section>
    <header class="header">
      <img
        :src="currentPost.fields.heroImage.fields.file.url + '?fit=scale&w=350&h=196'"
        :srcset="`${currentPost.fields.heroImage.fields.file.url}?w=350&h=87&fit=fill 350w, ${currentPost.fields.heroImage.fields.file.url}?w=1000&h=250&fit=fill 1000w, ${currentPost.fields.heroImage.fields.file.url}?w=2000&h=500&fit=fill 2000w`"
        size="100vw"
        :alt="currentPost.fields.heroImage.fields.description"
      >
    </header>
    <article class="section">
      <div class="headline">
        <time class="tiny">{{ ( new Date(currentPost.fields.publishDate)).toDateString() }}</time>
        <h1>{{ currentPost.fields.title }}</h1>
      </div>
      <div>
        <vue-markdown>{{ currentPost.fields.body }}</vue-markdown>
      </div>
      <nav class="pagination is-centered" role="navigation" aria-label="pagination">
        <nuxt-link active-class="is-active" to="" class="pagination-previous">Previous</nuxt-link>
        <nuxt-link class="pagination-next" :to="nextPost">Next page</nuxt-link>
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
        title: this.currentPost.fields.title,
        meta: [
          {
            hid: 'description',
            name: 'description',
            content: this.currentPost.fields.description
          }
        ]
      }
    },
    data () {
      return {
        allPosts: [],
        currentPost: []
      }
    },
    components: {
      VueMarkdown
    },
    asyncData ({ env, params }) {
      return client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID,
        order: '-fields.publishDate'
      }).then(entries => {
        const posts = entries.items
        const current = posts.filter(function (item) {
          return item.fields.slug === params.slug
        })
        // console.log(entries.items)
        // console.log(params.slug)
        // console.log(current)
        return {
          allPosts: posts,
          currentPost: current[0]
        }
      }).catch(console.error)
    },
    computed: {
      dateOrder: function () {
        for (let i = 0; i < this.allPosts.length; i++) {
          let date = new Date(this.allPosts[i].fields.publishDate).getTime()
          return console.log(date)
        }
      },
      nextPost: function () {
        return 'hoge'
      }
    }
  }
</script>
