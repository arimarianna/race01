import SubjectBackCard from './cards/SubjectBackCard'
import SubjectCard from './cards/SubjectCard'
import PlayerCard from './cards/PlayerCard'

export default class DeckHandler {
    constructor(scene) {
        this.dealCards = (x, y, type) => {
            let cards = {
                subjectBackCard: new SubjectBackCard(scene),
                playerCard: new PlayerCard(scene),
                subjectCard: new SubjectCard(scene),
            }
            let newCard = card[name]
            return(newCard.render(x, y, type))
        }
    }
}