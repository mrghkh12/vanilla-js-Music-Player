const $ = document

const songElem = $.querySelector('#songElem')
const songImg = $.querySelector('.songImg')

const ctrlIcon = $.querySelector('#ctrlIcon')

const ctrlBtn = $.querySelector('.ctrlBtn')
const prevSongBtn = $.querySelector('.prevSongBtn')
const nextSongBtn = $.querySelector('.nextSongBtn')

const songName = $.querySelector('.songName')
const artistName = $.querySelector('.artistName')


const timeBar = $.querySelector('#timeBar')




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