// menu section added 
const menuList =async () =>{
  try{
    const menuUrl=`https://openapi.programming-hero.com/api/news/categories`;
    const res=await fetch(menuUrl);
    const data=await res.json();
    return (data.data.news_category);
  }
    catch(error){
      alert(error);
    }
    
   
}

const displayMenuList= async() =>{
    const menuItems=await menuList();
    const menuSection=document.getElementById('menu-section');
    
    menuItems.forEach(menu => {
        const menuLi=document.createElement('li');
        menuLi.innerHTML=`<a onclick="menuId('${menu.category_id}','${menu.category_name}')">${menu.category_name}</a>`;
        menuSection.appendChild(menuLi);
    });
}
const menuId=(id, categoryName)=>{
    const spinner = document.getElementById("spinner");
    spinner.classList.remove("hidden");
    const categoryItem=async()=>{
        try{
          const categoryUrl=`https://openapi.programming-hero.com/api/news/category/${id}`;
    const res=await fetch(categoryUrl);
    const categories=await res.json();
    
    displayCatagory(categories.data,categoryName);
        }
        catch(error){
          alert(error);
        }
   }
   const displayCatagory=(datas,name)=>{
    const categoryFound=document.getElementById('category-found');
    categoryFound.innerText='';
    const cardSection=document.getElementById('card-section');
    cardSection.innerHTML='';
    
    const categoryP=document.createElement('p');
    categoryFound.classList.remove('hidden');
   
    
    categoryP.innerText=`${datas.length? datas.length:"No"} items Found for category of ${name}`
    categoryFound.appendChild(categoryP)
    if(datas.length===0){
      spinner.classList.add("hidden");
    }
    const valus=datas.sort((a, b) => b.total_view - a.total_view);
    valus.forEach(data=>{
      // console.log(data);
        try{
          const{image_url,title,details,author,rating,total_view,_id}=data;
        const cardDiv=document.createElement('div');
        cardDiv.innerHTML=`
        <div class="card lg:card-side bg-base-100 shadow-xl my-4">
             <div class="w-full ld:w-1/2 "><img class="w-full h-full object-fill" src="${image_url}" alt="Album">
             </div>
       
              <div class="card-body w=2/3 border-2 ">
                <h2 class="card-title">${title? title:"NO Title Found"}</h2>
                <p>${details.length > 200 ? details.slice(0,200) + '...' : details}</p>
               <div class="card-actions flex justify-evenly">
               <div class="w-12 h-12  rounded-full border-2 border-rose-600 overflow-hidden  " >
               <img class="" src="${author.img}" alt="">
               </div>
               <div>
                 <h5>${author.name?author.name:"No Author Found"}</h5>
                 <p>${author.published_date?author.published_date.slice(0,11):"No Date"}</P>

               </div>
               <div><i class="fa-solid fa-eye"></i>${total_view? total_view:00}</div>
               <div>
               <label for="my-modal-6" class="btn modal-button" onclick="showDetails('${_id}')">open modal</label>
               </div>
             </div>
      </div>
        `
        cardSection.appendChild(cardDiv);
        spinner.classList.add("hidden")
        }
        catch(error){
          alert(error);
        }
        // console.log(data);
    })
   };
 
   categoryItem();
};

displayMenuList();

const showDetails=(id)=>{
  // console.log(id);
   const modalNewsId=async()=>{
    try{
      const newsUrl=`https://openapi.programming-hero.com/api/news/${id}`
      const res=await fetch(newsUrl);
    const news=await res.json();
    const newsData=(news.data[0]);
    const {title,details,author}=newsData;
    const modalBox=document.getElementById('modal-box');
    modalBox.innerHTML='';
    const modalDiv=document.createElement('div');
    modalDiv.innerHTML=`
    <h3 class="font-bold text-lg">${title}</h3>
            <p class="py-4">${details}</p>
            <p>${author.name? author.name:"Author Not Found"}</P>
            <div class="modal-action">
                <label for="my-modal-6" class="btn">Yay!</label>
              </div>
    `
    modalBox.appendChild(modalDiv);
        }
        catch(error){
          alert(error);
        }
   }
   modalNewsId();
}

