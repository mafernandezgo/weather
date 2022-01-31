
    const cityInput = document.querySelector(".cityInput")
    const button = document.querySelector(".searchButton")
    const cards = document.querySelector(".cards")
    let data 
    
    const iconsWeather = {
        "01d": "https://cdn-icons-png.flaticon.com/512/6420/6420909.png",
        "01n": "https://cdn-icons-png.flaticon.com/512/6420/6420944.png",
        "02d": "https://cdn-icons-png.flaticon.com/512/6421/6421067.png",
        "02n": "https://cdn-icons-png.flaticon.com/512/6420/6420905.png",
        "03d": "https://cdn-icons-png.flaticon.com/512/6420/6420902.png",
        "03n": "https://cdn-icons-png.flaticon.com/512/6420/6420902.png",
        "04d": "https://cdn-icons-png.flaticon.com/512/6420/6420902.png",
        "04n": "https://cdn-icons-png.flaticon.com/512/6420/6420902.png",
        "09d": "https://cdn-icons-png.flaticon.com/512/6420/6420913.png",
        "09n": "https://cdn-icons-png.flaticon.com/512/6420/6420913.png",
        "10d": "https://cdn-icons-png.flaticon.com/512/6421/6421125.png",
        "10n": "https://cdn-icons-png.flaticon.com/512/6421/6421125.png",
        "11d": "https://cdn-icons-png.flaticon.com/512/6420/6420929.png",
        "11n": "https://cdn-icons-png.flaticon.com/512/6420/6420929.png",
        "13d": "https://cdn-icons-png.flaticon.com/512/6420/6420978.png",
        "13n": "https://cdn-icons-png.flaticon.com/512/6420/6420978.png",
        "50d": "https://cdn-icons-png.flaticon.com/512/6420/6420993.png",
        "50n": "https://cdn-icons-png.flaticon.com/512/6420/6420993.png"
    }


    cityInput.addEventListener("input", async () => {
        let city = cityInput.value
        const key = "5572da18ed61ea08ca061407308841e0"
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`;
    
        function getData (city) { 
            return fetch(url)
            .then(response => response.json())
        }
        data = await getData()
        
    })

    cityInput.addEventListener("keyup", (event)=> {
        if (event.keyCode === 13){
            button.click()
        }
    })


    const loadCard = () => {
        const card = document.createElement("div")
        card.className = "card"
        
        const imgIcon = document.createElement("img")
        imgIcon.className="imgIcon"
        imgIcon.src = iconsWeather[data["weather"][0]["icon"]]
        
        const wrapper = document.createElement ("div")
        wrapper.className = "wrapper"

        const main = document.createElement("main")
        const currentTemperature = document.createElement("h1")
        currentTemperature.textContent =`${Math.ceil(data["main"]["temp"])}º`
        const currentWeather = document.createElement("h2")
        currentWeather.textContent = data["weather"][0]["description"] 

        const footer = document.createElement("footer")
        const currentCity = document.createElement("h3")
        currentCity.textContent = data["name"]
        const country = document.createElement("img")
        country.className = "country"
        const countryApi = data["sys"]["country"]
        const countryLowerCase = countryApi.toLowerCase()
        country.src = `https://flagcdn.com/${countryLowerCase}.svg`
        const minmaxTemperature = document.createElement("div")
        const highWrapper = document.createElement("div")
        const highIcon = document.createElement("span")
        highIcon.className= "fas fa-temperature-high"
        const highTemperature = document.createElement("span")
        highTemperature.className = "highTempValue"
        highTemperature.textContent = ` ${Math.ceil(data["main"]["temp_min"])}º`
        const lowWrapper = document.createElement("div")
        const lowIcon = document.createElement("span")
        lowIcon.className= "fas fa-temperature-low"
        const lowTemperature = document.createElement("span")
        lowTemperature.className = "lowTempValue"
        lowTemperature.textContent = ` ${Math.ceil(data["main"]["temp_max"])}º`

        lowWrapper.append(lowIcon,lowTemperature)
        highWrapper.append(highIcon,highTemperature)
        currentCity.append(country)
        minmaxTemperature.append(highWrapper,lowWrapper)
        card.appendChild(wrapper )
        wrapper.append(main,footer)
        main.append(currentTemperature,currentWeather, imgIcon)
        footer.append(currentCity,minmaxTemperature)
        cards.appendChild(card)
    }

    button.addEventListener("click", loadCard)
