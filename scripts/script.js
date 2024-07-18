const $ = document
let songList = []

const songElem = $.querySelector('#songElem')
const songImg = $.querySelector('.songImg')

const ctrlIcon = $.querySelector('#ctrlIcon')

const ctrlBtn = $.querySelector('.ctrlBtn')
const prevSongBtn = $.querySelector('.prevSongBtn')
const nextSongBtn = $.querySelector('.nextSongBtn')

const songName = $.querySelector('.songName')
const artistName = $.querySelector('.artistName')

const timeBar = $.querySelector('#timeBar')

const url = 'https://deezerdevs-deezer.p.rapidapi.com/search?q=eminem';
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
        const data = await result.data
        data.forEach(songObj=>songList.push(songObj))
        selectSong()
    } catch (error) {
        console.error(error);
    }
}
requstApi()

console.log(songList);


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
    isOK = setInterval(()=>timeBar.value = songElem.currentTime , 1000)
}