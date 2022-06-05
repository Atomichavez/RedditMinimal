export const routes = {
  all: () => '/',
  hot: () => '/hot',
  new: () => '/new',
  rising: () => '/rising',
  top: () => '/top',
  thread: (id) => `/thread/${id}`,
  subreddit: (id) => `/subreddit/${id}`
}