document.querySelector(".product-card").addEventListener("click", (event) => {
    console.error(event)
    if(event.target.tagName.toLowerCase() == "button")
    {
        console.error("Agregado Correctament");
    }
    else
    {
        console.error(event.target.tagName);
    }
});