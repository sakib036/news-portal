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
        menuLi.innerHTML=`<a onclick="menuId('${menu.category_id}')">${menu.category_name}</a>`;
        menuSection.appendChild(menuLi);
    });
   

}
const menuId=(id)=>{
    console.log(id)
    const categoryItem=async()=>{
        const categoryUrl=`https://openapi.programming-hero.com/api/news/category/${id}`;
    const res=await fetch(categoryUrl);
    const categories=await res.json();
    
    console.log(categories);
   }
   categoryItem();
}

displayMenuList();