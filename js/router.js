export class Router {

    routes = {}

    add(pathName, page) {
        this.routes[pathName] = page
    }

    route(event) {
        event = event || window.event
        event.preventDefault()
        let isButtonClick = event.target.classList.value === "pageButton"

        if (isButtonClick) {
            window.history.pushState({}, "", event.composedPath()[1].href)
            let menuElement = document.querySelector("body nav").children[3]
            this.updateMenu(menuElement)
        } else {
            window.history.pushState({}, "", event.target.href)
            this.updateMenu(event.target)
        }

        this.handle()
    }

    handle() {
        const { pathname } = window.location
        const route = this.routes[pathname]

        fetch(route)
        .then(data => data.text())
        .then(html => {
            document.querySelector("#app").innerHTML = html
        })

        if (pathname === "/") {
            document.querySelector("body main").classList.add("home")
        } else {
            document.querySelector("body main").classList.remove("home")
        }

        const pageName = String(window.location.pathname).replace("/", "")
        document.body.style.backgroundImage = `url('/img/bg-spa-universe-${pageName}.png')`
    }

    updateMenu(element) {
        let menu = document.querySelector("body nav").children

        for (let item of menu ) {
            item.classList.remove("selected")
        }

        element.classList.add("selected")
    }
}