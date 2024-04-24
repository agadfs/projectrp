import { common } from "@mui/material/colors";

export default function ItemGenerator(rarity, book, type, level) {
  if (rarity === undefined || !rarity) {
    rarity = 'commom'
  }
  if (book === undefined || !book) {
    book = 'd&d'
  }
  if (type === undefined || !type) {
    type = 'weapon'
  }
  if (level === undefined || !level) {
    level = 'starter'
  }


  let newItem = {
    name: '',
    description: '',
    value: '',
    cantrade: false,
    others: '',
    atk: '',
    def: '',
    url: '',
    typewear: '',
    weight: '',
    rpgbook: '',
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };



  if (type === 'mission') {

  } else {
    if (type === 'weapon') {

      const weaponNameArray = ['Espada', 'Adaga', 'Escudo', 'Cajado',
        'Besta', 'Arco', 'Manoplas', 'Grimório', 'Katana', 'Bastão']

      function SwordGenerator() {
        let subname = '';
        let atk = 0;
        let def = 0;
        let weightotal = 0;
        let valuetotal = 0;
        let otherstats1 = 0;
        let otherstats2 = 0;
        let otherstats3 = 0;


        if(rarity === 'commom'){
          if(level === 'starter'){
            const namestarterarray = [
              {name:'', weight:0, value:0}, 
              {name:'', weight:0, value:0}, 
              {name:'', weight:0, value:0},
              {name:'', weight:0, value:0},
              {name:'', weight:0, value:0},
             ]
            
            const NameRandomizer = Math.floor(Math.random() * namestarterarray.length);
          }
          if(level === 'medium'){
            
          }
          if(level === 'advanced'){
            
          }
        }


        if(rarity === 'middle'){
          if(level === 'starter'){


          }
          if(level === 'medium'){
            

          }
          if(level === 'advanced'){
            

          }
        }


        if(rarity === 'rare'){
          if(level === 'starter'){

          }
          if(level === 'medium'){
            
          }
          if(level === 'advanced'){
            
          }
        }
      }
      function DaggerGenerator() {

      }
      function StaffGenerator() {

      }
      if (book === 'd&d') {

        const NameRandomizer = Math.floor(Math.random() * weaponNameArray.length);

        let Name = weaponNameArray[NameRandomizer];


        if (Name === 'Espada') {
         const sword = SwordGenerator()
        }
        if (Name === 'Adaga') {
          const dagger = DaggerGenerator()
        }
        if (Name === 'Cajado') {
          const staff = StaffGenerator()
        }

        console.log(Name);



      }
    }
  }






  return newItem
}