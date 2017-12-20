<template>
  <article class="section">
    <section class="container">
      <h2 class="title has-text-centered">About Me</h2>
      <div class="media">
        <figure class="media-left">
          <img :src="person.image.fields.file.url" :alt="person.image.fields.title">
        </figure>
        <div class="media-content">
          <ul>
            <li>{{person.name}}</li>
            <li>{{person.shortBio}}</li>
            <li>GitHub：{{person.github}}</li>
          </ul>
        </div>
      </div>
    </section>
    <section class="container">
      <h3 class="title has-text-centered">What I hope to achieve:</h3>
    </section>
  </article>
</template>

<script>
  import {createClient} from '~/plugins/contentful.js'

  const client = createClient()

  export default {
    head: {
      title: 'About'
    },
    data () {
      return {
        person: []
      }
    },
    asyncData ({ env }) {
      return client.getEntries({
        'content_type': env.CTF_BLOG_POST_TYPE_ID
      }).then(entries => {
        return {
          person: entries.items[0].fields.author.fields
        }
      }).catch(console.error)
    }
  }
</script>

<style scoped>
.container {
  margin-bottom: 3rem;
}
</style>
