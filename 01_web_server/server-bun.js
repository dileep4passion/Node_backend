import {serve} from 'bun'

serve({
    fetch(request){
        const url = new URL(request.url)
        if (url.pathname === '/') {
            return new Response('Hello there guest - bun',{status:200})
        }else if (url.pathname === '/login') {
            return new Response('Hello there login',{status:200})
        }else {
            return new Response('Not found',{status:404})
        }
    },
    port:3676,
    hostname:'127.0.0.1'
})
