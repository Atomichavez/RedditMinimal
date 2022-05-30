# Bitacora de avance

## 25/05/22
- el searchbar ya actualiza el status global de searchValue cuando le doy enter
- no pude agregar el searchValue al `<Counter>` como `<p>` porque me marca un error de que no puedo tener objetos en html
- tuve que hacer objeto el initialStatus de searchSlice para que funcionara el changeSearch action. ver esta referencia
https://stackoverflow.com/a/63617416/13594641

## 26/05/22
- el state del search se lo pase al componente `<Feed>` y lo mostre en un `<p>`
- avance muy lento porque retome los cursos de *Async Actions with Middleware and Thunks* en Codecademy
- estoy pendiente de meter un action async para el fetch del feed, estoy usando de base el *Redux News Reader* files: `commentsSlice.js` y `Comments.js`. Revisar funcion `loadCommentsForArticle.js`