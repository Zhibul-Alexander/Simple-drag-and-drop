import React, {useState} from "react";
import "./App.css"

export const App = () => {

  const [cardList, setCardList] = useState([
    {id: 1, order: 1, text: "Card 1"},
    {id: 2, order: 2, text: "Card 2"},
    {id: 3, order: 3, text: "Card 3"},
    {id: 4, order: 4, text: "Card 4"},

  ])

  const [currentCard, setCurrentCard] = useState(null)

  const dragStartHandler = (card) => {
    setCurrentCard(card)
  }

  const dragEndHandler = (event) => {
    event.target.style.background = "white"
  }

  const dragOverHandler = (event) => {
    event.preventDefault()
    event.target.style.background = "linear-gradient(90deg, #84fab0 0%, #8fd3f4 100%)"
  }

  const dropHandler = (event, card) => {
    event.preventDefault()
    setCardList(cardList.map(c => {
      if (c.id === card.id) {
        return {...c, order: currentCard.order}
      }
      if (c.id === currentCard.id) {
        return {...c, order: card.order}
      }
      return c
    }))
    event.target.style.background = "white"
  }

  const sortCards = (a,b) => {
    if (a.order > b.order) {
      return 1
    } else {
      return -1
    }
  }


  return (
    <div className="app">
      {cardList.sort(sortCards).map(card => 
        <div className="card" draggable={true}
        onDragStart={() => dragStartHandler(card)}
        onDragLeave={(event) => dragEndHandler(event)}
        onDragEnd={(event) => dragEndHandler(event)}
        onDragOver={(event) => dragOverHandler(event)}
        onDrop={(event) => dropHandler(event, card)}
        >
          {card.text}
        </div>)}
    </div>
  )
}
