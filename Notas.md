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

## 04/06/22
- ~~tengo un problema con el **reddit/all**, al hacer un request del feed con router para cualquier otra categoria se generan dos actions, una para la categoria seleccionada y la otra para **all**. creo que usando router switch para que solo se genere una vez puedo resolverlo~~ solucionado con `<NavLink exact to=''>`
- al generar homeThunk action, cuando ya hay un feed loaded, genera un action para el loaded feed y para el requested feed. A de ser un problema del `useEffect()`. Al inicializar el app hace 5 requests: 
  - 2 search requests 
  - 3 homethunk
- vi aqui una solucion para no correr el useEffect en el first render, pero no funciono https://dev.to/calebbenjin/how-to-prevent-useeffect-from-running-on-initial-render-in-react-22a8 

  ```
  import { useState, useRef } from 'react'

  function PublicFetch() {
    const [data, setData] = useState();
    const isMounted = useRef(false)

    // fetching the data with useEffect
    useEffect(() => {
    const res = await fetch(`/api/some-url`)
      const data = await res.json()

      if (res.ok) {
        setData(data)
      } else {
        setData(null)
      }
    }, []);

    // Do something else with the data
    useEffect(() => {
      if(isMounted.current){
        doSomething(data);
      } else {
      isMounted.current = true;
      }

    }, [data]);
  }
  ```

- buena referencia de como no correr `useEffect` `onMount` : https://dev.to/hnrq/useupdateeffect-useeffect-that-doesn-t-run-on-mount-8l6
- hice un custom hook para evitar el `useEffect` `onMount` mas no jala del todo bien, aun se corren 2 actions al inicio

## 05/06/22

- dejare pendiente arreglar lo del dia anterior.
- ***MILESTONE: subreddits***
- decidi utilizar el json de reddit.com/subreddits, no se que criterio usan para sortearlos pero da igual. habra que resolver la paginacion...
- voy a almacenar el listado de SUBS en el global state
- pendientes por resolver:
  - ~~paginacion de subs~~
  - first render `useEffect` deberia ser ignorado por `SearchThunk` y `homeThunk`
  - los states de `isLoading` y `failedToLoad` de `Feed` y `Search`
- la paginacion de subs 
  - https://www.reddit.com/subreddits/?count=25&after=t5_2qo4s
  - https://www.reddit.com/subreddits/?count=50&after=t5_2r5rp
  - https://www.reddit.com/subreddits/?count=75&after=t5_2ti4h
- quiero reutilizar `SubThunk` para los primeros 100 subs y para los subsecuentes que saldran con el `<button>`, es con el query `?limit=100&after=${sub.name}` tengo que ver como diferencio el first render de los updates...
- con el boton de **More** ya se piden los proximos 100 subs, solo que no logro hacer que se agreguen al state actual, si no que hacen un override. en el `subsSlice.js` en el `.addCase(Subthunk.fulfilled)` estoy intentando hacer un `.contac` pero para algo bien raro en consola:
  ```
  95: Proxy {}
  96: Proxy {}
  97: Proxy {}
  98: Proxy {}
  99: Proxy {}
  [100 … 199]
  100: {display_name: 'television', name: 't5_2qh6e'}
  101: {display_name: 'feedthebeast', name: 't5_2v620'}
  102: {display_name: 'PrequelMemes', name: 't5_3i60n'}
  103: {display_name: 'sex', name: 't5_2qh3p'}
  104: {display_name: 'pokemon', name: 't5_2qmeb'}
  ```
  los primeros subs me los esta detectando como `Proxy`:

  ```
  [0 … 99]
  0: Proxy
  [[Handler]]: null
  [[Target]]: null
  [[IsRevoked]]: true
  ```
## 06/06/22
  - problema de ayer solucionado con destructuring:
  ` state.subsResponse = [...state.subsResponse, ...action.payload]`
- ~~no se maneja lo de los loadings y failed desde routes? hoy trabajare en esto: los states de `isLoading` y `failedToLoad`~~ ya quedo `isLoading` y `failedToLoad`
- ***Problema***: ~~se hace doble o triple request `onMount` de `Subs` y los anexa al array del status duplicados~~    
  ***Resuelto*** desactive el `<React.StrictMode>` en `index,js` y se arreglo tanto eso como el Feed y Search actions que corrian `onMount`
- que sigue? :
  - ~~agregarle key al `<Feed>`~~ YA
  - crear componente `<Thread>` y que se desplieguen los comments 
- esta pasando algo curioso, componente `<Feed>` marca errores en consola de que `feedResponse.map` no jala, pero si commento lo siguiente:
  ```
        {feedResponse.map(({id}) => {
        return(
          <Link to={`/thread=${id}`} key={id}>
            <Thread key={id} id={id}/>
          </Link>
        )
      })}
  ```
  si funciona la pagina, y una vez lodeada, asumo que como ya el state se actualizo, me deja descommentar eso y funciona como si nada.
  Solo que si le doy `console.log(feedResponse)` justo arriba del `return` si me imprime el objeto. pareciera que el problema es de asyncronizacion... probar con el <React.StrictMode>, esto empezo a fallar cuando lo quite

## 07/06/22
- el console.log de `<Feed>` NO imprime `feedResponse`, imprime esto:
  ```
  Proxy {0: {…}}
  ```
