const arrowF = (search='samsung') =>{
     const api = ` https://openapi.programming-hero.com/api/phones?search=${search}`
     fetch(api)
    .then(pro => pro.json())
    .then(data => reciveData(data))
}
arrowF();

const autoLoader = document.getElementById('loder');
document.getElementById('search-btn').addEventListener('click', function(){
    // get auto loder id
    autoLoader.classList.remove('d-none');

    const getInputId = document.getElementById('input-search');
    const inputValue = getInputId.value;
    getInputId.value = '';
    // set value alert message
    const setMessage = document.getElementById('set-message');
    setMessage.innerText = inputValue; 
    // validation
    if(inputValue === ""){
        arrowF();
        return;
    }else{
        arrowF(inputValue);
    }
});

document.getElementById('input-search').addEventListener('keyup', function(event){

     if (event.key === "Enter") {

          // get auto loder id
         autoLoader.classList.remove('d-none');

            const getInputId = document.getElementById('input-search');
            const inputValue = getInputId.value;
            getInputId.value = '';
            // validation
            if(inputValue === ""){
                arrowF();
                autoLoader.classList.add('d-none');

            }else{
                const getParentDiv = document.getElementById('parentDiv');
                getParentDiv.innerHTML = ``;
                arrowF(inputValue);
            }

            // set value alert message
            const setMessage = document.getElementById('set-message');
            setMessage.innerText = inputValue; 
     }
      
});

const reciveData = data =>{

    if(data.status === false){
        const message = document.getElementById('not-found');
        message.classList.remove('d-none');

        // loder 
        autoLoader.classList.add('d-none');
        // Empty inner HTML
        const getParentDiv = document.getElementById('parentDiv');
        getParentDiv.innerHTML = ``;
    }else{
        // message alert
        const message = document.getElementById('not-found');
        message.classList.add('d-none');

        const totalData = data.data;
        const getParentDiv = document.getElementById('parentDiv');
        getParentDiv.innerHTML = ``;
        getParentDiv.classList.add('row');
       totalData.forEach(element => {
    
                const {brand, phone_name, slug, image} = element;
                const createDiv = document.createElement('div');
                createDiv.classList.add('col-4');
                createDiv.classList.add('mb-4');
                const b_card = `
                <div class="card" style="width: 18rem;">
                <div class="p-5">
                    <img src="${image}" class="card-img-top" alt="...">
                </div>
                <div class="card-body">
                  <h5 class="card-title" style="color: #000; font-weight: bold;">Brand: <i>${brand}</i></h5>
                  <p class="card-text" style="color: #000;">Name: <b>${phone_name}</b></p>
                  <!-- Button trigger modal -->
                  <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal"  onclick="modal('${slug}')">Buy Now</button>
                </div>
              </div>
                `;
                createDiv.innerHTML = b_card;
                getParentDiv.appendChild(createDiv);
                autoLoader.classList.add('d-none');         

        });
       
    }

}

// Modal set
const modal = id =>{
   fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
   .then(res => res.json(res))
   .then(data => readData(data))
}

const readData = data =>{
    console.log(data);
    if(data.status === false){
        const message = document.getElementById('not-found');
        message.classList.remove('d-none');

        // loder 
        autoLoader.classList.add('d-none');
    }else{
        const {brand, image, mainFeatures, name, others, releaseDate} = data.data;
        const {chipSet, displaySize, memory, sensors, storage} = mainFeatures;
        const {Bluetooth, GPS, NFC, Radio, USB, WLAN} = others;
        // set modal title
        const modalTitle = document.getElementById('exampleModalLabel');
        modalTitle.innerText = brand;

        // set modal body
        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML = ``;
        const createDiv = document.createElement('div');
        createDiv.classList.add('row');
        createDiv.classList.add('justify-content-center');
        const bootsCard =`
        <div class="card" style="width: 25rem;">
        <div class="p-5">
          <img src="${image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title">Name: ${name}</h5>
          <p class="card-text">Release Date: <strong>${releaseDate}</strong></p>
          <p class="card-text">ChipSet: <strong>${chipSet}</strong></p>
          <p class="card-text">Display Size: <strong>${displaySize}</strong></p>
          <p class="card-text">Memory: <strong>${memory}</strong></p>
          <p class="card-text">Storage: <strong>${storage}</strong></p>
          <p class="card-text">Bluetooth: <strong>${Bluetooth}</strong></p>
          <p class="card-text">GPS: <strong>${GPS}</strong></p>
          <p class="card-text">NFC: <strong>${NFC}</strong></p>
          <p class="card-text">Radio: <strong>${Radio}</strong></p>
          <p class="card-text">USB: <strong>${USB}</strong></p>
          <p class="card-text">WLAN: <strong>${WLAN}</strong></p>
        </div>
      </div>
        `;
        createDiv.innerHTML = bootsCard;
        modalBody.appendChild(createDiv);
    }

}