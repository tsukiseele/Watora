import config from '@/plugins/config.js'

export default ({ app, $axios }, inject) => {
  // $axios.defaults.headers.common['Authorization'] = config.token.replace('+', '_')
  $axios.defaults.baseURL = `https://api.github.com/repos/${config.username}/${config.repository}`;
  inject('service', {
    getArchives({ page, count }) {
      return $axios.$get(`/issues`, {
        params: {
          page: page,
          per_page: count,
          state: 'open'
        }
      })
    },
    getArchiveById(number) {
      return $axios.$get(`/issues/${number}`, {
        params: {
          state: 'open'
        }
      })
    },
    getLabels() {
      return $axios.$get(`/labels`)
    },
    getMilestones() {
      return $axios.$get(`/milestones`)
    },
    getPage(type) {
      const upperType = type.replace(/^\S/, s => s.toUpperCase())
      return $axios.$get(`/issues?state=closed&labels=${upperType}`)
    },
    getInspiration({ page, count }) {
      return $axios.$get(`/issues?state=closed&labels=inspiration&page=${page}&per_page=${count}`)
    }
  })
}
