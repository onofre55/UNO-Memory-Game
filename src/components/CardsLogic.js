import { useState, useRef } from "react"
import Card from "./Card"

export default function Cards() {

    const cardsArray = [

        {id: 0, card: "blueCard", status: '', img: '/unoCards/BlueCard.jpg'},
        {id: 0, card: "blueCard", status: '', img: '/unoCards/BlueCard.jpg'},
        {id: 1, card: "redCard", status: '', img: '/unoCards/RedCard.jpg'},
        {id: 1, card: "redCard", status: '', img: '/unoCards/RedCard.jpg'},
        {id: 2, card: "yellowCard", status: '', img: '/unoCards/YellowCard.png'},
        {id: 2, card: "yellowCard", status: '', img: '/unoCards/YellowCard.png'},
        {id: 3, card: "greenCard", status: '', img: '/unoCards/GreenCard.png'},
        {id: 3, card: "greenCard", status: '', img: '/unoCards/GreenCard.png'},

    ]

    //Shuffling the cardsArray and set it as the initial state for cards
    const [cards, setCards] = useState(cardsArray.sort(() => Math.random() - .5))

    const [previousCardState, setPreviousCardState] = useState(-1)
    const previousIndex = useRef(-1)

    const cardIsMatched = (index) => cards[index].status === 'active matched'
    const cardSelected = (index) => index === previousIndex.current

    const [gameDone, setGameDone] = useState(false)
    const [turns, setTurns] = useState(0);

    const matched = (currentCard, previousCardState) => {

        const updatedCards = cards.map((card, index) => {

            if(index === currentCard || index === previousCardState) {

                return {...card, status: 'active matched'}

            }

            return card

        })

        setCards(updatedCards)

        //All cards matched, game done
        if (updatedCards.every(card => card.status === 'active matched')) {

            setGameDone(true)
    
        }
    }

    const noMatch = (currentCard, previousCardState) => {

        const updatedCards = cards.map((card, index) => {

            if(index === currentCard || index === previousCardState) {

                return {...card, status: 'unmatched'}

            }

            return card

        })
        
        setCards(updatedCards)

    }

    const matchChecker = (currentCard) => {

        if(cards[currentCard].id === cards[previousCardState].id) {

            matched(currentCard, previousCardState)
            setPreviousCardState(-1)

        } else {

            //If the cards dont match id's
            const updatedCards = cards.map((card, index) => {

                if(index === currentCard) {
    
                    return {...card, status: 'active'}
    
                }
    
                return card

            })

            setCards(updatedCards)

            //Giving some time for cards to flip back
            setTimeout(() => {

                noMatch(currentCard, previousCardState)
                setPreviousCardState(-1)

            }, 500)

        }

    }

    const firstCard = (index) => {

        previousIndex.current = index

        const updatedCards = cards.map((card, i) => {

            if(i == index) {

                return {...card, status: 'active'}

            }

            return card
        })

        setCards(updatedCards)
        //Storing index in the state so it can be later compared
        setPreviousCardState(index) 

    }

    const secondCard = (index) => {

        matchChecker(index)
        previousIndex.current = -1
        setTurns(prevTurns => prevTurns + 1);

    }


    const clickFunc = (index) => {

        if(cardSelected(index)) {

            alert('Card Selected')
            return

        }

        if(cardIsMatched(index)) {

            alert('Cards Matched')
            return

        }

        //Check no card selected
        if(previousCardState === -1) {

            firstCard(index)

        } else {

            secondCard(index)

        }

    }

    const resetGame = () => {

        setGameDone(false);
        setPreviousCardState(-1); 
        previousIndex.current = -1
        setCards(cardsArray.sort(() => Math.random() - 0.5));
        setTurns(0);

    }

    return (
    
    <>
        {gameDone ? (

            <>

            <h2 className="end-game-message"><span className="congratulations-word">Congratulations! </span><span className="all-word">All</span> <span className="cards-word">cards</span> <span className="matched-word">matched!</span></h2>
            <button className="play-again" onClick={resetGame}>Play Again?</button>
            <h3 className="turns-count">You finished the game in {turns} turns</h3>

            </>

        ): (

        //Looping through cards and rendering each card component
        <div className="container">

        {cards.map((card, index) =>{

            return<Card card={card} key={index} index={index} clickFunc={clickFunc}/>

        })}</div>)}

    </>

    )
}