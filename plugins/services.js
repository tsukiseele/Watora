export default ({ app, $axios }, inject) => {
  inject('service', {
    async getArchives(page, count) {
      return await $axios.$get(
        //`https://api.github.com/repos/tsukiseele/Watora/issues`, //?page=${query.id}&per_page=10
        `https://api.github.com/repos/chanshiyucx/blog/issues`,
        {
          params: {
            page: page,
            per_page: count,
            state: 'open'
          }
        }
      )
    },
    async getArchiveById(number) {
      return await $axios.$get(
        // `https://api.github.com/repos/tsukiseele/Watora/issues/${number}`
        `https://api.github.com/repos/chanshiyucx/blog/issues/${number}`,
        {
          params: {
            state: 'open'
          }
        }
      )
    },
    async getLabels() {
      return await $axios.$get(
        // `https://api.github.com/repos/tsukiseele/Watora/labels`
        `https://api.github.com/repos/chanshiyucx/blog/labels`
      )
    },
    async getMilestones() {
      return await $axios.$get(
        // `https://api.github.com/repos/tsukiseele/Watora/milestones``
        `https://api.github.com/repos/chanshiyucx/blog/milestones`
      )
    },
    async getPage(type) {
      const upperType = type.replace(/^\S/, s => s.toUpperCase())
      const url = `${blog}/issues?state=closed&labels=${upperType}`
      const resp = await $axios.$get(url)
      return resp[0]
    }
  })
}
