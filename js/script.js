// menu section added 
const menuList =async () =>{
    const menuUrl=`https://openapi.programming-hero.com/api/news/categories`;
    const res=await fetch(menuUrl);
    const data=await res.json();
    return (data.data.news_category);
}
const displayMenuList= async() =>{
    const menuItems=await menuList();
    const menuSection=document.getElementById('menu-section');
    
    menuItems.forEach(menu => {
        // console.log(menu);
        const menuLi=document.createElement('li');
        menuLi.innerHTML=`<a onclick="menuId('${menu.category_id}','${menu.category_name}')">${menu.category_name}</a>`;
        menuSection.appendChild(menuLi);
    });
   

}
const menuId=(id, categoryName)=>{
    // console.log(id)
    const categoryItem=async()=>{
        const categoryUrl=`https://openapi.programming-hero.com/api/news/category/${id}`;
    const res=await fetch(categoryUrl);
    const categories=await res.json();
    
    displayCatagory(categories.data,categoryName);
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
    const valus=datas.sort((a, b) => b.total_view - a.total_view);
    valus.forEach(data=>{
        const{image_url,title,details,author,rating,total_view}=data;
       
        const cardDiv=document.createElement('div');
        cardDiv.innerHTML=`
        <div class="card lg:card-side bg-base-100 shadow-xl my-4">
             <div class="w-full ld:w-1/2 "><img class="w-full h-full object-fill" src="${image_url}" alt="Album">
             </div>
       
              <div class="card-body w=2/3 border-2 ">
                <h2 class="card-title">${title? title:"NO Title Found"}</h2>
                <p>${details.length > 200 ? details.slice(0,200) + '...' : details}</p>
               <div class="card-actions flex justify-evenly">
               <div class="w-12 h-12  rounded-full z-10 border-2 border-rose-600 overflow-hidden  " >
               <img class="" src="${author.img}" alt="">
               </div>
               <div>
                 <h5>${author.name?author.name:"No Author Found"}</h5>
                 <p>${author.published_date?author.published_date.slice(0,11):"No Date"}</P>

               </div>
               <div>${total_view? total_view:00}</div>
                 <button class="btn btn-primary">Listen</button>
               </div>
             </div>
      </div>
        `
        cardSection.appendChild(cardDiv);
        // console.log(data);
    })
   }
  ;
   categoryItem();
}

displayMenuList();