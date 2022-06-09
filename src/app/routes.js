export const routes = {
  all: () => '/',
  hot: () => '/hot',
  new: () => '/new',
  rising: () => '/rising',
  top: () => '/top',
  subreddit: (id) => `/subreddit/${id}`,
  thread: (id, subreddit) => `/${subreddit}/comments/${id}`
}