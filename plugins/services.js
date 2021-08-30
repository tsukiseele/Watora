export default ({ app, $axios }, inject) => {
  inject("service", {
    async getArchives(page, count) {
      return await $axios.$get(
        //`https://api.github.com/repos/tsukiseele/Watora/issues`, //?page=${query.id}&per_page=10
        `https://api.github.com/repos/chanshiyucx/blog/issues`,
        {
          params: {
            page: page,
            per_page: count
          }
        }
      );
    },
    async getArchiveById(number) {
      return await $axios.$get(
        // `https://api.github.com/repos/tsukiseele/Watora/issues/${number}`
        `https://api.github.com/repos/chanshiyucx/blog/issues/${number}`
      );
    }
  });
};
