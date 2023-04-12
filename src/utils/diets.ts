import GlutenFreeIcon from '../assets/icons/gluten-free.png';
import NoMilkIcon from '../assets/icons/no-milk.png';
import KetoIcon from '../assets/icons/keto.png';
import NoEggsIcon from '../assets/icons/no-eggs.png';
import BreadIcon from '../assets/icons/bread.png';
import LeafIcon from '../assets/icons/leaf.png';
import VeganIcon from '../assets/icons/vegan.png';
import FishIcon from '../assets/icons/fish.png';
import PaleoIcon from '../assets/icons/paleo.png';
import OliveOilIcon from '../assets/icons/olive-oil.png';

interface Diet {
  name: string;
  icon: string;
}

export const diets: { [key: string]: Diet } = {
  glutenFree: {
    name: 'gluten free',
    icon: GlutenFreeIcon.src,
  },
  dairyFree: {
    name: 'dairy free',
    icon: NoMilkIcon.src,
  },
  ketogenic: {
    name: 'ketogenic',
    icon: KetoIcon.src,
  },
  lactoOvoVegetarian: {
    name: 'lacto ovo vegetarian',
    icon: LeafIcon.src,
  },
  lactoVegetarian: {
    name: 'lacto vegetarian',
    icon: NoEggsIcon.src,
  },
  ovoVegetarian: {
    name: 'ovo vegetarian',
    icon: NoMilkIcon.src,
  },
  vegan: {
    name: 'vegan',
    icon: VeganIcon.src,
  },
  pescetarian: {
    name: 'pescetarian',
    icon: FishIcon.src,
  },
  paleolithic: {
    name: 'paleolithic',
    icon: PaleoIcon.src,
  },
  primal: {
    name: 'primal',
    icon: PaleoIcon.src,
  },
  lowFodMap: {
    name: 'low fodmap',
    icon: OliveOilIcon.src,
  },
  whole30: {
    name: 'whole30',
    icon: BreadIcon.src,
  },
};
