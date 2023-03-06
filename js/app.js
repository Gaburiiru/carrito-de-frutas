const carrito = document.getElementById('carrito');
const template = document.getElementById('template');
const footer = document.getElementById('footer');
const templateFooter = document.getElementById('templateFooter');
const fragment = document.createDocumentFragment();

document.addEventListener('click',(e)=>{
    // console.log(e.target.matches('.card .btn-outline-primary'))
    if(e.target.matches('.card .btn-outline-primary')){
        // console.log('agregar al carrito');
        agregarAlCarrito(e);
    }

    // console.log(e.target.matches('.list-group-item .btn-success'));
    if(e.target.matches('#carrito .list-group-item .btn-success')){
        btnAumentar(e);
    };

    if(e.target.matches('#carrito .list-group-item .btn-danger')){
        btnDisminuir(e);
    };
});

let carritoArray = [];

const agregarAlCarrito = (e) =>{
    // console.log(e.target.dataset.fruta);

    const producto = {
        titulo:e.target.dataset.fruta,
        id:e.target.dataset.fruta,
        cantidad:1,
        precio: parseInt(e.target.dataset.precio)
    };

    const indice = carritoArray.findIndex((item)=>item.id === producto.id);
    
    if(indice === -1){
        carritoArray.push(producto);
    }else{
        carritoArray[indice].cantidad ++;
        //carritoArray[indice].precio = carritoArray[indice].cantidad * producto.precio;
    }
    // console.log(carritoArray)

    pintarCarrito();
};

const pintarCarrito = () =>{

    carrito.textContent = "";

    carritoArray.forEach((item)=>{
        const clone = template.content.cloneNode(true);
        clone.querySelector('.text-white .lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad;
        clone.querySelector('.btn-danger').dataset.id = item.id;
        clone.querySelector('.btn-success').dataset.id = item.id;

        fragment.appendChild(clone);
    });

    carrito.appendChild(fragment);
    pintarFooter()
};

const btnAumentar = (e)=>{
    // console.log('me diste click agregar',e.target.dataset.id);
    carritoArray = carritoArray.map(item =>{
        if(item.id === e.target.dataset.id){
            item.cantidad ++;
        }
        return item;
    });

    pintarCarrito();
};

const btnDisminuir = (e)=>{
    // console.log('me diste click eliminar',e.target.dataset.id);
    carritoArray = carritoArray.filter(item =>{
        if(item.id === e.target.dataset.id){
            if(item.cantidad > 0){
                item.cantidad --;
                if(item.cantidad === 0){
                    return
                }
                return item;
            }
        }else{
            return item;
        }
    });
    pintarCarrito();
};

const pintarFooter = () =>{
    // console.log('pintar footer');
    footer.textContent='';

    const total = carritoArray.reduce((acumulador,valorActual)=>
        acumulador + valorActual.cantidad * valorActual.precio, 0
    );
    const clone = templateFooter.content.cloneNode(true);
    clone.querySelector('span').textContent = total;

    footer.appendChild(clone);
};