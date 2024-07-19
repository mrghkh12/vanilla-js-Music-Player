const $ = document
let songList = []
let currentSong = 0

const songElem = $.querySelector('#songElem')
const songImg = $.querySelector('.songImg')

const ctrlIcon = $.querySelector('#ctrlIcon')

const ctrlBtn = $.querySelector('.ctrlBtn')
const prevSongBtn = $.querySelector('.prevSongBtn')
const nextSongBtn = $.querySelector('.nextSongBtn')

const songName = $.querySelector('.songName')
const artistName = $.querySelector('.artistName')

const timeBar = $.querySelector('#timeBar')

const modalMenu = $.querySelector('.modal-song-menu')
const modalMenuContainer = $.querySelector('.song-menu')
const modalMenuBtn = $.querySelector('.moreBtn')

const url = 'https://deezerdevs-deezer.p.rapidapi.com/playlist/1677006641';
const options = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '74fa3b57d6mshcf7bcd0d762d6e5p1d32ccjsn4a6e928701d4',
		'x-rapidapi-host': 'deezerdevs-deezer.p.rapidapi.com'
	}
};

async function requstApi(){
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const data = await result.tracks.data        
        data.forEach(songObj=>songList.push(songObj))
        selectSong()
        menuSongCreator()
        activeSongInMenu()
    } catch (error) {
        console.error(error);
    }
}
requstApi()

console.log(songList);

function selectSong(){
    let mainSongDate = songList[currentSong]
    songImg.setAttribute('src', mainSongDate.album.cover_big)
    songName.innerHTML = mainSongDate.title
    songName.setAttribute('data-songname' , mainSongDate.title)
    artistName.innerHTML = mainSongDate.artist.name
    songElem.setAttribute('src' , mainSongDate.preview)
}
nextSongBtn.addEventListener('click' , nextSong)
function nextSong(){
    currentSong++
    if(currentSong > songList.length -1) currentSong = 0
    selectSong()
    songElem.play()
    ctrlIcon.classList.add('fa-pause')
    ctrlIcon.classList.remove('fa-play')
    activeSongInMenu()
}
prevSongBtn.addEventListener('click' , ()=>{
    currentSong--
    if(currentSong < 0) currentSong = songList.length -1
    selectSong()
    songElem.play()
    ctrlIcon.classList.add('fa-pause')
    ctrlIcon.classList.remove('fa-play')
    activeSongInMenu()
})

modalMenuBtn.addEventListener('click' , (e) => {
    if(e.target.classList.contains('fa-x')){
        modalMenu.style.top = '-100%'
        e.target.classList.remove('fa-x')
        e.target.classList.add('fa-bars')
    }else{
        modalMenu.style.top = 0
        e.target.classList.add('fa-x')
        e.target.classList.remove('fa-bars')
    }
    
})
function menuSongCreator(){
    songList.forEach(song => {
        modalMenuContainer.insertAdjacentHTML('beforeend', 
            ` <div class="songs" data-songname="${song.title}" onclick='playThisSong(event)'>
                  <img src="${song.album.cover_big}" alt="">
                  <div class="title">
                    <h4 class="song-Name">${song.title}</h4>
                    <p class="artist-Name">${song.artist.name}</p>
                  </div>
                  <i class="fa-solid fa-play"></i>
                </div>`
        )
    })
}

function activeSongInMenu(){
    let songsInMenu = $.querySelectorAll('.songs')
    songsInMenu.forEach(song=>{
        song.className = 'songs'
        if(song.dataset.songname == songName.dataset.songname){  
            song.classList.add('active')
        }
        
    })
    
}

function playThisSong(e){
    let mainSong = e.target
    if(!mainSong.classList.contains('songs')) mainSong = mainSong.parentElement
    if(mainSong.className == 'title') mainSong = mainSong.parentElement

    console.log(mainSong);
    let mainSongName = mainSong.dataset.songname 

    let indexMainSong = songList.findIndex(songData => mainSongName === songData.title)
    console.log(indexMainSong);
    currentSong = indexMainSong
    selectSong()
    activeSongInMenu()
    songElem.play()
}

ctrlBtn.addEventListener('click' , () => {
    if(ctrlIcon.classList.contains('fa-pause')){
        songElem.pause();
        ctrlIcon.classList.remove('fa-pause')
        ctrlIcon.classList.add('fa-play')
    }else{
        songElem.play()
        ctrlIcon.classList.add('fa-pause')
        ctrlIcon.classList.remove('fa-play')
    }
})

songElem.addEventListener('loadedmetadata' , () => {
    timeBar.max = Math.floor(songElem.duration);
})
let isOK = null
timeBar.addEventListener('mousedown', (e)=>{
    clearInterval(isOK)
})
timeBar.addEventListener('click', (e)=>{
    songElem.currentTime = Math.round((e.offsetX/e.target.offsetWidth) * timeBar.max)
    timeBar.value = songElem.currentTime;
    ctrlIcon.classList.add('fa-pause')
    ctrlIcon.classList.remove('fa-play')
    songElem.play()
})
timeBar.addEventListener('mouseup', ()=>{
    isOK = setInterval(()=>timeBar.value = songElem.currentTime , 1000)
})
if(songElem.play){
    isOK = setInterval(()=>{
        if(songElem.ended) nextSong()
        timeBar.value = songElem.currentTime
    } , 1000)
}

window.addEventListener('load' , menuSongCreator)