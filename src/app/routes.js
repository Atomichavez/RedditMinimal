export const routes = {
  all: () => '/',
  hot: () => '/hot',
  new: () => '/new',
  rising: () => '/rising',
  top: () => '/top',
  thread: (id) => `/thread/${id}`,
  subreddit: (id) => `/subreddit/${id}`
}

// export const routes = {
//   all: () => '/',
//   hot: () => '/filter/hot',
//   new: () => '/filter/new',
//   rising: () => '/filter/rising',
//   top: () => '/filter/top',
//   thread: (id) => `/thread/${id}`,
//   subreddit: (id) => `/subreddit/${id}`
// }