<template>
  <div class="main-content">
    <div class="container">
      <h2 class="title is-2">About Me</h2>
        <img
          :src="person.image.fields.file.url"
          :alt="person.image.fields.title"
          class=""
        >
        <ul>
          <li>{{person.name}}</li>
          <li>{{person.shortBio}}</li>
          <li>GitHub：{{person.github}}</li>
          <li>twitter：{{person.twitter}}</li>
        </ul>
      <h3 class="title is-4">What I hope to achieve:</h3>
    </div>
  </div>
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