const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;
const audioSource = document.getElementById('audioSource') as HTMLSourceElement;

const mp3Files: string[] = [];

function getMp3Files() {
  const today = new Date().toLocaleDateString();
  const storedDate = localStorage.getItem('mp3FilesDate');
  
  if (today === storedDate && mp3Files.length > 0) {
    return mp3Files;
  }
  
  fetch('/far-archive')
    .then(response => response.json())
    .then(data => {
      mp3Files.length = 0;
      data.forEach((file: string) => {
        if (file.endsWith('.mp3')) {
          mp3Files.push(file);
        }
      });
      localStorage.setItem('mp3FilesDate', today);
    })
    .catch(error => console.error(error));
  
  return mp3Files;
}

const playButton = document.getElementById('playButton') as HTMLButtonElement;

playButton.addEventListener('click', () => {
  const mp3Files = getMp3Files();
  const randomIndex = Math.floor(Math.random() * mp3Files.length);
  const randomFile = `far-archive/${mp3Files[randomIndex]}`;
  audioSource.src = randomFile;
  audioPlayer.load();
  audioPlayer.play();
});
