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

## 28/05/22
- suffering, intentando hacer un mockup del `createAsyncThunk` con un setTimeOut y nada mas no pude

## 29/05/22
- approach diferente, hice un commit y me fui directo a usar un `fetch` del json de reddit
- logre actializar el state global con la info del `fetch` y agregar un `<p>` al componente `<Feed>` con texto que salio del state
- no se como hacerle para que no corra el `useEffect` de `Feed.js` cuando se inicializa la pagina
- actualice el status de feed con un array personalizado con la info que necesito de los threads
- me quede en el `return()` de `<Feed>` intentando imprimir los diferentes threads

## 30/05/22
-no entiendo porque esto no jala en `<Thread>`
 ```
 export const Thread = (id) => {
  const threads = useSelector(selectResponse)
  const thread = threads.filter(obj => obj.id === id)
  return(
    <div>
      <p>{thread.title}</p>
    </div>
  )
}
```
-ramon me ayudo a pasarle al child el ID como string en `<Feed>`:
```
 return(
    <div className={styles.feed}>
      {feedResponse.map(({id}) => {
        console.log(id)
        return(
          <div>
            <Thread id={id}/>
          </div>
        )
      })}
    </div>
  )
```
-asi es como lo tenia antes y si jalaba pero con este otro child
`<Feed>`
```
  return(
    <div className={styles.feed}>
      {feedResponse.map(thread => {
        console.log(thread)
        return(
          <div>
            <Thread id={thread.id}/>
          </div>
        )
      })}
    </div>
  )
  ```
  `<Thread>`
  ```
  export const Thread = (id) => {
  const threads = useSelector(selectResponse)
  const thread = threads.filter(obj => obj.id === Object.values(id)[0])
  console.log(id)
  return(
    <div>
      <p>{thread[0].title}</p>
    </div>
  )
}
```
## 31/05/22
-me esta saliendo este error en `<Feed>`
```
Warning: Each child in a list should have a unique "key" prop. Check the render method of `Feed`.
```
- logre solucionar el problema de ayer, los componentes de react SIEMPRE le pasan a los childs Objects. Por mas que le estaba pasando un string, el child lo recibia como object. la solucion fue hacer deconstructing al recibir el prop en el child `({id})`
- lo que sigue es implementar routers para que funcionen los botones:
  - all
  - hot
  - new
  - rising
  - top

## 01/06/22
- ando confundidazo con los routers. creo que debo hacer en `<FeedSlice>` un thunk nuevo para agregar los fetches de los homepages *(all, rising, hot etc)* y en el `<Feed>` agregar otro `<useEffect>` con `useLocation`?
- ***MILESTONE: dejar funcionando el `<Feed>` con los homepages***
- aqui explican como hacer que se scrolle top cada que le picas a un nuevo route: https://www.kindacode.com/article/react-router-uselocation-hook-tutorial-and-examples/
- el `useLocation` va solo en el `<Feed>` y hacemos un dispatch con el path como argument
- esto lo tengo en los dos thunks, habra que ver como lo reciclo
  ```
      return {
        id: thread.data.id,
        title: thread.data.title,
        subreddit: thread.data.subreddit,
        author: thread.data.author,
        thumbnail: thread.data.thumbnail,
        created: thread.data.created,
        score: thread.data.score,
        num_comments: thread.data.num_comments
      }
  ```
- de aqui saque como usar el `useLocation` + `useState` + `useEffect` en el `<Feed>`: https://stackoverflow.com/questions/65413590/use-of-useeffect-with-uselocation
- ya funciona *hot* y *rising* pero pasa algo raro cuando selecciono *rising* dura menos de 1 segundo y se vuelve a desplegar *hot* revisar eso, de hecho ya lo probe mas y si alterno entre picarle a *hot* y *rising* el texto alterna entre 3 variantes, weird...