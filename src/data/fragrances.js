// src/data/fragrances.js

import versacePourHommeImg from '../assets/images/versace-pour-homme.webp';
import InvictusImg from '../assets/images/invictus.webp';
import SauvageImg from '../assets/images/sauvage.webp';
import TomFordNoirImg from '../assets/images/tom-ford-noir.webp';
import BvlgariManImg from '../assets/images/Bvlgari-man.webp';
import BleuDeChanelImg from '../assets/images/bleau-de-chanel.webp';
import VIPImg from '../assets/images/212-vip.webp';
import OneMillionImg from '../assets/images/one-million.webp';
import LightBlueImg from '../assets/images/light-blue.webp';
import HugoImg from '../assets/images/hugo.webp';
import FahrenheitImg from '../assets/images/fahrenheit.webp';
import ScandalImg from '../assets/images/scandal.webp';
import TerreDHermesImg from '../assets/images/terre-d-hermes.webp';
import LegendImg from '../assets/images/legend.webp';
import LEauDIsseyImg from '../assets/images/l-eau-d-issey.webp';
import JoopImg from '../assets/images/joop.webp';
import desireImg from '../assets/images/desire.webp';
import ArmaniSiImg from '../assets/images/armani-si-women.webp';
import LightBlueWomenImg from '../assets/images/light-blue-women.webp';
import NarcisoRodriguezImg from '../assets/images/narciso-rodriguez.webp';
import HypnoticPoisonImg from '../assets/images/hypnotic-poison.webp';
import VersaceErosPourFemmeImg from '../assets/images/versace-eros-pour-femme.webp';
import OlympeaImg from '../assets/images/olympea.webp';
import GoodGirlImg from '../assets/images/good-girl.webp';
import ScandalWomenImg from '../assets/images/scandal-women.webp';
import JAdoreImg from '../assets/images/j-adore.webp';
import BlackOpiumImg from '../assets/images/black-opium.webp';
import VersaceErosImg from '../assets/images/versace-eros.webp';
import AcquaDiGioImg from '../assets/images/acqua-di-gio.webp';
import OnlyTheBraveImg from '../assets/images/only-the-brave.webp';
import AlienImg from '../assets/images/alien-women.webp';
import AromaticsElixirImg from '../assets/images/aromatics-elixir-women.webp';
import BeDeliciousImg from '../assets/images/be-delicious-women.webp';
import ChanelNo5Img from '../assets/images/chanel-no-5-women.webp';
import CocoMademoiselleImg from '../assets/images/coco-mademoiselle-women.webp';
import ElieSaabImg from '../assets/images/elie-saab-women.webp';
import GucciRushImg from '../assets/images/gucci-rush-women.webp';
import LaVieEstBelleImg from '../assets/images/la-vie-est-belle-women.webp';
import LadyMillionImg from '../assets/images/lady-million-women.webp';
import BaccaratRougeImg from '../assets/images/baccarat-rouge-540-unisex.webp';
import MojaveGhostImg from '../assets/images/mojave-ghost-unisex.webp';
import AventusImg from '../assets/images/aventus-unisex.webp';
import IntenseOudImg from '../assets/images/intense-oud-unisex.webp';
import OmbreNomadeImg from '../assets/images/ombre-nomade-unisex.webp';
import OudWoodImg from '../assets/images/oud-wood-unisex.webp';
import LEauDIsseyWomenImg from '../assets/images/l-eau-d-issey-women.webp';


// Helper function to extract the first sentence or a short snippet for shortDescription
const getShortDescription = (fullDescription) => {
  if (!fullDescription) return '';

  const sentenceEndings = /[.!?]/;
  const firstSentenceMatch = fullDescription.match(sentenceEndings);

  if (firstSentenceMatch) {
    const endIndex = fullDescription.indexOf(firstSentenceMatch[0]) + 1;
    // If the first sentence is excessively long, cut it at a reasonable point
    if (endIndex > 150) {
      return fullDescription.substring(0, 150).trim() + '...';
    }
    return fullDescription.substring(0, endIndex).trim();
  }

  // If no clear sentence ending is found, just take the first X characters
  const maxLength = 120;
  if (fullDescription.length > maxLength) {
    return fullDescription.substring(0, maxLength).trim() + '...';
  }
  return fullDescription.trim(); // Return full description if already short
};

const allFragrancesData = [
  {
    id: '1',
    name: 'Versace Pour Homme (30ml)',
    brand: 'Versace',
    price: 70.00,
    discountedPrice: 0,
    image: versacePourHommeImg,
    longDescription: 'A classic yet modern aromatic fougère, this fragrance captures the essence of the Mediterranean. It opens with vibrant citrus notes, leading to a clean, floral heart, and settles into a warm, masculine base. Perfect for the confident and dynamic man.',
    category: 'men',
    rating: 4.5,
    reviews: 120,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '2',
    name: 'Invictus (30ml)',
    brand: 'Paco Rabanne',
    price: 70.00,
    image: InvictusImg,
    longDescription: 'A triumphant and invigorating scent that embodies victory. This fresh, woody aquatic fragrance features a dynamic blend of marine accords, grapefruit, and guaiac wood, creating a powerful and sporty aroma for the modern hero.',
    category: 'men',
    rating: 4.8,
    reviews: 155,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '3',
    name: 'Sauvage (30ml)',
    brand: 'Christian Dior',
    price: 70.00,
    discountedPrice: 0,
    image: SauvageImg,
    longDescription: 'A raw and noble composition, this highly distinctive fragrance is inspired by wide-open spaces. It features a powerful freshness of Calabrian bergamot, contrasted with the strong, woody trail of ambroxan, creating a bold and undeniably masculine signature scent.',
    category: 'men',
    rating: 4.7,
    reviews: 230,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '4',
    name: 'Tom Ford Noir (30ml)',
    brand: 'Tom Ford',
    price: 60.00,
    image: TomFordNoirImg,
    longDescription: 'An elegant and sophisticated oriental fougère, Tom Ford Noir is a fragrance of intriguing contrasts. It blends rich spices, sensual amber, and dark woods with a delicate floral heart, creating a mysterious and refined aroma for the modern gentleman.',
    category: 'men',
    rating: 4.2,
    reviews: 88,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '5',
    name: 'Bvlgari Man (30ml)',
    brand: 'Bvlgari',
    price: 60.00,
    discountedPrice: 0,
    image: BvlgariManImg,
    longDescription: "A vibrant and woody oriental, this fragrance is a sophisticated tribute to masculine strength and elegance. It opens with bright bergamot and violet leaves, leading to a heart of vetiver and cypress, settling into a warm, sensual base of cashmere wood and benzoin. It's a modern classic for the discerning man.",
    category: 'men',
    rating: 4.1,
    reviews: 65,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '6',
    name: 'Bleu De Chanel (30ml)',
    brand: 'Chanel',
    price: 80.00,
    image: BleuDeChanelImg,
    longDescription: 'An ode to masculine freedom, Bleu de Chanel is a timeless and versatile aromatic-woody fragrance. It blends invigorating citrus notes with a deep, sensual cedar and amber base, creating a sophisticated and enigmatic aroma perfect for the man who defies convention.',
    category: 'men',
    rating: 4.9,
    reviews: 310,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '7',
    name: '212 VIP (30ml)',
    brand: 'Carolina Herrera',
    price: 70.00,
    discountedPrice: 0,
    image: VIPImg,
    longDescription: "Inspired by the vibrant energy of New York's exclusive parties, this captivating oriental woody fragrance is for the modern man who makes his own rules. It features a unique blend of 'caviar lime,' chilled mint, and kingwood, creating a charismatic and unforgettable scent perfect for a night out.",
    category: 'men',
    rating: 4.3,
    reviews: 95,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '8',
    name: 'Versace Eros (30ml)',
    brand: 'Versace',
    price: 70.00,
    image: VersaceErosImg,
    longDescription: "A powerful and passionate fragrance inspired by Greek mythology, Versace Eros embodies desire and heroism. It's a fresh, oriental, and woody scent blending mint oil, green apple, and Italian lemon with warm notes of tonka bean, amber, and vanilla, creating an irresistible and magnetic aura.",
    category: 'men',
    rating: 4.6,
    reviews: 180,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '9',
    name: 'One Million (30ml)',
    brand: 'Paco Rabanne',
    price: 60.00,
    discountedPrice: 0,
    image: OneMillionImg,
    longDescription: "A bold and flamboyant woody spicy fragrance, One Million embodies luxury and power. It's a striking blend of sparkling grapefruit, mint, and blood mandarin, contrasted with a sensual heart of rose and cinnamon, resting on a rich leather and amber base. An audacious scent for the man who lives life to the fullest.",
    category: 'men',
    rating: 4.4,
    reviews: 200,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '10',
    name: 'Light Blue (30ml)',
    brand: 'Dolce & Gabbana',
    price: 70.00,
    image: LightBlueImg,
    longDescription: 'Capturing the spirit of the Sicilian summer, Light Blue is an iconic fresh and sparkling floral-fruity fragrance. It blends vibrant Sicilian lemon and crisp apple with a delicate heart of jasmine and white rose, settling into a warm amber and musk base. A truly refreshing and irresistible scent.',
    category: 'men',
    rating: 4.0,
    reviews: 78,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '11',
    name: 'Hugo (30ml)',
    brand: 'Hugo Boss',
    price: 50.00,
    discountedPrice: 0,
    image: HugoImg,
    longDescription: 'A fresh and invigorating aromatic green fragrance for the unconventional man. It combines crisp green apple, mint, and lavender with a smoky, woody base, creating a dynamic and effortlessly cool scent.',
    category: 'men',
    rating: 3.9,
    reviews: 55,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '12',
    name: 'Fahrenheit (30ml)',
    brand: 'Christian Dior',
    price: 60.00,
    image: FahrenheitImg,
    longDescription: 'A bold and distinctive leather-woody fragrance, Fahrenheit is a study in contrasts. It features unique notes of violet leaf, leather, and mandarin, creating a powerful, warm, and sophisticated aroma that stands out from the crowd.',
    category: 'men',
    rating: 4.6,
    reviews: 110,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '13',
    name: 'Scandal (30ml)',
    brand: 'Jean Paul Gaultier',
    price: 80.00,
    discountedPrice: 0,
    image: ScandalImg,
    longDescription: 'A charismatic and rebellious woody oriental fragrance, Scandal Pour Homme is a knock-out. It balances fresh notes of clary sage and mandarin with an addictive caramel and tonka bean heart, finishing with a sensual vetiver base.',
    category: 'men',
    rating: 4.2,
    reviews: 70,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '14',
    name: 'Terre D’ Hermes (30ml)',
    brand: 'Hermes',
    price: 80.00,
    image: TerreDHermesImg,
    longDescription: 'A mineral-woody fragrance deeply rooted in the earth, Terre d\'Hermès celebrates the connection between man and nature. It blends vibrant citrus and sharp pepper with flint and a rich cedarwood base, evoking a profound sense of strength and authenticity.',
    category: 'men',
    rating: 4.7,
    reviews: 130,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '15',
    name: 'Legend (30ml)',
    brand: 'Mont Blanc',
    price: 60.00,
    discountedPrice: 0,
    image: LegendImg,
    longDescription: 'A sophisticated and charismatic fougère, Legend by Mont Blanc embodies the essence of a truly inspiring man. It opens with fresh bergamot and lavender, moving to a heart of white cedarwood, and settling into a warm, sensual oakmoss and tonka bean base.',
    category: 'men',
    rating: 4.1,
    reviews: 80,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '16',
    name: 'L’Eau d’Issey (30ml)',
    brand: 'Issey Miyake',
    price: 70.00,
    image: LEauDIsseyImg,
    longDescription: 'A pure and timeless aquatic woody fragrance, L\'Eau d\'Issey is inspired by the refreshing power of water. It features a unique blend of yuzu, cypress, and warm spices, creating a clear, vibrant, and effortlessly elegant scent.',
    category: 'men',
    rating: 4.0,
    reviews: 60,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '17',
    name: 'Joop (30ml)',
    brand: 'Joop',
    price: 70.00,
    discountedPrice: 0,
    image: JoopImg,
    longDescription: 'An intensely bold and distinctive oriental fougère, Joop! Homme is a captivating and warm fragrance. It\'s known for its powerful blend of cinnamon, jasmine, and honey, grounded by a rich vanilla and sandalwood base, making it unforgettable and alluring.',
    category: 'men',
    rating: 3.8,
    reviews: 45,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '18',
    name: 'Acqua Di Gio (30ml)',
    brand: 'Giorgio Armani',
    price: 70.00,
    image: AcquaDiGioImg,
    longDescription: 'A timeless and iconic aquatic aromatic fragrance, Acqua di Giò captures the essence of the Mediterranean sea. It blends crisp bergamot and neroli with marine notes and a woody cedarwood base, creating a fresh, clean, and effortlessly masculine scent.',
    category: 'men',
    rating: 4.9,
    reviews: 280,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '19',
    name: 'Desire (30ml)',
    brand: 'Dunhill',
    price: 80.00,
    discountedPrice: 0,
    image: desireImg,
    longDescription: 'A passionate and vibrant oriental woody fragrance, Dunhill Desire is for the man who seeks to make an impression. It combines fresh apple and bergamot with a warm heart of rose and teakwood, settling into an intoxicating vanilla and musk base.',
    category: 'men',
    rating: 3.7,
    reviews: 40,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '20',
    name: 'Armani Si (30ml)',
    brand: 'Giorgio Armani',
    price: 70.00,
    image: ArmaniSiImg,
    longDescription: 'An elegant and modern chypre fruity fragrance, Armani Sì is an ode to audacious women. It features the rich scent of blackcurrant nectar, combined with a delicate floral heart and a warm, vanilla-infused base, symbolizing strength and sophistication.',
    category: 'women',
    rating: 4.8,
    reviews: 170,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '21',
    name: 'Light Blue (30ml)',
    brand: 'Dolce & Gabbana',
    price: 80.00,
    discountedPrice: 0,
    image: LightBlueWomenImg,
    longDescription: 'Capturing the joy of Mediterranean life, Light Blue is a vibrant and fresh floral fruity fragrance for women. It blends sparkling Sicilian lemon, crisp apple, and bluebell with a heart of jasmine and white rose, resting on a warm cedarwood and musk base.',
    category: 'women',
    rating: 4.5,
    reviews: 140,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '22',
    name: 'Narciso Rodriguez (30ml)',
    brand: 'Narciso Rodriguez',
    price: 80.00,
    image: NarcisoRodriguezImg,
    longDescription: 'A modern and incredibly sensual musky floral-woody fragrance, Narciso Rodriguez for Her is a tribute to femininity. It revolves around a signature heart of musk, enhanced by notes of rose, peach, and patchouli, creating an addictive and sophisticated aura.',
    category: 'women',
    rating: 4.6,
    reviews: 90,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '23',
    name: 'Hypnotic Poison (30ml)',
    brand: 'Christian Dior',
    price: 60.00,
    discountedPrice: 0,
    image: HypnoticPoisonImg,
    longDescription: 'A mesmerizing and enigmatic oriental vanilla fragrance, Hypnotic Poison is a captivating elixir. It blends bitter almond, caraway, and jasmine with a creamy vanilla and musk base, creating a mysteriously alluring and powerfully seductive scent.',
    category: 'women',
    rating: 4.7,
    reviews: 115,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '24',
    name: 'Versace Eros Pour Femme (30ml)',
    brand: 'Versace',
    price: 70.00,
    image: VersaceErosPourFemmeImg,
    longDescription: 'A radiant and sensual floral woody musk, Versace Eros Pour Femme embodies primal desire and strength. It opens with Sicilian lemon and pomegranate, leading to a heart of jasmine and peony, and settling into a creamy sandalwood and musk base.',
    category: 'women',
    rating: 4.3,
    reviews: 75,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '25',
    name: 'Olympea (30ml)',
    brand: 'Paco Rabanne',
    price: 70.00,
    discountedPrice: 0,
    image: OlympeaImg,
    longDescription: 'A divine and powerful oriental fresh fragrance, Olympéa is inspired by a modern goddess. It blends sparkling green mandarin and aquatic notes with a unique salty vanilla accord and a rich ambergris and sandalwood base, creating an intensely captivating and addictive aroma.',
    category: 'women',
    rating: 4.4,
    reviews: 105,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '26',
    name: 'Good Girl (30ml)',
    brand: 'Carolina Herrera',
    price: 60.00,
    image: GoodGirlImg,
    longDescription: 'A daring yet sophisticated oriental floral, Good Girl is a celebration of a woman\'s duality. It combines intoxicating notes of tuberose and jasmine with roasted tonka bean and cocoa, creating a powerfully seductive and modern scent with a playful edge.',
    category: 'women',
    rating: 4.9,
    reviews: 250,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '27',
    name: 'Scandal (30ml)',
    brand: 'Jean Paul Gaultier',
    price: 70.00,
    discountedPrice: 0,
    image: ScandalWomenImg,
    longDescription: 'A daring and elegant chypre honey fragrance, Scandal is a burst of Parisian chic. It opens with vibrant blood orange, leading to a sumptuous heart of honey and gardenia, and settling into a warm, patchouli-infused base, leaving an unforgettable trail.',
    category: 'women',
    rating: 4.2,
    reviews: 68,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '28',
    name: 'J’adore (30ml)',
    brand: 'Christian Dior',
    price: 70.00,
    image: JAdoreImg,
    longDescription: 'An iconic and luminous floral fragrance, J\'adore is a magnificent bouquet. It artfully blends notes of ylang-ylang, Damascena rose, and Sambac jasmine, creating a harmonious and supremely elegant aroma that celebrates absolute femininity.',
    category: 'women',
    rating: 4.8,
    reviews: 190,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '29',
    name: 'Black Opium (30ml)',
    brand: 'Yves Saint Laurent',
    price: 60.00,
    discountedPrice: 0,
    image: BlackOpiumImg,
    longDescription: 'An addictive and electrifying oriental vanilla fragrance, Black Opium is a shot of adrenaline. It combines the dark intensity of coffee beans with a sparkling white floral bouquet and a sensual vanilla and patchouli base, creating a captivating and bold statement.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '30',
    name: 'Only The Brave (30ml)',
    brand: 'Diesel',
    price: 70.00,
    discountedPrice: 0,
    image: OnlyTheBraveImg,
    longDescription: 'This classic woody, oriental fragrance opens with modern notes of leather, lemon, and sparkling fresh aromas, leading to a heart of amber and cedar. This captivating scent is designed for the bold and determined.',
    category: 'men',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '31',
    name: 'Alien (30ml)',
    brand: 'Thiery Mugler',
    price: 60.00,
    discountedPrice: 0,
    image: AlienImg,
    longDescription: 'A powerful, radiant, and gripping woody solar fragrance. It features luminous top notes of jasmine sambac, a mysterious heart of cashmeran wood, and a sensual, lingering base of white amber. A truly captivating and extraordinary scent.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '32',
    name: 'Aromatics Elixir (30ml)',
    brand: 'Clinique',
    price: 50.00,
    discountedPrice: 0,
    image: AromaticsElixirImg,
    longDescription: 'An intriguing and non-conformist floral chypre fragrance. It subtly touches the senses with notes of rose, jasmine, ylang-ylang, and vetiver, creating a complex and timeless aroma for the individualist.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '33',
    name: 'Be Delicious (30ml)',
    brand: 'DKNY',
    price: 60.00,
    discountedPrice: 0,
    image: BeDeliciousImg,
    longDescription: 'A juicy and irresistible fresh floral scent. It bursts with mouth-watering fresh apple, crisp cucumber, and sparkling grapefruit, blending into a heart of sweet magnolia, violet, and rose, and finishing with creamy sandalwood and white amber.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '34',
    name: 'Chanel No. 5 (30ml)',
    brand: 'Chanel',
    price: 80.00,
    discountedPrice: 0,
    image: ChanelNo5Img,
    longDescription: 'The timeless essence of femininity, a powdery floral bouquet. It features bright citrus top notes, a heart composed around May Rose and Jasmine, and the smooth touch of Vanilla for an incredibly sensual trail. Aldehydes create its unique, iconic presence.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '35',
    name: 'Coco Mademoiselle (30ml)',
    brand: 'Chanel',
    price: 60.00,
    discountedPrice: 0,
    image: CocoMademoiselleImg,
    longDescription: 'A vibrant Chypre Floral fragrance. Its composition includes top notes of orange, mandarin orange, orange blossom, and bergamot, with a captivating heart of mimosa, jasmine, Turkish rose, and ylang-ylang. Elegant and spirited.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '36',
    name: 'Elie Saab (30ml)',
    brand: 'Elie Saab',
    price: 60.00,
    discountedPrice: 0,
    image: ElieSaabImg,
    longDescription: 'This perfume opens with delicate notes of orange blossom. Its heart blooms with Jasmine, while the base combines cedar, patchouli, and a subtle rose honey accord, creating an elegant and luminous floral woody fragrance.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '37',
    name: 'Gucci Rush (30ml)',
    brand: 'Gucci',
    price: 60.00,
    discountedPrice: 0,
    image: GucciRushImg,
    longDescription: 'A sharp, oriental, and woody fragrance for women. This feminine scent possesses a vibrant blend of floral gardenia, coriander seeds, jasmine, and rose, anchored by a warm vanilla base. Recommended for casual wear, it makes a bold statement.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '38',
    name: 'La Vie Est Belle (30ml)',
    brand: 'Lancome',
    price: 70.00,
    discountedPrice: 0,
    image: LaVieEstBelleImg,
    longDescription: 'The iconic fragrance of happiness, a floral gourmand bouquet. It blends precious Iris accord with vibrant earthy notes of patchouli, sensual warm vanilla, and spun sugar, creating an unforgettable scent that encourages choosing your own path to joy.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '39',
    name: 'Lady Million (30ml)',
    brand: 'Paco Rabanne',
    price: 60.00,
    discountedPrice: 0,
    image: LadyMillionImg,
    longDescription: 'A woody, floral fragrance that combines fresh, carnal flowers with sexy patchouli. This fresh and addictive scent is both seductive and sensual, embodying a vibrant and confident femininity.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '40',
    name: 'Baccarat Rouge 540 (30ml)',
    brand: 'Maison Francis Kurkdjian',
    price: 100.00,
    discountedPrice: 0,
    image: BaccaratRougeImg,
    longDescription: 'A captivating oriental floral fragrance for women and men. It weaves together luminous notes of saffron and jasmine, with a warm and woody heart of amberwood and ambergris, settling into a base of fir resin and cedar. A unique and unforgettable scent.',
    category: 'unisex',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '41',
    name: 'Mojave Ghost (30ml)',
    brand: 'Byredo',
    price: 190.00,
    discountedPrice: 0,
    image: MojaveGhostImg,
    longDescription: 'A unique scent that exudes mystery and intense, earthy sensuality. It blends unusual notes, opening with exotic ambrette and sapodilla, revealing a heart of violet, magnolia, and finally drying down to a base of ambergris.',
    category: 'unisex',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '42',
    name: 'Aventus (30ml)',
    brand: 'Creed',
    price: 240.00,
    discountedPrice: 0,
    image: AventusImg,
    longDescription: 'A daring and spirited fragrance inspired by a legendary emperor. It blends captivating top notes of blackcurrant, Italian bergamot, Calville Blanc apples, and effervescent pineapple. The heart reveals a rich blend of roses, Jasmine blossom, and patchouli, culminating in a lavish base of oak moss, ambergris, and vanilla.',
    category: 'unisex',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '43',
    name: 'Intense Oud (30ml)',
    brand: 'Gucci',
    price: 280.00,
    discountedPrice: 0,
    image: IntenseOudImg,
    longDescription: 'A potent and luxurious fragrance. It features a prevailing accord of precious oud and olibanum, layered over a leathery base with the subtle sweetness of ambergris. Its balsamic profile makes it suitable for both men and women, leaving a very heavy sillage.',
    category: 'unisex',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '44',
    name: 'Ombre Nomade (30ml)',
    brand: 'Louis Vuitton',
    price: 270.00,
    discountedPrice: 0,
    image: OmbreNomadeImg,
    longDescription: 'A captivating fragrance inspired by the allure of the Orient. Its heart features rose and benzoin, adding sweetness and warmth, while the base is composed of incense, saffron, and raspberry, lending a unique and contrasting touch to this rich oud-based scent.',
    category: 'unisex',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '45',
    name: 'Oud Wood (30ml)',
    brand: 'Tom Ford',
    price: 140.00,
    discountedPrice: 0,
    image: OudWoodImg,
    longDescription: 'A groundbreaking composition of oud notes, exotic woods, and warm amber. It envelops the senses with dark, earthy sensuality. Exotic rosewood and cardamom give way to a smoky blend of precious oud notes, sandalwood, and vetiver.',
    category: 'unisex',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  },
  {
    id: '46',
    name: 'L’Eau d’Issey (30ml)',
    brand: 'Issey Miyake',
    price: 140.00,
    discountedPrice: 0,
    image: LEauDIsseyWomenImg,
    longDescription: 'A pure and harmonious aquatic floral fragrance, inspired by the clarity of water. It features delicate notes of lotus, freesia, and cyclamen, intertwined with a heart of peony and lily, and a subtle base of precious woods and osmanthus, creating a refreshing and timeless aroma.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
    stock: 0,
    showStockWarning: false,
  }
];


// Apply short description to all fragrances using 'longDescription' as source
const fragrancesWithShortDescription = allFragrancesData.map(frag => ({
  ...frag,
  shortDescription: getShortDescription(frag.longDescription) // Changed from frag.description
}));

// --- Shuffling Logic ---
const menFragrances = fragrancesWithShortDescription.filter(f => f.category === 'men');
const womenFragrances = fragrancesWithShortDescription.filter(f => f.category === 'women');
const unisexFragrances = fragrancesWithShortDescription.filter(f => f.category === 'unisex');


const firstFiveMen = menFragrances.slice(0, 5);
const firstFiveWomen = womenFragrances.slice(0, 5);

const remainingMen = menFragrances.slice(5);
const remainingWomen = womenFragrances.slice(5);

// Combine the first 10, then add the rest
const fragrances = [
  ...firstFiveMen,
  ...firstFiveWomen,
  ...remainingMen,
  ...remainingWomen,
  ...unisexFragrances
];

export default fragrances;