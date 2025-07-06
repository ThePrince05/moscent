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
import ArmaniSiImg from '../assets/images/armani-si.webp';
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
    discountedPrice: 59.99,
    image: versacePourHommeImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A classic yet modern aromatic fougère, this fragrance captures the essence of the Mediterranean. It opens with vibrant citrus notes, leading to a clean, floral heart, and settles into a warm, masculine base. Perfect for the confident and dynamic man.',
    category: 'men',
    rating: 4.5,
    reviews: 120,
  },
  {
    id: '2',
    name: 'Invictus (30ml)',
    brand: 'Paco Rabanne',
    price: 70.00,
    image: InvictusImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A triumphant and invigorating scent that embodies victory. This fresh, woody aquatic fragrance features a dynamic blend of marine accords, grapefruit, and guaiac wood, creating a powerful and sporty aroma for the modern hero.',
    category: 'men',
    rating: 4.8,
    reviews: 155,
  },
  {
    id: '3',
    name: 'Sauvage (30ml)',
    brand: 'Christian Dior',
    price: 70.00,
    discountedPrice: 65.00,
    image: SauvageImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A raw and noble composition, this highly distinctive fragrance is inspired by wide-open spaces. It features a powerful freshness of Calabrian bergamot, contrasted with the strong, woody trail of ambroxan, creating a bold and undeniably masculine signature scent.',
    category: 'men',
    rating: 4.7,
    reviews: 230,
  },
  {
    id: '4',
    name: 'Tom Ford Noir (30ml)',
    brand: 'Tom Ford',
    price: 70.00,
    image: TomFordNoirImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'An elegant and sophisticated oriental fougère, Tom Ford Noir is a fragrance of intriguing contrasts. It blends rich spices, sensual amber, and dark woods with a delicate floral heart, creating a mysterious and refined aroma for the modern gentleman.',
    category: 'men',
    rating: 4.2,
    reviews: 88,
  },
  {
    id: '5',
    name: 'Bvlgari Man (30ml)',
    brand: 'Bvlgari',
    price: 70.00,
    discountedPrice: 60.00,
    image: BvlgariManImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: "A vibrant and woody oriental, this fragrance is a sophisticated tribute to masculine strength and elegance. It opens with bright bergamot and violet leaves, leading to a heart of vetiver and cypress, settling into a warm, sensual base of cashmere wood and benzoin. It's a modern classic for the discerning man.",
    category: 'men',
    rating: 4.1,
    reviews: 65,
  },
  {
    id: '6',
    name: 'Bleu De Chanel (30ml)',
    brand: 'Chanel',
    price: 70.00,
    image: BleuDeChanelImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'An ode to masculine freedom, Bleu de Chanel is a timeless and versatile aromatic-woody fragrance. It blends invigorating citrus notes with a deep, sensual cedar and amber base, creating a sophisticated and enigmatic aroma perfect for the man who defies convention.',
    category: 'men',
    rating: 4.9,
    reviews: 310,
  },
  {
    id: '7',
    name: '212 VIP (30ml)',
    brand: 'Carolina Herrera',
    price: 70.00,
    discountedPrice: 55.00,
    image: VIPImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: "Inspired by the vibrant energy of New York's exclusive parties, this captivating oriental woody fragrance is for the modern man who makes his own rules. It features a unique blend of 'caviar lime,' chilled mint, and kingwood, creating a charismatic and unforgettable scent perfect for a night out.",
    category: 'men',
    rating: 4.3,
    reviews: 95,
  },
  {
    id: '8',
    name: 'Versace Eros (30ml)',
    brand: 'Versace',
    price: 70.00,
    image: VersaceErosImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: "A powerful and passionate fragrance inspired by Greek mythology, Versace Eros embodies desire and heroism. It's a fresh, oriental, and woody scent blending mint oil, green apple, and Italian lemon with warm notes of tonka bean, amber, and vanilla, creating an irresistible and magnetic aura.",
    category: 'men',
    rating: 4.6,
    reviews: 180,
  },
  {
    id: '9',
    name: 'One Million (30ml)',
    brand: 'Paco Rabanne',
    price: 70.00,
    discountedPrice: 62.50,
    image: OneMillionImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: "A bold and flamboyant woody spicy fragrance, One Million embodies luxury and power. It's a striking blend of sparkling grapefruit, mint, and blood mandarin, contrasted with a sensual heart of rose and cinnamon, resting on a rich leather and amber base. An audacious scent for the man who lives life to the fullest.",
    category: 'men',
    rating: 4.4,
    reviews: 200,
  },
  {
    id: '10',
    name: 'Light Blue (30ml)',
    brand: 'Dolce & Gabbana',
    price: 70.00,
    image: LightBlueImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'Capturing the spirit of the Sicilian summer, Light Blue is an iconic fresh and sparkling floral-fruity fragrance. It blends vibrant Sicilian lemon and crisp apple with a delicate heart of jasmine and white rose, settling into a warm amber and musk base. A truly refreshing and irresistible scent.',
    category: 'men',
    rating: 4.0,
    reviews: 78,
  },
  {
    id: '11',
    name: 'Hugo (30ml)',
    brand: 'Hugo Boss',
    price: 70.00,
    discountedPrice: 58.00,
    image: HugoImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A fresh and invigorating aromatic green fragrance for the unconventional man. It combines crisp green apple, mint, and lavender with a smoky, woody base, creating a dynamic and effortlessly cool scent.',
    category: 'men',
    rating: 3.9,
    reviews: 55,
  },
  {
    id: '12',
    name: 'Fahrenheit (30ml)',
    brand: 'Christian Dior',
    price: 70.00,
    image: FahrenheitImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A bold and distinctive leather-woody fragrance, Fahrenheit is a study in contrasts. It features unique notes of violet leaf, leather, and mandarin, creating a powerful, warm, and sophisticated aroma that stands out from the crowd.',
    category: 'men',
    rating: 4.6,
    reviews: 110,
  },
  {
    id: '13',
    name: 'Scandal (30ml)',
    brand: 'Jean Paul Gaultier',
    price: 70.00,
    discountedPrice: 63.00,
    image: ScandalImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A charismatic and rebellious woody oriental fragrance, Scandal Pour Homme is a knock-out. It balances fresh notes of clary sage and mandarin with an addictive caramel and tonka bean heart, finishing with a sensual vetiver base.',
    category: 'men',
    rating: 4.2,
    reviews: 70,
  },
  {
    id: '14',
    name: 'Terre D’ Hermes (30ml)',
    brand: 'Hermes',
    price: 70.00,
    image: TerreDHermesImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A mineral-woody fragrance deeply rooted in the earth, Terre d\'Hermès celebrates the connection between man and nature. It blends vibrant citrus and sharp pepper with flint and a rich cedarwood base, evoking a profound sense of strength and authenticity.',
    category: 'men',
    rating: 4.7,
    reviews: 130,
  },
  {
    id: '15',
    name: 'Legend (30ml)',
    brand: 'Mont Blanc',
    price: 70.00,
    discountedPrice: 60.00,
    image: LegendImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A sophisticated and charismatic fougère, Legend by Mont Blanc embodies the essence of a truly inspiring man. It opens with fresh bergamot and lavender, moving to a heart of white cedarwood, and settling into a warm, sensual oakmoss and tonka bean base.',
    category: 'men',
    rating: 4.1,
    reviews: 80,
  },
  {
    id: '16',
    name: 'L’Eau d’Issey (30ml)',
    brand: 'Issey Miyake',
    price: 70.00,
    image: LEauDIsseyImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A pure and timeless aquatic woody fragrance, L\'Eau d\'Issey is inspired by the refreshing power of water. It features a unique blend of yuzu, cypress, and warm spices, creating a clear, vibrant, and effortlessly elegant scent.',
    category: 'men',
    rating: 4.0,
    reviews: 60,
  },
  {
    id: '17',
    name: 'Joop (30ml)',
    brand: 'Joop',
    price: 70.00,
    discountedPrice: 50.00,
    image: JoopImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'An intensely bold and distinctive oriental fougère, Joop! Homme is a captivating and warm fragrance. It\'s known for its powerful blend of cinnamon, jasmine, and honey, grounded by a rich vanilla and sandalwood base, making it unforgettable and alluring.',
    category: 'men',
    rating: 3.8,
    reviews: 45,
  },
  {
    id: '18',
    name: 'Acqua Di Gio (30ml)',
    brand: 'Giorgio Armani',
    price: 70.00,
    image: AcquaDiGioImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A timeless and iconic aquatic aromatic fragrance, Acqua di Giò captures the essence of the Mediterranean sea. It blends crisp bergamot and neroli with marine notes and a woody cedarwood base, creating a fresh, clean, and effortlessly masculine scent.',
    category: 'men',
    rating: 4.9,
    reviews: 280,
  },
  {
    id: '19',
    name: 'Desire (30ml)',
    brand: 'Dunhill',
    price: 70.00,
    discountedPrice: 61.00,
    image: desireImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A passionate and vibrant oriental woody fragrance, Dunhill Desire is for the man who seeks to make an impression. It combines fresh apple and bergamot with a warm heart of rose and teakwood, settling into an intoxicating vanilla and musk base.',
    category: 'men',
    rating: 3.7,
    reviews: 40,
  },
  {
    id: '20',
    name: 'Armani Si (30ml)',
    brand: 'Giorgio Armani',
    price: 70.00,
    image: ArmaniSiImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'An elegant and modern chypre fruity fragrance, Armani Sì is an ode to audacious women. It features the rich scent of blackcurrant nectar, combined with a delicate floral heart and a warm, vanilla-infused base, symbolizing strength and sophistication.',
    category: 'women',
    rating: 4.8,
    reviews: 170,
  },
  {
    id: '21',
    name: 'Light Blue (30ml)',
    brand: 'Dolce & Gabbana',
    price: 70.00,
    discountedPrice: 65.00,
    image: LightBlueWomenImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'Capturing the joy of Mediterranean life, Light Blue is a vibrant and fresh floral fruity fragrance for women. It blends sparkling Sicilian lemon, crisp apple, and bluebell with a heart of jasmine and white rose, resting on a warm cedarwood and musk base.',
    category: 'women',
    rating: 4.5,
    reviews: 140,
  },
  {
    id: '22',
    name: 'Narciso Rodriguez (30ml)',
    brand: 'Narciso Rodriguez',
    price: 70.00,
    image: NarcisoRodriguezImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A modern and incredibly sensual musky floral-woody fragrance, Narciso Rodriguez for Her is a tribute to femininity. It revolves around a signature heart of musk, enhanced by notes of rose, peach, and patchouli, creating an addictive and sophisticated aura.',
    category: 'women',
    rating: 4.6,
    reviews: 90,
  },
  {
    id: '23',
    name: 'Hypnotic Poison (30ml)',
    brand: 'Christian Dior',
    price: 70.00,
    discountedPrice: 60.00,
    image: HypnoticPoisonImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A mesmerizing and enigmatic oriental vanilla fragrance, Hypnotic Poison is a captivating elixir. It blends bitter almond, caraway, and jasmine with a creamy vanilla and musk base, creating a mysteriously alluring and powerfully seductive scent.',
    category: 'women',
    rating: 4.7,
    reviews: 115,
  },
  {
    id: '24',
    name: 'Versace Eros Pour Femme (30ml)',
    brand: 'Versace',
    price: 70.00,
    image: VersaceErosPourFemmeImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A radiant and sensual floral woody musk, Versace Eros Pour Femme embodies primal desire and strength. It opens with Sicilian lemon and pomegranate, leading to a heart of jasmine and peony, and settling into a creamy sandalwood and musk base.',
    category: 'women',
    rating: 4.3,
    reviews: 75,
  },
  {
    id: '25',
    name: 'Olympea (30ml)',
    brand: 'Paco Rabanne',
    price: 70.00,
    discountedPrice: 62.00,
    image: OlympeaImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A divine and powerful oriental fresh fragrance, Olympéa is inspired by a modern goddess. It blends sparkling green mandarin and aquatic notes with a unique salty vanilla accord and a rich ambergris and sandalwood base, creating an intensely captivating and addictive aroma.',
    category: 'women',
    rating: 4.4,
    reviews: 105,
  },
  {
    id: '26',
    name: 'Good Girl (30ml)',
    brand: 'Carolina Herrera',
    price: 70.00,
    image: GoodGirlImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A daring yet sophisticated oriental floral, Good Girl is a celebration of a woman\'s duality. It combines intoxicating notes of tuberose and jasmine with roasted tonka bean and cocoa, creating a powerfully seductive and modern scent with a playful edge.',
    category: 'women',
    rating: 4.9,
    reviews: 250,
  },
  {
    id: '27',
    name: 'Scandal (30ml)',
    brand: 'Jean Paul Gaultier',
    price: 70.00,
    discountedPrice: 58.00,
    image: ScandalWomenImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'A daring and elegant chypre honey fragrance, Scandal is a burst of Parisian chic. It opens with vibrant blood orange, leading to a sumptuous heart of honey and gardenia, and settling into a warm, patchouli-infused base, leaving an unforgettable trail.',
    category: 'women',
    rating: 4.2,
    reviews: 68,
  },
  {
    id: '28',
    name: 'J’adore (30ml)',
    brand: 'Christian Dior',
    price: 70.00,
    image: JAdoreImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'An iconic and luminous floral fragrance, J\'adore is a magnificent bouquet. It artfully blends notes of ylang-ylang, Damascena rose, and Sambac jasmine, creating a harmonious and supremely elegant aroma that celebrates absolute femininity.',
    category: 'women',
    rating: 4.8,
    reviews: 190,
  },
  {
    id: '29',
    name: 'Black Opium (30ml)',
    brand: 'Yves Saint Laurent',
    price: 70.00,
    discountedPrice: 60.00,
    image: BlackOpiumImg,
    // RENAMED 'description' to 'longDescription' here
    longDescription: 'An addictive and electrifying oriental vanilla fragrance, Black Opium is a shot of adrenaline. It combines the dark intensity of coffee beans with a sparkling white floral bouquet and a sensual vanilla and patchouli base, creating a captivating and bold statement.',
    category: 'women',
    rating: 4.7,
    reviews: 160,
  },
];

// Apply short description to all fragrances using 'longDescription' as source
const fragrancesWithShortDescription = allFragrancesData.map(frag => ({
  ...frag,
  shortDescription: getShortDescription(frag.longDescription) // Changed from frag.description
}));

// --- Shuffling Logic ---
const menFragrances = fragrancesWithShortDescription.filter(f => f.category === 'men');
const womenFragrances = fragrancesWithShortDescription.filter(f => f.category === 'women');

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
];

export default fragrances;