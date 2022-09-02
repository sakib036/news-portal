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
    // console.log(datas,name)
    datas.forEach(data=>{
        const{image_url,title,details,author,rating,total_view}=data;
        const cardDiv=document.createElement('div');
        cardDiv.innerHTML=`
        <div class="card md:card-side bg-base-100 shadow-xl my-4">
        <figure  class="w-full md:w-1/3"><img class="w-full h-full" src="${image_url}" alt="Album"></figure>
        <div class="card-body w=2/3">
          <h2 class="card-title">'${title? title:"NO Title Found"}'</h2>
          <p>${details.length > 200 ? details.slice(0,200) + '...' : details}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
        `
        cardSection.appendChild(cardDiv);
        console.log(data);
    })
   }
  ;
   categoryItem();
}

displayMenuList();