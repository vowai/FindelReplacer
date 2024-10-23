<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Card Timeline Game</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #121212;
            color: #e0e0e0;
            text-align: center;
        }
        .timeline {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            width: 90%;
            height: 225px;
            margin: 10px auto;
            border-radius: 10px;
            background-color: #1e1e1e;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            overflow-x: auto;
            padding: 0px;
        }
        .timeline.active {
            background-color: #083408;
        }
        .card {
            width: 100px;
            height: 180px;
            background-color: #2b2b2b;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
            padding: 10px;
            margin-right: 10px;
            text-align: center;
            cursor: grab;
            user-select: none;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .card.dragging {
            opacity: 0.5;
        }
        .year {
            font-size: 1.2em;
            font-weight: bold;
            color: #00ff00;
            display: none;
        }
        .title {
            font-size: 1em;
            color: #ffff00;
            display: none;
        }
        .artist {
            font-size: 1em;
            color: #ff0000;
            display: none;
        }
        .card button {
            background-color: #0066cc;
            color: #fff;
            border: none;
            border-radius: 5px;
            padding: 6px;
            cursor: pointer;
            transition: background-color 0.3s ease;
            margin-bottom: 5px;
        }
        .card button:hover {
            background-color: #004999;
        }
        #draw-card-button {
            margin: 20px;
            padding: 12px 25px;
            font-size: 18px;
            cursor: pointer;
            background-color: #28a745;
            color: #fff;
            border: none;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        #draw-card-button:hover {
            background-color: #218838;
        }
        #youtube-iframe-container {
            display: flex;
            justify-content: center;
            margin-top: 200px;
        }
    </style>
</head>
<body>
    <img src="https://lirp.cdn-website.com/64dee5a1/dms3rep/multi/opt/hitster-logo-small-1920w.png" alt="Card Timeline Game" style="max-width: 300px; margin-top: 20px;">
    <br><button id="draw-card-button">Draw a Card</button>
    <div class="timeline" id="timeline1"></div>
    <div class="timeline" id="timeline2"></div>
    <div id="youtube-iframe-container">
        <iframe id="youtube-iframe" width="420" height="345" style="display:none;" frameborder="1" allow="autoplay; encrypted-media"></iframe>
    </div>

    <script>
        const timeline1 = document.getElementById('timeline1');
        const timeline2 = document.getElementById('timeline2');
        const drawCardButton = document.getElementById('draw-card-button');
        const cardData = [
            { year: '1990', title: 'Title 1', artist: 'Artist 1', youtubeLink: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=0' },
            { year: '2024', title: 'Heavy is the crown', artist: 'Linkin Park', youtubeLink: 'https://www.youtube.com/embed/EiLSQTTfZvw?autoplay=1&mute=0' },
            { year: '1983', title: 'Billie Jean', artist: 'Michael Jackson', youtubeLink: 'https://www.youtube.com/embed/OZGtRvYF-A4?autoplay=1&mute=0' },
            { year: '1992', title: 'November Rain', artist: 'Guns N Roses', youtubeLink: 'https://www.youtube.com/embed/8SbUC-UaAxE?autoplay=1&mute=0' },
            { year: '2003', title: 'In Da Club', artist: '50 Cent', youtubeLink: 'https://www.youtube.com/embed/5qm8PH4xAss?autoplay=1&mute=0' },
            { year: '2012', title: 'Somebody That I Used To Know', artist: 'Gotye', youtubeLink: 'https://www.youtube.com/embed/8UVNT4wvIGY?autoplay=1&mute=0' },
            { year: '2017', title: 'Shape of You', artist: 'Ed Sheeran', youtubeLink: 'https://www.youtube.com/embed/JGwWNGJdvx8?autoplay=1&mute=0' },
            { year: '2020', title: 'Blinding Lights', artist: 'The Weeknd', youtubeLink: 'https://www.youtube.com/embed/fHI8X4OXluQ?autoplay=1&mute=0' },
            { year: '2021', title: 'Stay', artist: 'The Kid LAROI, Justin Bieber', youtubeLink: 'https://www.youtube.com/embed/kTJczUoc26U?autoplay=1&mute=0' },
            { year: '2024', title: 'Heavy is the crown', artist: 'Linkin Park', youtubeLink: 'https://www.youtube.com/embed/EiLSQTTfZvw?autoplay=1&mute=0' }
        ];

        let draggingCard = null;
        let availableCards = [...cardData];
        let currentTimeline = timeline1;
        updateTimelineIndicator();

        drawCardButton.addEventListener('click', () => {
            if (availableCards.length > 0) {
                const randomIndex = Math.floor(Math.random() * availableCards.length);
                const data = availableCards.splice(randomIndex, 1)[0];
                const card = document.createElement('div');
                card.className = 'card';
                card.draggable = true;

                const yearDiv = document.createElement('div');
                yearDiv.className = 'year';
                yearDiv.id = `year-${data.year}`;
                yearDiv.textContent = data.year;
                card.appendChild(yearDiv);

                const titleDiv = document.createElement('div');
                titleDiv.className = 'title';
                titleDiv.id = `title-${data.year}`;
                titleDiv.textContent = `${data.title}`;
                card.appendChild(titleDiv);

                const artistDiv = document.createElement('div');
                artistDiv.className = 'artist';
                artistDiv.id = `artist-${data.year}`;
                artistDiv.textContent = `${data.artist}`;
                card.appendChild(artistDiv);

                const revealButton = document.createElement('button');
                revealButton.textContent = 'Reveal Year';
                revealButton.onclick = () => {
                    revealDetails(data.year);
                    toggleTimeline();
                };
                card.appendChild(revealButton);

                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove Card';
                removeButton.onclick = () => removeCard(card);
                card.appendChild(removeButton);

                const playButton = document.createElement('button');
                playButton.textContent = 'Play Song';
                playButton.onclick = () => {
                    if (data.youtubeLink) {
                        const youtubeIframe = document.getElementById('youtube-iframe');
                        youtubeIframe.src = data.youtubeLink;
                        youtubeIframe.style.display = 'block';
                    }
                };
                card.appendChild(playButton);

                card.addEventListener('dragstart', (e) => {
                    draggingCard = card;
                    card.classList.add('dragging');
                });

                card.addEventListener('dragend', () => {
                    draggingCard = null;
                    card.classList.remove('dragging');
                });

                currentTimeline.appendChild(card);
            }
        });

        [timeline1, timeline2].forEach(timeline => {
            timeline.addEventListener('dragover', (e) => {
                e.preventDefault();
                const afterElement = getDragAfterElement(timeline, e.clientX);
                if (draggingCard) {
                    if (afterElement == null) {
                        timeline.appendChild(draggingCard);
                    } else {
                        timeline.insertBefore(draggingCard, afterElement);
                    }
                }
            });
        });

        function getDragAfterElement(container, x) {
            const draggableElements = [...container.querySelectorAll('.card:not(.dragging)')];

            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = x - box.left - box.width / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }

        function revealDetails(year) {
            const yearElement = document.getElementById(`year-${year}`);
            const titleElement = document.getElementById(`title-${year}`);
            const artistElement = document.getElementById(`artist-${year}`);
            yearElement.style.display = 'block';
            titleElement.style.display = 'block';
            artistElement.style.display = 'block';
        }

        function removeCard(card) {
            card.parentElement.removeChild(card);
        }

        function toggleTimeline() {
            currentTimeline = currentTimeline === timeline1 ? timeline2 : timeline1;
            updateTimelineIndicator();
        }

        function updateTimelineIndicator() {
            timeline1.classList.remove('active');
            timeline2.classList.remove('active');
            currentTimeline.classList.add('active');
        }
    </script>    
</body>
</html>
