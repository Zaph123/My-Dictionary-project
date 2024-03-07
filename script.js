
    let hero_img = document.querySelector("#vector1");
    let searchBtn = document.querySelectorAll(".search-btn")
    let result = document.querySelector(".search-results")
    let sound = document.querySelector("#sound")
    let img1 = document.querySelector(".img-box")
    let img2 = document.querySelector(".scnd-img")
    let intro = document.querySelector(".h1-abs")
    let introChild = document.querySelectorAll(".left-animate")
    let formAnimate = document.querySelector(".animate")
    let loader = document.querySelector("#loading")
    let iBtn = document.querySelector(".search-btn .icon2")
    let fBtn = document.querySelector(".s-btn")
    let fInputBx = document.querySelector("#one")
    let fBtnI = document.querySelector(".s-btn i")
    let toggleBob = document.querySelector(".bgcolor-mode #toggle-switch")
    let bgMode = document.querySelectorAll(".bgcolor-mode i")
    let scrollLink = document.querySelector("#scroll_link")
    let translate = document.querySelectorAll(".translate")
     console.log(searchBtn)
    
   console.log(translate)
   window.addEventListener("scroll", () => {
    let scroll = window.pageYOffset
    console.log(scroll)
    translate.forEach(elem => {
        let speed = elem.dataset.speed;
        // console.log(speed)
        elem.style.translate = `translateY(${scroll * speed}px)`
    })
   })
   
    

    //light and dark mode
    toggleBob.addEventListener("click", () => {
    toggleBob.classList.toggle("toggle")
    document.body.classList.toggle("switch")
    
   })
     
    fBtn.addEventListener("click", () => {
        fInputBx.classList.toggle("active")
        fBtnI.classList.toggle("fa-times")
        if(fBtnI.classList.contains('fa-search')){
            fInputBx.value = ""
        }
       
        
    })
    //Intersection observer
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            entry.target.classList.toggle("active", entry.isIntersecting)
            if(entry.isIntersecting) observer.unobserve(entry.target)
            console.log(entry)
        });
    }, {
        threshold : 0.2 
    })
      observer.observe(img1)
      observer.observe(img2)
      introChild.forEach((elem) => {
        observer.observe(elem)
      })
      observer.observe(formAnimate)
      console.log(introChild)
    
      //api fetch
    

    let inputCont = document.querySelector("#word_search")
    console.log(inputCont)
    // inputCont[0].addEventListener("keyup", function(event) {
    //     if(event.key == "Enter"){
    //          getData();
    //          console.log("yes")
    //          console.log(scrollLink)
    //          scrollLink.href = "#vocab"
             
    //      }
    //      else{
    //          console.log("unable to fetch")
    //      }
        
    // })
    inputCont.addEventListener("keyup", function(event) {
       if(event.key == "Enter"){
            getData();
            console.log("yes")
        }
        else{
            console.log("unable to fetch")
        }
   })
       
     //api fetch function
    //  getData();
    const src =  "https://api.dictionaryapi.dev/api/v2/entries/en/words"
    fetch(src)
        .then(response => response.json())
        .then(get => console.log(get))

        const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

        function getData(){
            list = [];
            antonyms = [];
       console.log("cool");
        function displayLoader(){
            loader.classList.add("display")
            iBtn.classList.add("active")
        }
        function hideLoader(){
            loader.classList.remove("display")
            iBtn.classList.remove("active")
        }
        result.style.padding = "10px";
       
        let inputBx = document.querySelector("#word_search").value 
        
        displayLoader()
       
        fetch(`${url}${inputBx}`)
        .then(res => res.json())
        .then(data => {
            console.log(data[0].meanings[0].synonyms.length);
            hideLoader();
        
           list.push(data[0].meanings[0].synonyms);
           antonyms.push(data[0].meanings[0].antonyms);
       
        result.innerHTML = `
            <div class="word">
                <h2>${inputBx}<h2>
               <i class="fa-solid fa-volume-up" onclick="playAudio()"></i>
            </div>
            <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <div class="transcription"><i>${data[0].phonetic}</i></div>
            </div>
            <div class="search-answr">
               <p>1. 
                ${data[0].meanings[0].definitions[0].definition}
                </p>
                <br>
                <p>2.
                ${data[0].meanings[0].definitions[1].definition}
                </p>
            </div>
         <div class="word-eg">
            <p>
                ${data[0].meanings[0].definitions[0].example || ''}
                </p>
            </div>
            <div class="syn ant">
               <p>Synonyms: <br> ${list}
                </p>
                <br>                <p> Antonyms: <br> ${antonyms}
                </p>
                </div>
        `;
        sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
        console.log(sound)
        
    })
    .catch(() => {
        result.innerHTML = `<h3>Sorry can't find <b>word</b></h3>`
        hideLoader();
    })
  } 
  searchBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        getData();
    })

  })

    function playAudio(){
        sound.play();
    }