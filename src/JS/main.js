// ----------------------------------------------Handling NavBar-------------------------------------------------
const navWidth = $('.navbar').outerWidth();
$('.navbar').css("left", -navWidth);
$('.navbar').addClass('bg-slate-950');
for (let i = 0; i < 5; i++) {
    $(".nav-list a").eq(i).animate({ top: "300px" }, (i + 5) * 100)
}
$('.close-nav-btn').click(function () {
    if ($('.navbar').css("left") == "0px") {
        $('.navbar').animate({ left: -navWidth }, 500)
        $('.close-nav-btn').removeClass("fa-xmark");
        $('.close-nav-btn').addClass("fa-bars");

        for (let i = 0; i < 5; i++) {
            $(".nav-list a").eq(i).animate({ top: "300px" }, (i + 5) * 100)
        }
    }
    else {
        $('.navbar').animate({ left: 0 }, 500)
        $('.close-nav-btn').removeClass("fa-bars");
        $('.close-nav-btn').addClass("fa-xmark");

        for (let i = 0; i < 5; i++) {
            $(".nav-list a").eq(i).animate({ top: 0 }, (i + 5) * 100)
        }
    }
})
// --------------------------------------------------------------------------------------------------------------

// ----------------------------------------------Opening Website-------------------------------------------------
async function searchMeal(meal) {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result;
}
$(document).ready(async function () {
    let meals = await searchMeal("");

    for (let i = 0; i < meals.meals.length; i++) {

        $('#homePage').append(`
            <div class="inner rounded-xl relative overflow-hidden group/grand" id="${meals.meals[i].idMeal}">
               <img src="${meals.meals[i].strMealThumb}" class="w-full">
               <div
                   class="layout flex flex-row items-center text-lg font-bold p-5 absolute top-0 left-0 right-0 bottom-0 translate-y-full   bg-[rgba(255,255,255,0.7)] group-hover/grand:-translate-y-0 transition-all duration-[0.5s]">
                   <h1>${meals.meals[i].strMeal}</h1>
               </div>
           </div>`);


    }

    $('#homePage .inner').click(async function () {
        const details = await mealDetails(this.id);
        displayMealDeatils(details.meals[0]);

    })
})
// ---------------------------------------------------------------------------------------------------------------


// ----------------------------------------------Meal Deatils-----------------------------------------------------
async function mealDetails(mealId) {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result;
}
// ---------------------------------------------------------------------------------------------------------------



// ----------------------------------------------Displaying Meal Deatils------------------------------------------
function displayMealDeatils(theMeal) {
    $('.meal-details').html(`
          <div class="max-w-5xl mx-auto p-24 md:p-16 lg:p-0 lg:pt-5">
            <div class="flex flex-col md:flex-row">

                <div class="md:w-1/3 mb-4 md:mb-0">
                    <img src="${theMeal.strMealThumb}"class="w-full rounded">
                    <h2 class="text-2xl font-bold mt-4">${theMeal.strMeal}</h2>
                </div>

                <div class="md:w-2/3 md:pl-6">
                    <h2 class="text-2xl font-bold mb-4">Instructions</h2>
                    <p class="mb-4 text-sm">${theMeal.strInstructions}</p>

                    <p class="font-bold text-lg">Area : ${theMeal.strArea}</p>
                    <p class="font-bold text-lg">Category : ${theMeal.strCategory}</p>

                    <h2 class="text-2xl font-bold mt-4">Recipes :</h2>
                    <div class="flex flex-wrap mt-2 Recieps">
                    </div>
                    
                    <h2 class="text-2xl font-bold mt-4">Tags :</h2>
                    <div class="flex flex-wrap mt-2 tags">
                        <span class="bg-[#f8d7da] text-black text-xs py-1 px-3 m-1 rounded ">${theMeal.strTags}</span>
                    </div>

                    <div class="flex flex-wrap mt-4">
                        <button class="bg-[#198754] text-white py-2 px-4 m-1 rounded Source-btn">Source</button>
                        <button class="bg-[#dc3545] text-white py-2 px-4 m-1 rounded Youtube-btn">Youtube</button>
                    </div>
                </div>
            </div>
        </div>`)
    for (let i = 1; i <= 20; i++) {
        if (theMeal[`strIngredient${i}`] != "") {
            $('.Recieps').append(`
                    <span class="bg-[#cff4fc] text-black py-1 px-3 m-1 text-xs rounded">${theMeal[`strMeasure${i}`]} ${theMeal[`strIngredient${i}`]}</span>`)
        }
    }
    $('.Source-btn').click(function () {
        window.open(theMeal.strSource, '_blank');
    })
    $('.Youtube-btn').click(function () {
        window.open(theMeal.strYoutube, '_blank');
    })

    if (theMeal.strTags == null) {
        $('.tags').html("");
    }
    $('body').addClass("overflow-hidden");
    $('.meal-details').removeClass("hidden");
    $('#close-meal-details').click(function () {
        $('body').removeClass("overflow-hidden");
        $('.meal-details').addClass("hidden");
    })
}
// ---------------------------------------------------------------------------------------------------------------


// ---------------------------------------------- Search --------------------------------------------------------

//Opening Search Page
$('#search-btn').click(function () {
    $('.search-page').removeClass("hidden");
    $('#homePage').addClass("hidden");
    $('#area-page').addClass("hidden");
    $('#mealsofareaa').addClass("hidden");
    $('#ingredients-page').addClass("hidden");
    $('#mealsofingggg').addClass("hidden");
    $('#formPage').addClass("hidden");
    $('#categoryPage').addClass("hidden");
    $('#mealsofcaaat').addClass("hidden");
    $('.meal-details').addClass("hidden");

    

    $('body').addClass("overflow-hidden")
    $('.navbar').animate({ left: -navWidth }, 500)
    $('.close-nav-btn').removeClass("fa-xmark");
    $('.close-nav-btn').addClass("fa-bars");

    for (let i = 0; i < 5; i++) {
        $(".nav-list a").eq(i).animate({ top: "300px" }, (i + 5) * 100)
    }
})

//Searc By Name
$('#search-name').keyup(async function () {
    const searchMeals = await searchByName(this.value);

    $("#searchResult").empty();
    searchMeals.meals.forEach(meal => {
        let htmlContent = `
              <div class="inner rounded-xl relative overflow-hidden group/grand" id="${meal.idMeal}">
               <img src="${meal.strMealThumb}" class="w-full">
               <div
                   class="layout flex flex-row items-center text-lg font-bold p-5 absolute top-0 left-0 right-0 bottom-0 translate-y-full   bg-[rgba(255,255,255,0.7)] group-hover/grand:-translate-y-0 transition-all duration-[0.5s]">
                   <h1>${meal.strMeal}</h1>
               </div>
           </div>`
        $("#searchResult").append(
            htmlContent
        )
    });

    $('#searchResult .inner').click(async function () {
        const details = await mealDetails(this.id);
        displayMealDeatils(details.meals[0]);

    })
});

//Search by letter
$('#search-letter').keyup(async function () {
    const searchMeals = await searchByLetter(this.value);

    $("#searchResult").empty();
    searchMeals.meals.forEach(meal => {
        let htmlContent = `
              <div class="inner rounded-xl relative overflow-hidden group/grand" id="${meal.idMeal}">
               <img src="${meal.strMealThumb}" class="w-full">
               <div
                   class="layout flex flex-row items-center text-lg font-bold p-5 absolute top-0 left-0 right-0 bottom-0 translate-y-full   bg-[rgba(255,255,255,0.7)] group-hover/grand:-translate-y-0 transition-all duration-[0.5s]">
                   <h1>${meal.strMeal}</h1>
               </div>
           </div>`
        $("#searchResult").append(
            htmlContent
        )
    });

    $('#searchResult .inner').click(async function () {
        const details = await mealDetails(this.id);
        displayMealDeatils(details.meals[0]);

    })
});

async function searchByName(name) {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result;
}
async function searchByLetter(letter) {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result;
}
// ---------------------------------------------------------------------------------------------------------------



// --------------------------------------------------Area Page----------------------------------------------------
$('#area-btn').click(async function () {
    $('#area-page').removeClass("hidden");
    $('.search-page').addClass("hidden");
    $('#homePage').addClass("hidden");
    $('#mealsofareaa').addClass("hidden");
    $('#ingredients-page').addClass("hidden");
    $('#mealsofingggg').addClass("hidden");
    $('#formPage').addClass("hidden");
    $('#categoryPage').addClass("hidden");
    $('#mealsofcaaat').addClass("hidden");
    $('.navbar').animate({ left: -navWidth }, 500)
    $('.close-nav-btn').removeClass("fa-xmark");
    $('.close-nav-btn').addClass("fa-bars");
    $('.meal-details').addClass("hidden");


    const areas = await getAreas();
    areas.forEach(area => {
        $(".area-card").append(`
            <div class="area-inner flex flex-col justify-center items-center p-10" id="${area.strArea}">
                <i class="fa-solid fa-house-laptop fa-4x text-white"></i>
                <p class="text-white text-xl font-bold">${area.strArea}</p>
            </div>`)

    })
    $('.area-inner').click(async function () {
        const mealsOfArea = await mealsByArea(this.id);
        console.log(mealsOfArea);
        for (let i = 0; i < mealsOfArea.length; i++) {
            if (i < 20) {
                $('#mealsofareaa').append(`
                <div class="inner rounded-xl relative overflow-hidden group/grand" id="${mealsOfArea[i].idMeal}">
                   <img src="${mealsOfArea[i].strMealThumb}" class="w-full">
                   <div
                       class="layout flex flex-row items-center text-lg font-bold p-5 absolute top-0 left-0 right-0 bottom-0 translate-y-full   bg-[rgba(255,255,255,0.7)] group-hover/grand:-translate-y-0 transition-all duration-[0.5s]">
                       <h1>${mealsOfArea[i].strMeal}</h1>
                   </div>
               </div>`)
            }
        }


        $('#mealsofareaa').removeClass('hidden');
        $('#area-page').addClass("hidden");
        $('#homePage').addClass("hidden");

        $('#mealsofareaa .inner').click(async function () {
            const theMeal = await mealDetails(this.id);
            console.log(theMeal.meals);
            displayMealDeatils(theMeal.meals[0]);
            $('#area-page').addClass("hidden");
            $('#mealsofareaa').addClass('hidden');
        })

    })




})
$('#close-area-page').click(function () {
    $('#homePage').removeClass("hidden")
    $('#area-page').addClass("hidden");
})


async function getAreas() {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result.meals;
}

async function mealsByArea(area) {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result.meals;
}

// ---------------------------------------------------------------------------------------------------------------


// --------------------------------------------------Ingredients Page---------------------------------------------
$('#ingredients-btn').click(async function () {
    $('#ingredients-page').removeClass("hidden");
    $('#area-page').addClass("hidden");
    $('.search-page').addClass("hidden");
    $('#homePage').addClass("hidden");
    $('#mealsofareaa').addClass("hidden");
    $('#mealsofingggg').addClass("hidden");
    $('#formPage').addClass("hidden");
    $('#categoryPage').addClass("hidden");
    $('#mealsofcaaat').addClass("hidden");
    $('.navbar').animate({ left: -navWidth }, 500)
    $('.close-nav-btn').removeClass("fa-xmark");
    $('.close-nav-btn').addClass("fa-bars");
    $('.meal-details').addClass("hidden");

    const ingredients = await getIngredients();

    for (let i = 0; i < ingredients.length; i++) {
        if (i < 20) {
            $(".ingredients-card").append(`
                <div class="ing-inner flex flex-col justify-center items-center p-16" id="${ingredients[i].strIngredient}">
                    <i class="fa-solid fa-drumstick-bite fa-4x text-white"></i>
                    <p class="text-white text-xl font-bold">${ingredients[i].strIngredient}</p>
                    <p class="text-white">${ingredients[i].strDescription.split(' ').slice(0, 20).join(" ")}</p>
                </div>`)
        }
    }




    $('.ing-inner').click(async function () {
        const mealsOfIng = await mealsByIngredient(this.id);
        console.log(this.id);
        console.log(mealsOfIng);
        for (let i = 0; i < mealsOfIng.length; i++) {
            if (i < 20) {
                $('#mealsofingggg').append(`
                <div class="inner rounded-xl relative overflow-hidden group/grand" id="${mealsOfIng[i].idMeal}">
                   <img src="${mealsOfIng[i].strMealThumb}" class="w-full">
                   <div
                       class="layout flex flex-row items-center text-lg font-bold p-5 absolute top-0 left-0 right-0 bottom-0 translate-y-full   bg-[rgba(255,255,255,0.7)] group-hover/grand:-translate-y-0 transition-all duration-[0.5s]">
                       <h1>${mealsOfIng[i].strMeal}</h1>
                   </div>
               </div>`)
            }

        }



        $('#mealsofingggg').removeClass('hidden');
        $('#ingredients-page').addClass("hidden");
        $('#homePage').addClass("hidden")


        $('#mealsofingggg .inner').click(async function () {
            const theMeal = await mealDetails(this.id);
            console.log(theMeal.meals);
            displayMealDeatils(theMeal.meals[0]);
            $('#ingredients-page').addClass("hidden");
            $('#mealsofingggg').addClass('hidden');
        })
    })

});

$('#close-ingredients-page').click(function () {
    $('#homePage').removeClass("hidden")
    $('#ingredients-page').addClass("hidden");
})

async function getIngredients() {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result.meals;
}

async function mealsByIngredient(ing) {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result.meals;
}

// ---------------------------------------------------------------------------------------------------------------




// -----------------------------------------------Form----------------------------------------------------------------

$("#contact-us-btn").click(function () {
    $('#formPage').removeClass("hidden");
    $('#area-page').addClass("hidden");
    $('.search-page').addClass("hidden");
    $('#homePage').addClass("hidden");
    $('#mealsofareaa').addClass("hidden");
    $('#ingredients-page').addClass("hidden");
    $('#mealsofingggg').addClass("hidden");
    $('#categoryPage').addClass("hidden");
    $('#mealsofcaaat').addClass("hidden");
    $('.navbar').animate({ left: -navWidth }, 500)
    $('.close-nav-btn').removeClass("fa-xmark");
    $('.close-nav-btn').addClass("fa-bars");
    $('.meal-details').addClass("hidden");

})

const nameee = $("#Name");
const email = $("#Email");
const password = $("#Password");
const phoneNumber = $("#phoneNumber");
const rePass = $("#Rematch-Pass");
const age = $("#Age");

const nameeeRegex = /^[A-Za-z\s]+$/;
const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
const phoneNumberRegex = /^\d{11}$/;
const ageRegex = /^\d{1,3}$/;
const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;


function nameValidation() {
    if (nameeeRegex.test(nameee.val())) {
        console.log("name1");
        return true;
    }
    else {
        $('#errorMessage').removeClass("hidden");
        $('.errmsg').html(`Name Not Valid`);
    }
}

function emailValidation() {
    if (emailRegex.test(email.val())) {
        console.log("name2");
        return true;
    }
    else {
        $('#errorMessage').removeClass("hidden");
        $('.errmsg').html(`Email Not Valid`);
    }
}

function phoneValidation() {
    if (phoneNumberRegex.test(phoneNumber.val())) {
        console.log("name3");
        return true;
    }
    else {
        $('#errorMessage').removeClass("hidden");
        $('.errmsg').html(`Phone Number Not Valid`);
    }
}

function ageValidation() {
    if (ageRegex.test(age.val())) {
        console.log("name4");
        return true;
    }
    else {
        $('#errorMessage').removeClass("hidden");
        $('.errmsg').html(`Age Not Valid`);
    }
}

function passwordValidation() {
    if (passwordRegex.test(password.val())) {
        console.log("name5");
        return true;
    }
    else {
        $('#errorMessage').removeClass("hidden");
        $('.errmsg').html(`Password Not Valid`);
    }
}

function repasswordValidation() {
    if (rePass.val() == password.val()) {
        console.log("name6");
        return true;
    }
    else {
        $('#errorMessage').removeClass("hidden");
        $('.errmsg').html(`Password Not Matching`);
    }
}

$('#sub-btn').click(function(){
    if(nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation())
        {
            $('.errmsg').html(``);
            $('#errorMessage').addClass("hidden");
            $('#sub-btn').removeAttr('disabled');
            $('#sub-btn').removeClass("text-red-700");
            $('#sub-btn').removeClass("bg-transparent");
            $('#sub-btn').addClass("bg-red-500");
            $('#sub-btn').addClass("text-white");
        }   
})



// ---------------------------------------------------------------------------------------------------------------



// -----------------------------------------------Catgeory---------------------------------------------------------

$('#category-btn').click(async function () {
    $('#categoryPage').removeClass("hidden");
    $('#area-page').addClass("hidden");
    $('.search-page').addClass("hidden");
    $('#homePage').addClass("hidden");
    $('#mealsofareaa').addClass("hidden");
    $('#ingredients-page').addClass("hidden");
    $('#mealsofingggg').addClass("hidden");
    $('#formPage').addClass("hidden");
    $('#mealsofcaaat').addClass("hidden");
    $('.navbar').animate({ left: -navWidth }, 500)
    $('.close-nav-btn').removeClass("fa-xmark");
    $('.close-nav-btn').addClass("fa-bars");
    $('.meal-details').addClass("hidden");

    const categories = await getCategories();
    categories.forEach(category=>{
        $('.cat-card').append(`
             <div class="cat-inner rounded-xl relative overflow-hidden group/grand bg-slate-950 flex justify-center items-center" id="${category.strCategory}">
                <img src="${category.strCategoryThumb}" class="w-4/5">
                <div
                   class="layout flex flex-col items-center p-5 absolute top-0 left-0 right-0 bottom-0 translate-y-[200px]   bg-[rgba(255,255,255,0.7)] group-hover/grand:-translate-y-0 transition-all duration-[0.5s]">
                   <h1 class=" text-lg font-bold">${category.strCategory}</h1>
                   <p class="text-sm">${category.strCategoryDescription.split(" ").splice(0,20).join(" ")}</p>
               </div>
            </div>`)
    })

    $('.cat-inner').click(async function () {
        const mealsOfCat = await categoryMeals(this.id);
        // console.log(this.id);
        // console.log(mealsOfCat);
        for (let i = 0; i < mealsOfCat.length; i++) {
            if (i < 20) {
                $('#mealsofcaaat').append(`
                <div class="inner rounded-xl relative overflow-hidden group/grand" id="${mealsOfCat[i].idMeal}">
                   <img src="${mealsOfCat[i].strMealThumb}" class="w-full">
                   <div
                       class="layout flex flex-row items-center text-lg font-bold p-5 absolute top-0 left-0 right-0 bottom-0 translate-y-full   bg-[rgba(255,255,255,0.7)] group-hover/grand:-translate-y-0 transition-all duration-[0.5s]">
                       <h1>${mealsOfCat[i].strMeal}</h1>
                   </div>
               </div>`)
            }

        }



        $('#mealsofcaaat').removeClass('hidden');
        $('#categoryPage').addClass("hidden");
        $('#homePage').addClass("hidden")


        $('#mealsofcaaat .inner').click(async function () {
            const theMeal = await mealDetails(this.id);
            console.log(theMeal.meals);
            displayMealDeatils(theMeal.meals[0]);
            $('#category-page').addClass("hidden");
            $('#mealsofcaaat').addClass('hidden');
        })
    })

});

$('#close-category-page').click(function () {
    $('#homePage').removeClass("hidden")
    $('#categoryPage').addClass("hidden");
})

async function getCategories() {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result.categories;
}


async function categoryMeals(category) {
    $('#Loading').removeClass("hidden");
    $('body').addClass("overflow-hidden");
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const result = await response.json();
    $('#Loading').addClass("hidden");
    $('body').removeClass("overflow-hidden");
    return result.meals;
}
// ---------------------------------------------------------------------------------------------------------------