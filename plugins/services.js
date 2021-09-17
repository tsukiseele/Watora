export default ({ app, $axios }, inject) => {
  $axios.defaults.headers.common['Authorization'] = 'ghp+M39JbvqRn3ipsl8OOZfRFhLPDjR8uO0j7sLs'.replace('+', ' ')

  // $axios.defaults.baseURL = 'https://api.github.com/repos/chanshiyucx/blog'
  inject('service', {
    getArchives({page, count}) {
      return $axios.$get(
        //`https://api.github.com/repos/tsukiseele/Watora/issues`, //?page=${query.id}&per_page=10
        `/issues`,
        {
          params: {
            page: page,
            per_page: count,
            state: 'open'
          }
        }
      )
    },
    getArchiveById(number) {
      return $axios.$get(
        // `https://api.github.com/repos/tsukiseele/Watora/issues/${number}`
        `/issues/${number}`,
        {
          params: {
            state: 'open'
          }
        }
      )
    },
    getLabels() {
      return $axios.$get(
        // `https://api.github.com/repos/tsukiseele/Watora/labels`
        `/labels`
      )
    },
    getMilestones() {
      return $axios.$get(
        // `https://api.github.com/repos/tsukiseele/Watora/milestones``
        `/milestones`
      )
    },
    getPage(type) {
      const upperType = type.replace(/^\S/, s => s.toUpperCase())
      return $axios.$get(`/issues?state=closed&labels=${upperType}`)
    },
    getInspiration({page, count}) {
      return $axios.$get(`/issues?state=closed&labels=inspiration&page=${page}&per_page=${count}`)
    }
  })
}
