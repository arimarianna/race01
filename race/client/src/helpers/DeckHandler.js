import Boolean from './cards/Boolean';
import Ping from './cards/Ping';
import CardStack from './cards/CardStack';
import PlayerBack from './cards/PlayerBack';
import SubjectBack from './cards/SubjectBack';
import Venom from './cards/Venom';
import AntiVenom from './cards/AntiVenom';
import IronSpiderArmor from './cards/IronSpiderArmor';
import PantherHabit1 from './cards/PantherHabit1';
import PantherHabit2 from './cards/PantherHabit2';
import Ultron from './cards/Ultron';
import Mjolnir from './cards/Mjolnir';
import CloackOfLevitation from './cards/CloackOfLevitation';
import TransparentPortal1 from './cards/TransparentPortal1';
import TransparentPortal2 from './cards/TransparentPortal2';
import TransparentPortal3 from './cards/TransparentPortal3';
import TransparentPortal4 from './cards/TransparentPortal4';
import SpaceStone from './cards/SpaceStone';
import TimeStone from './cards/TimeStone';
import MindStone from './cards/MindStone';
import RealityStone from './cards/RealityStone';
import PowerStone from './cards/PowerStone';
import SoulStone from './cards/SoulStone';
import WakandanShields1 from './cards/WakandanShields1';
import WakandanShields2 from './cards/WakandanShields2';
import CaptainZelensky from './cards/CaptainZelensky';
import Ironstovich from './cards/Ironstovich';
import DavidBanner from './cards/DavidBanner';
import NickReznickov from './cards/NickReznickov';
import IrinaVereshshchuk from './cards/IrinaVereshshchuk';
import DoctorPodolyak from './cards/DoctorPodolyak';
import SpiderMayor from './cards/SpiderMayor';
import Kim from './cards/Kim';

export default class DeckHandler {
    constructor(scene) {
        this.dealCard = (x, y, name, type) => {
            let cards = {
                cardStack: new CardStack(scene),
                boolean: new Boolean(scene),
                ping: new Ping(scene),
                playerBack: new PlayerBack(scene),
                subjectBack: new SubjectBack(scene),
                venom: new Venom(scene),
                antiVenom: new AntiVenom(scene),
                ironSpiderArmor: new IronSpiderArmor(scene),
                pantherHabit1: new PantherHabit1(scene),
                pantherHabit2: new PantherHabit2(scene),
                ultron: new Ultron(scene),
                mjolnir: new Mjolnir(scene),
                cloackOfLevitation: new CloackOfLevitation(scene),
                transparentPortal1: new TransparentPortal1(scene),
                transparentPortal2: new TransparentPortal2(scene),
                transparentPortal3: new TransparentPortal3(scene),
                transparentPortal4: new TransparentPortal4(scene),
                spaceStone: new SpaceStone(scene),
                timeStone: new TimeStone(scene),
                mindStone: new MindStone(scene),
                realityStone: new RealityStone(scene),
                powerStone: new PowerStone(scene),
                soulStone: new SoulStone(scene),
                wakandanShields1: new WakandanShields1(scene),
                wakandanShields2: new WakandanShields2(scene),
                captainZelensky: new CaptainZelensky(scene),
                ironstovich: new Ironstovich(scene),
                davidBanner: new DavidBanner(scene),
                nickReznickov: new NickReznickov(scene),
                irinaVereshshchuk: new IrinaVereshshchuk(scene),
                doctorPodolyak: new DoctorPodolyak(scene),
                spiderMayor: new SpiderMayor(scene),
                kim: new Kim(scene),
            }
            let newCard = cards[name];
            console.log(name)
            return (newCard.render(x, y, type));
        }
    }
}