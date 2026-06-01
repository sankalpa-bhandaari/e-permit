//src/components/data/jsx
import acapImage from "./assets/acap.jpeg";
import gcaImage from "./assets/GCA.jpg";
import mcapImage from "./assets/MCA.jpg";

import { MdNaturePeople, MdScience, MdSchool, MdCardTravel } from "react-icons/md";

export const SERVICES = [
  {
    id: "tourism",
    name: "Tourism Permit",
    icon: MdCardTravel,
    description: "Required for tourists visiting Nepal's protected areas.",
  },
  {
    id: "research",
    name: "Research Permit",
    icon: MdScience,
    description: "For academic or scientific research in conservation areas.",
  },
  {
    id: "education",
    name: "Educational Permit",
    icon: MdSchool,
    description: "For volunteering, educational projects in conservation areas.",
  },
  {
    id: "conservation",
    name: "Conservation Work Permit",
    icon: MdNaturePeople,
    description: "For volunteering conservation work.",
  },
];

export const NATIONALITIES = [
  { country: "Afghanistan", nationality: "Afghan" },
  { country: "Albania", nationality: "Albanian" },
  { country: "Algeria", nationality: "Algerian" },
  { country: "Andorra", nationality: "Andorran" },
  { country: "Angola", nationality: "Angolan" },
  { country: "Antigua and Barbuda", nationality: "Antiguan" },
  { country: "Argentina", nationality: "Argentine" },
  { country: "Armenia", nationality: "Armenian" },
  { country: "Australia", nationality: "Australian" },
  { country: "Austria", nationality: "Austrian" },
  { country: "Azerbaijan", nationality: "Azerbaijani" },
  { country: "Bahamas", nationality: "Bahamian" },
  { country: "Bahrain", nationality: "Bahraini" },
  { country: "Bangladesh", nationality: "Bangladeshi" },
  { country: "Barbados", nationality: "Barbadian" },
  { country: "Belarus", nationality: "Belarusian" },
  { country: "Belgium", nationality: "Belgian" },
  { country: "Belize", nationality: "Belizean" },
  { country: "Benin", nationality: "Beninese" },
  { country: "Bhutan", nationality: "Bhutanese" },
  { country: "Bolivia", nationality: "Bolivian" },
  { country: "Bosnia and Herzegovina", nationality: "Bosnian" },
  { country: "Botswana", nationality: "Botswanan" },
  { country: "Brazil", nationality: "Brazilian" },
  { country: "Brunei", nationality: "Bruneian" },
  { country: "Bulgaria", nationality: "Bulgarian" },
  { country: "Burundi", nationality: "Burundian" },
  { country: "Cambodia", nationality: "Cambodian" },
  { country: "Cameroon", nationality: "Cameroonian" },
  { country: "Canada", nationality: "Canadian" },
  { country: "Cape Verde", nationality: "Cape Verdean" },
  { country: "Central African Republic", nationality: "Central African" },
  { country: "Chad", nationality: "Chadian" },
  { country: "Chile", nationality: "Chilean" },
  { country: "China", nationality: "Chinese" },
  { country: "Colombia", nationality: "Colombian" },
  { country: "Comoros", nationality: "Comorian" },
  { country: "Congo", nationality: "Congolese" },
  { country: "Costa Rica", nationality: "Costa Rican" },
  { country: "Croatia", nationality: "Croatian" },
  { country: "Cuba", nationality: "Cuban" },
  { country: "Cyprus", nationality: "Cypriot" },
  { country: "Czech Republic", nationality: "Czech" },
  { country: "Denmark", nationality: "Danish" },
  { country: "Djibouti", nationality: "Djiboutian" },
  { country: "Dominican Republic", nationality: "Dominican" },
  { country: "Ecuador", nationality: "Ecuadorian" },
  { country: "Egypt", nationality: "Egyptian" },
  { country: "El Salvador", nationality: "Salvadoran" },
  { country: "Equatorial Guinea", nationality: "Equatorial Guinean" },
  { country: "Eritrea", nationality: "Eritrean" },
  { country: "Estonia", nationality: "Estonian" },
  { country: "Ethiopia", nationality: "Ethiopian" },
  { country: "Fiji", nationality: "Fijian" },
  { country: "Finland", nationality: "Finnish" },
  { country: "France", nationality: "French" },
  { country: "Gabon", nationality: "Gabonese" },
  { country: "Gambia", nationality: "Gambian" },
  { country: "Georgia", nationality: "Georgian" },
  { country: "Germany", nationality: "German" },
  { country: "Ghana", nationality: "Ghanaian" },
  { country: "Greece", nationality: "Greek" },
  { country: "Grenada", nationality: "Grenadian" },
  { country: "Guatemala", nationality: "Guatemalan" },
  { country: "Guinea", nationality: "Guinean" },
  { country: "Guyana", nationality: "Guyanese" },
  { country: "Haiti", nationality: "Haitian" },
  { country: "Honduras", nationality: "Honduran" },
  { country: "Hungary", nationality: "Hungarian" },
  { country: "Iceland", nationality: "Icelandic" },
  { country: "India", nationality: "Indian" },
  { country: "Indonesia", nationality: "Indonesian" },
  { country: "Iran", nationality: "Iranian" },
  { country: "Iraq", nationality: "Iraqi" },
  { country: "Ireland", nationality: "Irish" },
  { country: "Israel", nationality: "Israeli" },
  { country: "Italy", nationality: "Italian" },
  { country: "Jamaica", nationality: "Jamaican" },
  { country: "Japan", nationality: "Japanese" },
  { country: "Jordan", nationality: "Jordanian" },
  { country: "Kazakhstan", nationality: "Kazakhstani" },
  { country: "Kenya", nationality: "Kenyan" },
  { country: "Kuwait", nationality: "Kuwaiti" },
  { country: "Kyrgyzstan", nationality: "Kyrgyz" },
  { country: "Laos", nationality: "Laotian" },
  { country: "Latvia", nationality: "Latvian" },
  { country: "Lebanon", nationality: "Lebanese" },
  { country: "Liberia", nationality: "Liberian" },
  { country: "Libya", nationality: "Libyan" },
  { country: "Lithuania", nationality: "Lithuanian" },
  { country: "Luxembourg", nationality: "Luxembourger" },
  { country: "Madagascar", nationality: "Malagasy" },
  { country: "Malawi", nationality: "Malawian" },
  { country: "Malaysia", nationality: "Malaysian" },
  { country: "Maldives", nationality: "Maldivian" },
  { country: "Mali", nationality: "Malian" },
  { country: "Malta", nationality: "Maltese" },
  { country: "Mauritania", nationality: "Mauritanian" },
  { country: "Mauritius", nationality: "Mauritian" },
  { country: "Mexico", nationality: "Mexican" },
  { country: "Moldova", nationality: "Moldovan" },
  { country: "Monaco", nationality: "Monegasque" },
  { country: "Mongolia", nationality: "Mongolian" },
  { country: "Montenegro", nationality: "Montenegrin" },
  { country: "Morocco", nationality: "Moroccan" },
  { country: "Mozambique", nationality: "Mozambican" },
  { country: "Namibia", nationality: "Namibian" },
  { country: "Nepal", nationality: "Nepalese" },
  { country: "Netherlands", nationality: "Dutch" },
  { country: "New Zealand", nationality: "New Zealander" },
  { country: "Nicaragua", nationality: "Nicaraguan" },
  { country: "Nigeria", nationality: "Nigerian" },
  { country: "North Korea", nationality: "North Korean" },
  { country: "Norway", nationality: "Norwegian" },
  { country: "Oman", nationality: "Omani" },
  { country: "Pakistan", nationality: "Pakistani" },
  { country: "Panama", nationality: "Panamanian" },
  { country: "Paraguay", nationality: "Paraguayan" },
  { country: "Peru", nationality: "Peruvian" },
  { country: "Philippines", nationality: "Filipino" },
  { country: "Poland", nationality: "Polish" },
  { country: "Portugal", nationality: "Portuguese" },
  { country: "Qatar", nationality: "Qatari" },
  { country: "Romania", nationality: "Romanian" },
  { country: "Russia", nationality: "Russian" },
  { country: "Rwanda", nationality: "Rwandan" },
  { country: "Saudi Arabia", nationality: "Saudi" },
  { country: "Senegal", nationality: "Senegalese" },
  { country: "Serbia", nationality: "Serbian" },
  { country: "Singapore", nationality: "Singaporean" },
  { country: "Slovakia", nationality: "Slovak" },
  { country: "Slovenia", nationality: "Slovenian" },
  { country: "Somalia", nationality: "Somali" },
  { country: "South Africa", nationality: "South African" },
  { country: "South Korea", nationality: "South Korean" },
  { country: "Spain", nationality: "Spanish" },
  { country: "Sri Lanka", nationality: "Sri Lankan" },
  { country: "Sudan", nationality: "Sudanese" },
  { country: "Suriname", nationality: "Surinamese" },
  { country: "Sweden", nationality: "Swedish" },
  { country: "Switzerland", nationality: "Swiss" },
  { country: "Syria", nationality: "Syrian" },
  { country: "Taiwan", nationality: "Taiwanese" },
  { country: "Tajikistan", nationality: "Tajik" },
  { country: "Tanzania", nationality: "Tanzanian" },
  { country: "Thailand", nationality: "Thai" },
  { country: "Togo", nationality: "Togolese" },
  { country: "Tonga", nationality: "Tongan" },
  { country: "Tunisia", nationality: "Tunisian" },
  { country: "Turkey", nationality: "Turkish" },
  { country: "Turkmenistan", nationality: "Turkmen" },
  { country: "Uganda", nationality: "Ugandan" },
  { country: "Ukraine", nationality: "Ukrainian" },
  { country: "United Arab Emirates", nationality: "Emirati" },
  { country: "United Kingdom", nationality: "British" },
  { country: "United States", nationality: "American" },
  { country: "Uruguay", nationality: "Uruguayan" },
  { country: "Uzbekistan", nationality: "Uzbek" },
  { country: "Venezuela", nationality: "Venezuelan" },
  { country: "Vietnam", nationality: "Vietnamese" },
  { country: "Yemen", nationality: "Yemeni" },
  { country: "Zambia", nationality: "Zambian" },
  { country: "Zimbabwe", nationality: "Zimbabwean" }
];

export const saarc = [
  "Afghan","Bangladeshi","Bhutanese","Indian","Maldivian","Nepalese","Pakistani","Sri Lankan"
];

export const GENDERS = ["Female", "Male", "Other"];

export const PURPOSES = [ "Research", "Tourism", "Conservation Work", "Educational Visit"];

export const CONSERVATION_AREAS = [
 {
  id: 1,
  name: "Annapurna Conservation Area Project (ACAP)",
  treks: [
    "Annapurna Sanctuary (ABC) Trek",
    "Jomsom Trek",
    "Jomsom–Muktinath Trek",
    "Annapurna Circuit / Round Annapurna Trek",
    "Sikles Trek",
    "Mardi Himal Trek",
    "Upper Mustang Trek",
    "Kharpani (Tatopani)",
    "Machhapuchhre Model Trek",
    "Ghorepani / Poon Hill Trek",
    "Ghorepani Ghandruk Circuit Trek",
    "Khayar Baraha Trek",
    "Manang Trek",
    "Ghalegaun Bhujung / Ghanpokhara Trek",
    "Ghalekharka Sikles Eco Trek",
    "Nar Phu Trek",
    "Tilicho Tal Trek",
    "Others"
  ],
  desc: "ACAP covers areas such as Annapurna Sanctuary (ABC) Trek, Jomsom Trek, Jomsom–Muktinath Trek, Annapurna Circuit, Sikles Trek, Mardi Himal Trek, Upper Mustang Trek, Dhampus Trek, Tatopani (Kharpani), Machhapuchhre Model Trek, Ghorepani / Poon Hill Trek, Ghorepani–Ghandruk Circuit Trek, Khayar Baraha Trek, Manang Trek, Ghalegaun Bhujung/Ghanpokhara Trek, Ghalekharka Sikles Eco Trek, Nar Phu Trek, Tilicho Tal Trek, and other surrounding regions.",
  image: acapImage
},
  {
    id: 2,
    name: "Manaslu Conservation Area Project (MCAP)",
    treks: [
      "Bhimtang",
      "Chhekampar",
      "Gorkha Round",
      "Larke Pass",
      "Samagaun",
      "Tsum Valley",
      "Others"
    ],
    desc: "MCAP covers areas such as Bhimtang, Chhekampar, Gorkha Round, Larke Pass, Samagaun, Tsum Valley, and other surrounding regions.",
    image: mcapImage,
  },
  {
    id: 3,
    name: "Gaurishankar Conservation Area Project (GCAP)",
    treks: [
      "Kalinchwok",
      "Rolwaling Gaurishanker",
      "Shivalaya via Sagarmatha",
      "Tscho Rolpa Trek",
      "Others"
    ],
    desc: "Gaurishankar Conservation Area is a protected Himalayan region in Nepal located between Langtang and Sagarmatha National Parks. It includes Kalinchowk, Rolwaling Valley, Shivalaya, and Tsho Rolpa Lake, and is rich in mountains, glaciers, wildlife, and local cultures.",
    image: gcaImage,
  }
];

export const rates = {
  foreigner: 3000,
  saarc: 1000,
  nepalese: 100,
};

export const onlinePaymentChargePercent = 2.9;


// Rules – Do & Don't Lists
export const DOS_LIST = [
  'Carry your permit and identification at all times',
  'Follow designated trails and paths',
  'Respect wildlife and maintain safe distances',
  'Dispose of waste properly - carry out what you carry in',
  'Support local communities by using local services',
  'Follow guide instructions and safety protocols',
  'Report any emergencies or violations immediately',
  'Respect cultural sites and local customs',
  'Use eco-friendly products and minimize plastic use',
  'Conserve water and energy during your visit',
  'Stay informed about weather and trail conditions'
];

export const DONTS_LIST = [
  'Do not litter or leave any waste behind',
  'Do not disturb or feed wildlife',
  'Do not pick plants or flowers',
  'Do not make loud noises that disturb wildlife',
  'Do not camp outside designated areas',
  'Do not light fires except in permitted areas',
  'Do not bring prohibited items (plastics, weapons)',
  'Do not enter restricted or closed areas',
  'Do not disrespect local communities or traditions',
  'Do not disturb or injure animals',

];

// Function to get fee details based on nationality
export const getFeeDetails = (nationality) => {
  if (!nationality) return { type: "Foreigner", amount: rates.foreigner, countryName: "Unknown" };

  const nat = nationality.trim().toLowerCase();

  // Find full country object
  const countryObj = NATIONALITIES.find(c => c.nationality.toLowerCase() === nat);
  const countryName = countryObj ? countryObj.country : nationality;

  if (nat === "nepalese" || nat === "nepal") {
    return { type: "Nepalese Citizen", amount: rates.nepalese, countryName };
  }

  if (saarc.map(c => c.toLowerCase()).includes(nat)) {
    return { type: "SAARC National", amount: rates.saarc, countryName };
  }

  return { type: "Foreigner", amount: rates.foreigner, countryName };
};
